from flask import Blueprint, request, jsonify
from models import db, User , Usage, Workflow
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from functools import wraps

auth_bp = Blueprint('auth_bp', __name__)

# Register Route
@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    # Check if user already exists
    existing_user = User.query.filter_by(email=data['email']).first()
    if existing_user:
        return jsonify({"error": "User already exists"}), 400

    hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')

    new_user = User(username=data['username'], email=data['email'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully!"}), 201


# Login Route
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()

    if user and check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity=str(user.id), expires_delta=timedelta(days=1))
        return jsonify({"access_token": access_token}), 200

    return jsonify({"error": "Invalid email or password"}), 401


# Protected Route (Requires Authentication)
@auth_bp.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    return jsonify({"message": f"Welcome User {current_user_id}!"})


def role_required(required_role):
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            user_id = get_jwt_identity()
            user = User.query.get(user_id)
            if user and user.role == required_role:
                return fn(*args, **kwargs)
            return jsonify({"error": "Access denied: insufficient privileges"}), 403
        return wrapper
    return decorator

@auth_bp.route('/admin-only', methods=['GET'])
@jwt_required()
@role_required('admin')
def admin_route():
    return jsonify({"message": "Welcome, admin!"})


@auth_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    response = make_response(jsonify({"message": "Logout successful"}), 200)
    response.set_cookie("access_token", "", expires=0)  # Clears cookie
    return response

@auth_bp.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user:
        return jsonify({
            "username": user.username,
            "email": user.email,
            "role": user.role

            # Include any additional fields you want to return
        })
    return jsonify({"error": "User not found"}), 404





# Analytics Route
@auth_bp.route('/analytics', methods=['GET'])
@jwt_required()
def get_analytics():
    # For example: total emails generated in the last 30 days
    thirty_days_ago = datetime.utcnow() - timedelta(days=30)
    total_emails = db.session.query(Usage).filter(
        Usage.feature=='email_gen',
        Usage.timestamp >= thirty_days_ago
    ).count()

    # You can add more stats as needed
    return jsonify({
        "total_emails_last_30_days": total_emails,
        # Add more stats here if needed
    })




@auth_bp.route('/workflows', methods=['POST'])
@jwt_required()
def create_workflow():
    data = request.get_json()
    user_id = get_jwt_identity()
    new_workflow = Workflow(
        user_id=user_id,
        name=data.get('name'),
        steps=data.get('steps'),
        schedule=data.get('schedule')
    )
    db.session.add(new_workflow)
    db.session.commit()
    return jsonify({
        "message": "Workflow created successfully!",
        "workflow_id": new_workflow.id
    }), 201

@auth_bp.route('/workflows', methods=['GET'])
@jwt_required()
def list_workflows():
    user_id = get_jwt_identity()
    workflows = Workflow.query.filter_by(user_id=user_id).all()
    workflows_data = [{
        "id": wf.id,
        "name": wf.name,
        "steps": wf.steps,
        "schedule": wf.schedule
    } for wf in workflows]
    return jsonify(workflows_data), 200
