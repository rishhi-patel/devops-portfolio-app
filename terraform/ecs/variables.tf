variable "app_name" {}
variable "flask_ecr_url" {}
variable "subnet_ids" {
  type = list(string)
}
variable "security_group_id" {}
variable "target_group_arn" {}
variable "alb_listener_arn" {}
