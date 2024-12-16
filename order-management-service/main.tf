provider "aws" {
  region = "us-west-2"  # Change to your desired region
}

resource "aws_s3_bucket" "app_bucket" {
  bucket = "order-management-app-bucket"  # Change to a unique bucket name
  acl    = "private"
}

resource "aws_elastic_beanstalk_application" "app" {
  name        = "OrderManagementApp"
  description = "Elastic Beanstalk application for Order Management Microservice"
}

resource "aws_elastic_beanstalk_environment" "env" {
  name                = "OrderManagementEnv"
  application         = aws_elastic_beanstalk_application.app.name
  solution_stack_name = "64bit Amazon Linux 2 v5.4.0 running Node.js 14"  # Change to your desired stack

  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "NODE_ENV"
    value     = "production"
  }

  setting {
    namespace = "aws:elasticbeanstalk:environment:proxy"
    name      = "ProxyServer"
    value     = "nginx"
  }
}

resource "aws_lb" "app_lb" {
  name               = "order-management-lb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.lb_sg.id]
  subnets            = ["subnet-12345678", "subnet-87654321"]  # Replace with your subnet IDs

  enable_deletion_protection = false
}

resource "aws_security_group" "lb_sg" {
  name        = "lb_sg"
  description = "Allow HTTP and HTTPS traffic"
  vpc_id     = "vpc-12345678"  # Replace with your VPC ID

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.app_lb.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.app_tg.arn
  }
}

resource "aws_lb_target_group" "app_tg" {
  name     = "order-management-tg"
  port     = 80
  protocol = "HTTP"
  vpc_id   = "vpc-12345678"  # Replace with your VPC ID

  health_check {
    path                = "/health"  # Adjust based on your health check endpoint
    interval            = 30
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 2
  }
}

output "s3_bucket_name" {
  value = aws_s3_bucket.app_bucket.bucket
}

output "elastic_beanstalk_application_name" {
  value = aws_elastic_beanstalk_application.app.name
}

output "elastic_beanstalk_environment_name" {
  value = aws_elastic_beanstalk_environment.env.name
}

output "load_balancer_dns" {
  value = aws_lb.app_lb.dns_name
}