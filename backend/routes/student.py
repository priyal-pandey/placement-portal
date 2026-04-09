from flask import Blueprint, request, jsonify, current_app
from models import Student, Drive, Application
from extensions import db
from werkzeug.utils import secure_filename
import os

student_bp = Blueprint("student", __name__)

# ---------------- GET DRIVES ----------------
@student_bp.route("/drives", methods=["GET"])
def get_drives():
    drives = Drive.query.filter_by(status="Approved").all()

    return jsonify([
        {
            "id": d.id,
            "title": d.title,
            "description": d.description,
            "requirements": d.requirements,
            "eligibility": d.eligibility,
            "salary": d.salary,
            "location": d.location,
            "deadline": d.deadline,
            "company": d.company.name
        } for d in drives
    ])


# ---------------- APPLY ----------------
@student_bp.route("/apply", methods=["POST"])
def apply_drive():
    data = request.form

    existing = Application.query.filter_by(
        student_id=data["student_id"],
        drive_id=data["drive_id"]
    ).first()

    if existing:
        return {"message": "Already applied"}, 400

    file = request.files.get("resume")
    filename = None

    if file:
        filename = secure_filename(file.filename)
        file.save(os.path.join(current_app.config["UPLOAD_FOLDER"], filename))

    application = Application(
        student_id=data["student_id"],
        drive_id=data["drive_id"],
        resume=filename,
        cover_letter=data.get("cover_letter"),
        expected_salary=data.get("expected_salary"),
        status="Applied"
    )

    db.session.add(application)
    db.session.commit()

    return {"message": "Applied successfully"}


# ---------------- MY APPLICATIONS ----------------
@student_bp.route("/applications/<int:student_id>", methods=["GET"])
def my_applications(student_id):
    apps = Application.query.filter_by(student_id=student_id).all()

    data = []
    for a in apps:
        d = a.drive

        data.append({
            "application_id": a.id,
            "status": a.status,
            "job_title": d.title,
            "company": d.company.name,
            "resume": a.resume,
            "cover_letter": a.cover_letter
        })

    return jsonify(data)




# ---------------- VIEW PROFILE ----------------
@student_bp.route("/profile/<int:id>", methods=["GET"])
def get_student_profile(id):
    student = Student.query.get(id)

    if not student:
        return {"message": "Not found"}, 404

    return jsonify({
        "name": student.name,
        "email": student.email,
        "cgpa": student.cgpa,
        "skills": student.skills,
        "branch": student.branch,
        "passing_year": student.passing_year,
        "phone": student.phone,
        "resume": student.resume
    })