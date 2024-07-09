#[cfg(test)]
mod tests {
	use donnees::entity::Entity;

	#[test]
	fn test_create_entity() {
		let entity = Entity::new("tb_users".to_string(), "table to manage users".to_string(), "000".to_string(), vec![]);

		assert_ne!(entity.name, "");
		assert_ne!(entity.description, "");
		assert_ne!(entity.color_hex, "");
	}

	#[test]
	fn test_serialize_entity() {
		let entity = Entity::new("tb_users".to_string(), "table to manage users".to_string(), "000".to_string(), vec![]);

		let json_entity = entity.to_json();

		assert!(json_entity.contains("\"name\":\"tb_users\""));
		assert!(json_entity.contains("\"description\":\"table to manage users\""));
		assert!(json_entity.contains("\"color_hex\":\"#000\""));
	}
}

