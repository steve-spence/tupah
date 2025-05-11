from flask import Blueprint, jsonify, request

api = Blueprint('api', __name__)

# Simple test route
@api.route('/api/ping', methods=['GET'])
def ping():
    return jsonify({"message": "pong"}), 200

# Create a new event
@api.route('/api/event', methods=['POST'])
def create_event():
    data = request.get_json()
    event_title = data.get('title')
    # Insert event into your database here
    event_id = "abc123"  # generate or fetch from DB
    return jsonify({"event_id": event_id}), 201

# Fetch event data
@api.route('/api/event/<event_id>', methods=['GET'])
def get_event(event_id):
    # Query event from your database
    return jsonify({
        "event_id": event_id,
        "title": "Mock Event",
        "dates": ['2025-05-01', '2025-05-02', '2025-05-05']  # or however you want to send availability
    }), 200
