use std::{io::Write, time::SystemTime};
use serde::{Serialize, Deserialize};

//TODO: REFACTOR XD

#[derive(Serialize, Deserialize)]
pub struct Entity {
    pub name: String,
    pub description: String,
    pub color_hex: String,
    pub attributes: Vec<Attribute>,
}

#[derive(Serialize, Deserialize)]
pub struct Attribute {
    pub name: String,
    pub data_type: DataType,
    pub attribute_description: String,
    pub primary_key: bool,
    pub is_fk: bool,
    pub foreign_key: Option<ForeignKey>,
}

#[derive(Serialize, Deserialize)]
pub struct ForeignKey {
    pub references: String,
    pub on: String,
}

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
pub struct ERModel {
	pub entities: Vec<Entity>,
}


impl Attribute {
    pub fn new(name: String, data_type: DataType, attribute_description: String, primary_key: bool, is_fk: bool, foreign_key: Option<ForeignKey>) -> Self {
        Self {
            name,
            data_type,
            attribute_description,
            primary_key,
            is_fk,
            foreign_key,
        }
    }
}

impl Entity {
    pub fn new(name: String, descr: String, hex: String, attrs: Vec<Attribute>) -> Self {
        Self {
            name,
            description: descr,
            color_hex: format!("#{}", hex),
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

    pub fn from_json(json: &str) -> Result<ERModel, serde_json::Error> {
        let res = serde_json::from_str(json);
        match res {
            Ok(entity) => Ok(entity),
            Err(err) => Err(err),
        }
    }

    pub fn save_to_disk(&self, file_name: &str) {
        let file = std::fs::File::create(format!("{}.json", file_name));
        // TODO: Error handling
        let _ = serde_json::to_writer(file.unwrap(), self);
        println!("Saved {} to disk, file_name: {}, date: {}", self.name, file_name, SystemTime::now().duration_since(SystemTime::UNIX_EPOCH).unwrap().as_millis());
    }
}

impl ERModel {
    pub fn new() -> Self {
        Self {
            entities: vec![],
        }
    }

    pub fn to_json(&self) -> String {
        let res = serde_json::to_string(self);
        match res {
            Ok(json) => json,
            Err(_) => "Could not serialize entity".to_string(),
        }
    }

    pub fn from_json(json: &str) -> Result<ERModel, serde_json::Error> {
        let res = serde_json::from_str(json);
        match res {
            Ok(entity) => Ok(entity),
            Err(err) => Err(err),
        }
    }

    pub fn er_model_to_sql(&self) -> String {
        let mut sql = String::new();

        for entity in &self.entities {
            sql.push_str(&format!("CREATE TABLE {} (\n", entity.name));
            for (i, attr) in entity.attributes.iter().enumerate() {
                sql.push_str(&format!("    {} {}", attr.name, match &attr.data_type {
                    DataType::Int => "INT".to_string(),
                    DataType::Varchar(size) => format!("VARCHAR({})", size),
                    DataType::Float => "FLOAT".to_string(),
                    DataType::Boolean => "BOOLEAN".to_string(),
                    DataType::Date => "DATE".to_string(),
                    DataType::DateTime => "DATETIME".to_string(),
                }));
                if attr.primary_key {
                    sql.push_str(" PRIMARY KEY");
                }
                if i < entity.attributes.len() - 1 || attr.foreign_key.is_some() {
                    sql.push_str(",");
                }
                sql.push_str("\n");
            }
            for attr in &entity.attributes {
                if let Some(ref fk) = attr.foreign_key {
                    sql.push_str(&format!(
                        "    FOREIGN KEY({}) REFERENCES {}({}),\n",
                        attr.name, fk.references, fk.on
                    ));
                }
            }
            if sql.ends_with(",\n") {
                sql.truncate(sql.len() - 2);
                sql.push_str("\n");
            }
            sql.push_str(");\n\n");
        }

        return sql;
    }

    pub fn save_to_disk(&self, file_name: &str, content_str: &str) {
        let file = std::fs::File::create(format!("{}.sql", file_name));
        // TODO: Error handling
        let _ = file.unwrap().write(content_str.as_bytes());
        println!("Saved {} to disk, date: {}", file_name, SystemTime::now().duration_since(SystemTime::UNIX_EPOCH).unwrap().as_millis());
    }

    pub fn save_to_disk_json(&self, file_name: &str) {
        let file = std::fs::File::create(format!("{}.json", file_name));
        // TODO: Error handling
        let _ = serde_json::to_writer(file.unwrap(), self);
        println!("Saved {} to disk, file_name: {}, date: {}", "ERModel", file_name, SystemTime::now().duration_since(SystemTime::UNIX_EPOCH).unwrap().as_millis());
    }
}

pub fn sql_to_er_model(sql: &str) -> ERModel {
	todo!();
}