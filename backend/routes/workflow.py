from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Workflow

workflow_bp = Blueprint('workflow_bp', __name__)

@workflow_bp.route('/api/workflows', methods=['POST'])
@jwt_required()
def create_workflow():
    data = request.get_json()
    user_id = get_jwt_identity()

    workflow = Workflow(
        user_id=user_id,
        name=data.get('name', 'Untitled Workflow'),
        steps=data.get('steps', []),
        schedule=data.get('schedule', '')
    )
    db.session.add(workflow)
    db.session.commit()

    return jsonify({"message": "Workflow saved successfully", "id": workflow.id}), 201
