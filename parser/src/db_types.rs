use serde::{ Deserialize, Serialize };

#[derive(Serialize, Deserialize)]
pub enum DataType {
	Int,
	Varchar(usize),
	Float,
	Boolean,
	Date,
	DateTime,
	// TODO: Add + DTypes
}

#[derive(Serialize, Deserialize)]
pub enum DataConstraint {
	NotNull,
	Unique,
	PrimaryKey,
	ForeignKey,
	Default(String),
	// TODO: Add + Constraints
}

impl DataType {
	pub fn to_sql(&self) -> String {
		match self {
			DataType::Int => "INT".to_string(),
			DataType::Varchar(size) => format!("VARCHAR({})", size),
			DataType::Float => "FLOAT".to_string(),
			DataType::Boolean => "BOOLEAN".to_string(),
			DataType::Date => "DATE".to_string(),
			DataType::DateTime => "DATETIME".to_string(),
		}
	}
}
impl DataConstraint {
	pub fn to_sql(&self) -> String {
		match self {
			DataConstraint::NotNull => "NOT NULL".to_string(),
			DataConstraint::Unique => "UNIQUE".to_string(),
			DataConstraint::PrimaryKey => "PRIMARY KEY".to_string(),
			DataConstraint::ForeignKey => "FOREIGN KEY".to_string(),
			DataConstraint::Default(val) => format!("DEFAULT {}", val),
		}
	}
}

