variable "subscription_id" {
  description = "Azure Subscription ID"
  type        = string
  sensitive   = true
}

variable "location" {
  description = "Azure Region"
  type        = string
  default     = "norwayeast"
}

variable "resource_group_name" {
  description = "Resource Group Name"
  type        = string
  default     = "devops-rg"
}

variable "vm_size" {
  description = "Azure VM Size"
  type        = string
  default     = "Standard_D8s_v5"
}

variable "admin_username" {
  description = "VM Admin Username"
  type        = string
  default     = "devopsadmin"
}

variable "project_name" {
  description = "Project Name"
  type        = string
  default     = "devops-project"
}

variable "environment" {
  description = "Environment"
  type        = string
  default     = "production"
}

variable "ssh_public_key_path" {
  description = "Path to SSH public key"
  type        = string
  default     = "~/.ssh/id_rsa.pub"
}
