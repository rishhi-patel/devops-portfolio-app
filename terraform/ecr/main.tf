resource "aws_ecr_repository" "flask_repo" {
  name = "${var.app_name}-flask"
  image_scanning_configuration { scan_on_push = true }
  lifecycle { prevent_destroy = false }
}

resource "aws_ecr_repository" "express_repo" {
  name = "${var.app_name}-express"
  image_scanning_configuration { scan_on_push = true }
  lifecycle { prevent_destroy = false }
}
