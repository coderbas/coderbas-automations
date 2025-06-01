from flask import Blueprint, request, jsonify
import openai
from config import Config
from flask_jwt_extended import jwt_required


ai_bp = Blueprint('ai_bp', __name__)

openai.api_key = Config.OPENAI_API_KEY

@ai_bp.route('/generate-email', methods=['POST'])
def generate_email():
    data = request.get_json()
    topic = data.get('topic', 'business')
    prompt = f"Write a professional business email about {topic}."

    try:
        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful assistant that generates professional business emails."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            max_tokens=150
        )
        email_text = response.choices[0].message.content.strip()
        return jsonify({"email": email_text}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500



@ai_bp.route('/chat', methods=['POST'])
@jwt_required()
def chat():
    data = request.get_json()
    messages = data.get("messages", [])
    try:
        # Using the new OpenAI Chat Completions interface:
        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=messages,
            max_tokens=150
        )
        return jsonify({"response": response.choices[0].message.content}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500