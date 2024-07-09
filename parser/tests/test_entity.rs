#[cfg(test)]
mod tests {
	use donnees::entity::*;

	fn basic_entity() -> Entity {
		let entity = Entity::new("tb_users".to_string(), "table to manage users".to_string(), "000".to_string(), vec![]);
		return entity;
	}
	fn sample_entity() -> ERModel {
		let model = ERModel {
			entities: vec![
				Entity {
					name: "tb_users".to_string(),
					description: "A user entity".to_string(),
					color_hex: "#FFFFFF".to_string(),
					attributes: vec![
						Attribute {
							name: "id".to_string(),
							data_type: DataType::Int,
							constraints: vec!["NOT NULL".to_string()],
							attribute_description: "The primary key".to_string(),
							primary_key: true,
							is_fk: false,
							foreign_key: None,
						},
						Attribute {
							name: "name".to_string(),
							constraints: vec!["NOT NULL".to_string()],
							data_type: DataType::Varchar(255),
							attribute_description: "The name of the user".to_string(),
							primary_key: false,
							is_fk: false,
							foreign_key: None,
						}
					],
				},
				Entity {
					name: "tb_tests".to_string(),
					description: "A test entity".to_string(),
					color_hex: "#FAFA".to_string(),
					attributes: vec![
						Attribute {
							name: "id".to_string(),
							data_type: DataType::Int,
							constraints: vec!["NOT NULL".to_string()],
							attribute_description: "The primary key".to_string(),
							primary_key: true,
							is_fk: false,
							foreign_key: None,
						},
						Attribute {
							name: "just_test".to_string(),
							data_type: DataType::Varchar(255),
							constraints: vec!["NOT NULL".to_string()],
							attribute_description: "Just testing 4fun".to_string(),
							primary_key: false,
							is_fk: false,
							foreign_key: None,
						}
					],
				},
				Entity {
					name: "tb_posts".to_string(),
					description: "A post entity".to_string(),
					color_hex: "#FFFFFF".to_string(),
					attributes: vec![
						Attribute {
							name: "id".to_string(),
							data_type: DataType::Int,
							constraints: vec!["NOT NULL".to_string()],
							attribute_description: "The primary key".to_string(),
							primary_key: true,
							is_fk: false,
							foreign_key: None,
						},
						Attribute {
							name: "title".to_string(),
							data_type: DataType::Varchar(255),
							constraints: vec!["NOT NULL".to_string(),"UNIQUE".to_string()],
							attribute_description: "The title of the post".to_string(),
							primary_key: false,
							is_fk: false,
							foreign_key: None,
						},
						Attribute {
							name: "user_id".to_string(),
							data_type: DataType::Int,
							constraints: vec!["NOT NULL".to_string()],
							attribute_description: "The user ID".to_string(),
							primary_key: false,
							is_fk: true,
							foreign_key: Some(ForeignKey {
								references: "id".to_string(),
								on: "tb_users".to_string(),
							}),
						},
						Attribute {
							name: "test_id".to_string(),
							data_type: DataType::Int,
							constraints: vec!["NOT NULL".to_string()],
							attribute_description: "The user ID".to_string(),
							primary_key: false,
							is_fk: true,
							foreign_key: Some(ForeignKey {
								references: "id".to_string(),
								on: "tb_tests".to_string(),
							}),
						}
					],
				}
			],
		};

		return model;
	}

	#[test]
	fn test_create_entity() {
		let entity = basic_entity();
		assert_ne!(entity.name, "");
		assert_ne!(entity.description, "");
		assert_ne!(entity.color_hex, "");
	}

	#[test]
	fn test_serialize_entity() {
		let entity = basic_entity();

		let json_entity = entity.to_json();

		assert!(json_entity.contains("\"name\":\"tb_users\""));
		assert!(json_entity.contains("\"description\":\"table to manage users\""));
		assert!(json_entity.contains("\"color_hex\":\"#000\""));
	}

	#[test]
	fn test_save_to_disk() {
		let entity = basic_entity();
		entity.save_to_disk("test_entity");

		assert!(std::path::Path::new("test_entity.json").exists());
	}

	#[test]
	fn test_er_to_sql_file() {
		let model = sample_entity();
		let sql_model = model.er_model_to_sql();
		model.save_to_disk("test_er_to_sql", &sql_model);
		assert!(std::path::Path::new("test_er_to_sql.sql").exists());
	}

	#[test]
	fn test_er_to_json_file() {
		let model = sample_entity();
		model.to_json();
		model.save_to_disk_json("test_ermodel");
		assert!(std::path::Path::new("test_ermodel.json").exists());
	}
}

