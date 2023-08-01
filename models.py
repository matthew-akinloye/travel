from app import db
from datetime import datetime
from flask_login import UserMixin

class User(UserMixin, db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True, index=True)
    fullname = db.Column(db.String(50), nullable=False, default = 'Fadejimi')
    email = db.Column(db.String(200), unique=True, nullable=False, default='admin@admin.com')
    password_hash = db.Column(db.String(200), nullable=False, default='pwd@admin@admin.com')
    created = db.Column(db.DateTime, default=datetime.now())

    def __repr__(self) -> str:
        return "<User: {}>".format(self.fullname)

class Travel(db.Model):
    __tablename__ = 'travel'
    id = db.Column(db.Integer, primary_key=True, index=True)
    location = db.Column(db.String(50), nullable=False)
    price = db.Column(db.String(200), nullable=False)
    duration = db.Column(db.String(11))
    description = db.Column(db.String(11200), nullable=False)
    caption = db.Column(db.String(200), nullable=False)
    image = db.Column(db.String(200), nullable=False)
    created = db.Column(db.DateTime, default=datetime.now())

    def __repr__(self) -> str:
        return "<Travel: {}>".format(self.location)




class Imageone(db.Model):
    __tablename__ = 'imageone'
    id = db.Column(db.Integer, primary_key=True, index=True)
    location = db.Column(db.String(50), nullable=False)
    image = db.Column(db.String(200), nullable=False)
    created = db.Column(db.DateTime, default=datetime.now())

    travel_id = db.Column(db.Integer, db.ForeignKey('travel.id'), nullable=False)
    travel = db.relationship('Travel', backref=db.backref('imageone', lazy=True))

    def __repr__(self) -> str:
        return "<Imageone: {}>".format(self.location)


class Imagetwo(db.Model):
    __tablename__ = 'imagetwo'
    id = db.Column(db.Integer, primary_key=True, index=True)
    location = db.Column(db.String(50), nullable=False)
    image = db.Column(db.String(200), nullable=False)
    created = db.Column(db.DateTime, default=datetime.now())

    travel_id = db.Column(db.Integer, db.ForeignKey('travel.id'), nullable=False)
    travel = db.relationship('Travel', backref=db.backref('imagetwo', lazy=True))

    def __repr__(self) -> str:
        return "<Imagetwo: {}>".format(self.location)


class Imagethr(db.Model):
    __tablename__ = 'imagethr'
    id = db.Column(db.Integer, primary_key=True, index=True)
    location = db.Column(db.String(50), nullable=False)
    image = db.Column(db.String(200), nullable=False)
    created = db.Column(db.DateTime, default=datetime.now())

    travel_id = db.Column(db.Integer, db.ForeignKey('travel.id'), nullable=False)
    travel = db.relationship('Travel', backref=db.backref('imagethr', lazy=True))

    def __repr__(self) -> str:
        return "<Imagethr: {}>".format(self.location)


class Imagefour(db.Model):
    __tablename__ = 'imagefour'
    id = db.Column(db.Integer, primary_key=True, index=True)
    location = db.Column(db.String(50), nullable=False)
    image = db.Column(db.String(200), nullable=False)
    created = db.Column(db.DateTime, default=datetime.now())

    travel_id = db.Column(db.Integer, db.ForeignKey('travel.id'), nullable=False)
    travel = db.relationship('Travel', backref=db.backref('imagefour', lazy=True))

    def __repr__(self) -> str:
        return "<Imagefour: {}>".format(self.location)


class Imagefive(db.Model):
    __tablename__ = 'imagefive'
    id = db.Column(db.Integer, primary_key=True, index=True)
    location = db.Column(db.String(50), nullable=False)
    image = db.Column(db.String(200), nullable=False)
    created = db.Column(db.DateTime, default=datetime.now())

    travel_id = db.Column(db.Integer, db.ForeignKey('travel.id'), nullable=False)
    travel = db.relationship('Travel', backref=db.backref('imagefive', lazy=True))

    def __repr__(self) -> str:
        return "<Imagefive: {}>".format(self.location)
