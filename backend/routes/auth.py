from flask import Blueprint, request, jsonify, current_app
from extensions import db
from models import Student, Company, Admin
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
import os

auth_bp = Blueprint("auth", __name__)

# ---------------- STUDENT REGISTER ----------------
@auth_bp.route("/student-register", methods=["POST"])
def student_register():
    data = request.form 
    file = request.files.get("resume")


    existing = Student.query.filter_by(email=data.get("email")).first()
    if existing:
        return {"message": "Email already exists"}, 400

    filename = None

    if file:
        from werkzeug.utils import secure_filename
        import os
        filename = secure_filename(file.filename)
        file.save(os.path.join(current_app.config["UPLOAD_FOLDER"], filename))

    student = Student(
        name=data.get("name"),
        email=data.get("email"),
        password=generate_password_hash(data.get("password")),

        cgpa=data.get("cgpa"),
        skills=data.get("skills"),
        branch=data.get("branch"),
        passing_year=data.get("passing_year"),
        phone=data.get("phone"),
        resume=filename
    )

    db.session.add(student)
    db.session.commit()

    return jsonify({
        "message": "Student registered",
        "role": "student",
        "id": student.id
    })


# ---------------- COMPANY REGISTER ----------------
@auth_bp.route("/company-register", methods=["POST"])
def company_register():
    data = request.json

    if not data.get("email"):
        return {"message": "Email required"}, 400

    existing = Company.query.filter_by(email=data.get("email")).first()
    if existing:
        return {"message": "Email already exists"}, 400

    company = Company(
        name=data.get("name"),
        email=data.get("email"),
        password=generate_password_hash(data.get("password")),

        description=data.get("description"),
        industry=data.get("industry"),
        location=data.get("location"),
        website=data.get("website"),

        approved=False
    )

    db.session.add(company)
    db.session.commit()

    return jsonify({
        "message": "Company registered",
        "role": "company",
        "id": company.id
    })


# ---------------- LOGIN ----------------
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json

    # ADMIN
    admin = Admin.query.filter_by(email=data["email"]).first()
    if admin and admin.password == data["password"]:
        return jsonify({"role": "admin", "id": admin.id})

    # STUDENT
    student = Student.query.filter_by(email=data["email"]).first()
    if student and check_password_hash(student.password, data["password"]):
        return jsonify({"role": "student", "id": student.id})

    # COMPANY
    company = Company.query.filter_by(email=data["email"]).first()
    if company and check_password_hash(company.password, data["password"]):
        return jsonify({
            "role": "company",
            "id": company.id,
            "approved": company.approved
        })

    return {"message": "Invalid credentials"}, 401