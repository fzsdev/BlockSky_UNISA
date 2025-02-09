from flask import Blueprint, request, jsonify, session
from atproto import Client
from .models import db, User

auth = Blueprint("auth", __name__)


@auth.route("/login", methods=["POST"])
def login_user():
    try:
        data = request.get_json()
        username = data.get("username")
        app_password = data.get("password")

        if not username or not app_password:
            return jsonify({"success": False, "message": "Credenciais inválidas"}), 400

        client = Client()
        client.login(username, app_password)

        # Debug
        print(
            f"Login successful - Session string: {client.export_session_string()[:30]}..."
        )

        session.clear()
        session.permanent = True
        session["handle"] = client.me.handle
        session["did"] = client.me.did
        session["session_string"] = client.export_session_string()
        session.modified = True

        # Verificar se o usuário já existe no banco de dados
        user = User.query.filter_by(username=username).first()
        if user is None:
            user = User(username=username)
            user.set_password(app_password)
            db.session.add(user)
            db.session.commit()

        return jsonify({"success": True}), 200
    except Exception as e:
        print(f"Login error: {str(e)}")
        return jsonify({"success": False, "message": str(e)}), 500


@auth.route("/logout", methods=["POST"])
def logout_user():
    session.clear()
    return jsonify({"success": True}), 200
