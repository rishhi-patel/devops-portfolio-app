resource "aws_ecs_cluster" "main" {
  name = "${var.app_name}-cluster"
}

# --- Execution Role (for ECR access & logs)
resource "aws_iam_role" "execution_role" {
  name = "${var.app_name}-execution-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Effect = "Allow",
      Principal = {
        Service = "ecs-tasks.amazonaws.com"
      },
      Action = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_role_policy_attachment" "execution_policy" {
  role       = aws_iam_role.execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

# --- Task Definition: Flask
resource "aws_ecs_task_definition" "flask_task" {
  family                   = "${var.app_name}-flask-task"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = aws_iam_role.execution_role.arn

  container_definitions = jsonencode([
    {
      name  = "flask"
      image = var.flask_ecr_url
      portMappings = [{
        containerPort = 5000
        protocol      = "tcp"
      }],
      essential = true
    }
  ])
}

# --- ECS Service: Flask
resource "aws_ecs_service" "flask_service" {
  name            = "${var.app_name}-flask-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.flask_task.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = var.subnet_ids
    security_groups  = [var.security_group_id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = var.target_group_arn
    container_name   = "flask"
    container_port   = 5000
  }

  depends_on = [var.alb_listener_arn]
}
