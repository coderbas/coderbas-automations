from flask import Flask, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from config import Config
from models import db
from routes.auth import auth_bp  # Import authentication routes
from routes.ai import ai_bp
from routes.workflow import workflow_bp



def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)
    db.init_app(app)

    # Initialize JWT
    JWTManager(app)
    
    # Register Workflow blueprint
    app.register_blueprint(workflow_bp)

    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
   # Register AI blueprint
    app.register_blueprint(ai_bp, url_prefix='/api/ai')
    @app.route('/')
    def home():
        return jsonify({"message": "Backend is running!"})

    return app

# Create the app and initialize Flask-Migrate
app = create_app()
migrate = Migrate(app, db)

if __name__ == '__main__':
    with app.app_context():
        # For development only - once you use migrations, you don't need this
        db.create_all()
        print("Database tables created successfully!")
    app.run(host='0.0.0.0', port=5000, debug=True)
