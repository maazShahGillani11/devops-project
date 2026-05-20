output "resource_group_name" {
  value = azurerm_resource_group.main.name
}

output "vm_name" {
  value = azurerm_linux_virtual_machine.main.name
}

output "public_ip_address" {
  description = "Static Public IP Address"
  value       = azurerm_public_ip.main.ip_address
}

output "private_ip_address" {
  value = azurerm_network_interface.main.private_ip_address
}

output "ssh_connection" {
  value = "ssh -i ~/.ssh/id_rsa ${var.admin_username}@${azurerm_public_ip.main.ip_address}"
}
