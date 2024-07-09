use serde::{ Serialize, Deserialize };

#[derive(Serialize, Deserialize)]
pub struct Entity {
	pub name: String,
	pub description: String,
	pub color_hex: String,
	pub attributes: Vec<Attribute>,
}

#[derive(Serialize, Deserialize)]
pub struct Attribute {
	name: String,
	attribute_type: String,
	attribute_description: String,
	primary_key: bool,
}

impl Attribute {
	pub fn new() -> Self {
		Self {
			name: String::new(),
			attribute_type: String::new(),
			attribute_description: String::new(),
			primary_key: false,
		}
	}
}

impl Entity {
	pub fn new(name: String, descr: String, hex: String, attrs: Vec<Attribute>) -> Self {
		Self {
			name,
			description: descr,
			color_hex: format!("#{hex}"),
			attributes: attrs,
		}
	}

	pub fn to_json(&self) -> String {
		let res = serde_json::to_string(self);

		match res {
			Ok(json) => json,
			Err(_) => "Could not serialize entity".to_string(),
		}
	}

	pub fn from_json(json: &str) -> Result<Entity, serde_json::Error> {
		let res = serde_json::from_str(json);

		match res {
			Ok(entity) => Ok(entity),
			Err(err) => Err(err),
		}
	}

}

