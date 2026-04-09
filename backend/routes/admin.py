from flask import Blueprint, jsonify
from models import Company, Student, Drive, Application
from extensions import db

admin_bp = Blueprint("admin", __name__)

# ---------------- COMPANIES ----------------
@admin_bp.route("/companies", methods=["GET"])
def get_companies():
    companies = Company.query.all()

    return jsonify([{
        "id": c.id,
        "name": c.name,
        "email": c.email,
        "approved": c.approved,
        "blacklisted": c.is_blacklisted
    } for c in companies])


@admin_bp.route("/approve-company/<int:id>", methods=["POST"])
def approve_company(id):
    company = Company.query.get(id)
    if not company:
        return {"message": "Not found"}, 404

    company.approved = True
    db.session.commit()
    return {"message": "Company approved"}


@admin_bp.route("/blacklist-company/<int:id>", methods=["POST"])
def blacklist_company(id):
    company = Company.query.get(id)
    if not company:
        return {"message": "Not found"}, 404

    company.is_blacklisted = True
    db.session.commit()
    return {"message": "Company blacklisted"}


@admin_bp.route("/delete-company/<int:id>", methods=["DELETE"])
def delete_company(id):
    company = Company.query.get(id)
    if not company:
        return {"message": "Not found"}, 404

    db.session.delete(company)
    db.session.commit()
    return {"message": "Deleted"}


# ---------------- STUDENTS ----------------
@admin_bp.route("/students", methods=["GET"])
def get_students():
    students = Student.query.all()

    return jsonify([{
        "id": s.id,
        "name": s.name,
        "email": s.email,
        "blacklisted": s.is_blacklisted
    } for s in students])


@admin_bp.route("/blacklist-student/<int:id>", methods=["POST"])
def blacklist_student(id):
    student = Student.query.get(id)
    if not student:
        return {"message": "Not found"}, 404

    student.is_blacklisted = True
    db.session.commit()
    return {"message": "Student blacklisted"}


# ---------------- STATS ----------------
@admin_bp.route("/stats", methods=["GET"])
def get_stats():
    return jsonify({
        "total_students": Student.query.count(),
        "total_companies": Company.query.count(),
        "total_drives": Drive.query.count(),
        "total_applications": Application.query.count()
    })


# ---------------- DRIVE APPROVAL ----------------
@admin_bp.route("/approve-drive/<int:id>", methods=["POST"])
def approve_drive(id):
    drive = Drive.query.get(id)
    if not drive:
        return {"message": "Not found"}, 404

    drive.status = "Approved"
    db.session.commit()
    return {"message": "Drive approved"}


@admin_bp.route("/reject-drive/<int:id>", methods=["POST"])
def reject_drive(id):
    drive = Drive.query.get(id)
    if not drive:
        return {"message": "Not found"}, 404

    drive.status = "Rejected"
    db.session.commit()
    return {"message": "Drive rejected"}

@admin_bp.route("/student/<int:id>", methods=["GET"])
def admin_view_student(id):
    s = Student.query.get(id)

    if not s:
        return {"message": "Not found"}, 404

    return jsonify({
        "id": s.id,
        "name": s.name,
        "email": s.email,
        "cgpa": s.cgpa,
        "skills": s.skills,
        "branch": s.branch,
        "resume": s.resume,
        "blacklisted": s.is_blacklisted
    })


@admin_bp.route("/company/<int:id>", methods=["GET"])
def admin_view_company(id):
    c = Company.query.get(id)

    if not c:
        return {"message": "Not found"}, 404

    return jsonify({
        "id": c.id,
        "name": c.name,
        "email": c.email,
        "description": c.description,
        "industry": c.industry,
        "location": c.location,
        "approved": c.approved,
        "blacklisted": c.is_blacklisted
    })

@admin_bp.route("/drives", methods=["GET"])
def get_drives():
    drives = Drive.query.all()

    return jsonify([{
        "id": d.id,
        "title": d.title,
        "company_id": d.company_id,
        "status": d.status
    } for d in drives])


@admin_bp.route("/applications", methods=["GET"])
def get_applications():
    apps = Application.query.all()

    return jsonify([{
        "id": a.id,
        "student_id": a.student_id,
        "drive_id": a.drive_id,
        "status": a.status
    } for a in apps])

@admin_bp.route("/drive/<int:id>", methods=["GET"])
def get_drive(id):
    d = Drive.query.get(id)

    if not d:
        return {"message": "Not found"}, 404

    return jsonify({
        "id": d.id,
        "title": d.title,
        "description": d.description,
        "requirements": d.requirements,
        "eligibility": d.eligibility,
        "salary": d.salary,
        "location": d.location,
        "deadline": d.deadline,
        "status": d.status,
        "company": d.company.name,

        "applications": [
            {
                "id": a.id,
                "name": a.student.name,
                "email": a.student.email,
                "cgpa": a.student.cgpa,
                "skills": a.student.skills,
                "status": a.status
            }
            for a in d.applications
        ]
    })

@admin_bp.route("/application/<int:id>", methods=["GET"])
def get_application(id):
    a = Application.query.get(id)

    if not a:
        return {"message": "Not found"}, 404

    return jsonify({
        "id": a.id,
        "status": a.status,
        "resume": a.resume,
        "cover_letter": a.cover_letter,
        "expected_salary": a.expected_salary,

        "student": {
            "id": a.student.id,
            "name": a.student.name,
            "email": a.student.email,
            "cgpa": a.student.cgpa,
            "skills": a.student.skills,
            "branch": a.student.branch,
        },

        "drive": {
            "title": a.drive.title,
            "company": a.drive.company.name,
            "location": a.drive.location,
            "salary": a.drive.salary
        }
    })