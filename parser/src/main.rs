use axum::{ routing::get, Router };

async fn test_handler() -> String {
	return "test web http".to_string();
}

#[tokio::main]
async fn main() {
	let app = Router::new().route("/", get(test_handler));

	let listener = tokio::net::TcpListener::bind("0.0.0.0:8000").await.expect("Failed to bind {8000}, address already in use");

	axum::serve(listener, app).await.expect("Failed to start server");
}

