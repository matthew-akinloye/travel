from flask import Flask
from flask_sqlalchemy import SQLAlchemy
app = Flask(__name__)
app.config.from_object('config.Config')
db = SQLAlchemy(app)

from app import Travel, Imageone, Imagetwo, Imagethr, Imagefour, Imagefive
from models import Travel as SQLiteTravel, Imageone as SQLiteImageone, Imagetwo as SQLiteImagetwo, Imagethr as SQLiteImagethr, Imagefour as SQLiteImagefour, Imagefive as SQLiteImagefive

def migrate_data():
    # Retrieve data from the SQLite database
    sqlite_travels = SQLiteTravel.query.all()
    sqlite_imageones = SQLiteImageone.query.all()
    sqlite_imagetwos = SQLiteImagetwo.query.all()
    sqlite_imagethrs = SQLiteImagethr.query.all()
    sqlite_imagefours = SQLiteImagefour.query.all()
    sqlite_imagefives = SQLiteImagefive.query.all()

    # Transfer data to PostgreSQL database
    pg_travels = [Travel(**{k: v for k, v in sqlite_travel.__dict__.items() if k != 'id'}) for sqlite_travel in sqlite_travels]
    pg_imageones = [Imageone(**{k: v for k, v in sqlite_imageone.__dict__.items() if k != 'id'}) for sqlite_imageone in sqlite_imageones]
    pg_imagetwos = [Imagetwo(**{k: v for k, v in sqlite_imagetwo.__dict__.items() if k != 'id'}) for sqlite_imagetwo in sqlite_imagetwos]
    pg_imagethrs = [Imagethr(**{k: v for k, v in sqlite_imagethr.__dict__.items() if k != 'id'}) for sqlite_imagethr in sqlite_imagethrs]
    pg_imagefours = [Imagefour(**{k: v for k, v in sqlite_imagefour.__dict__.items() if k != 'id'}) for sqlite_imagefour in sqlite_imagefours]
    pg_imagefives = [Imagefive(**{k: v for k, v in sqlite_imagefive.__dict__.items() if k != 'id'}) for sqlite_imagefive in sqlite_imagefives]

    # Add the data to the PostgreSQL database
    db.session.add_all(pg_travels)
    db.session.add_all(pg_imageones)
    db.session.add_all(pg_imagetwos)
    db.session.add_all(pg_imagethrs)
    db.session.add_all(pg_imagefours)
    db.session.add_all(pg_imagefives)

    db.session.commit()



if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        migrate_data()
