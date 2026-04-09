from extensions import db
from datetime import datetime

class Admin(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)


class Company(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)

    approved = db.Column(db.Boolean, default=False)
    is_blacklisted = db.Column(db.Boolean, default=False)

    description = db.Column(db.Text)
    website = db.Column(db.String(200))
    industry = db.Column(db.String(100))
    location = db.Column(db.String(100))

    drives = db.relationship("Drive", backref="company", lazy=True)


class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)

    cgpa = db.Column(db.Float)
    skills = db.Column(db.String(300))
    branch = db.Column(db.String(100))
    passing_year = db.Column(db.Integer)
    phone = db.Column(db.String(15))
    resume = db.Column(db.String(200))

    is_blacklisted = db.Column(db.Boolean, default=False)

    applications = db.relationship("Application", backref="student", lazy=True)


class Drive(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    company_id = db.Column(db.Integer, db.ForeignKey("company.id"), nullable=False)

    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    requirements = db.Column(db.Text)
    eligibility = db.Column(db.String(200))

    salary = db.Column(db.String(50))
    location = db.Column(db.String(100))
    deadline = db.Column(db.String(50))

    status = db.Column(db.String(20), default="Pending")  # Pending / Approved / Closed

    applications = db.relationship("Application", backref="drive", lazy=True)


class Application(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    student_id = db.Column(db.Integer, db.ForeignKey("student.id"), nullable=False)
    drive_id = db.Column(db.Integer, db.ForeignKey("drive.id"), nullable=False)

    resume = db.Column(db.String(200))
    cover_letter = db.Column(db.Text)
    expected_salary = db.Column(db.String(50))
    notes = db.Column(db.Text)

    status = db.Column(db.String(20), default="Applied")

    applied_at = db.Column(db.DateTime, default=datetime.utcnow)

    __table_args__ = (
        db.UniqueConstraint('student_id', 'drive_id', name='unique_application'),
    )