from flask import Flask
from flask_cors import CORS
from extensions import db
from flask import send_from_directory

import os

app = Flask(__name__)
CORS(app)

# Config
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["UPLOAD_FOLDER"] = os.path.join(os.getcwd(), "uploads")

# Ensure uploads folder exists
os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)

db.init_app(app)

# Import models
import models
from models import Admin

# Import blueprints
from routes.auth import auth_bp
from routes.admin import admin_bp
from routes.company import company_bp
from routes.student import student_bp

app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(admin_bp, url_prefix="/api/admin")
app.register_blueprint(company_bp, url_prefix="/api/company")
app.register_blueprint(student_bp, url_prefix="/api/student")

@app.route("/uploads/<filename>")
def uploaded_file(filename):
    return send_from_directory(app.config["UPLOAD_FOLDER"], filename)

@app.route("/")
def home():
    return {"message": "Backend Connected"}

def setup_database():
    with app.app_context():
        db.create_all()

        # Create default admin if not exists
        if not Admin.query.first():
            admin = Admin(email="admin@email.com", password="admin123")
            db.session.add(admin)
            db.session.commit()
            print("Admin created")

setup_database()

if __name__ == "__main__":
    app.run(debug=True)