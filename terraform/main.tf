module "network" {
  source     = "./network"
  app_name   = var.app_name
  aws_region = var.aws_region
}

module "alb" {
  source            = "./alb"
  app_name          = var.app_name
  vpc_id            = module.network.vpc_id
  subnet_ids        = module.network.subnet_ids
  security_group_id = module.network.security_group_id
}

module "ecs" {
  source            = "./ecs"
  app_name          = var.app_name
  flask_ecr_url     = var.flask_ecr_url
  subnet_ids        = module.network.subnet_ids
  security_group_id = module.network.security_group_id
  target_group_arn  = module.alb.alb_target_group_arn
  alb_listener_arn  = module.alb.http_listener_arn
}
