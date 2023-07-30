import os
import pathlib

class Config(object):
    SECRET_KEY = os.environ.get("SECRET_GET") or "HSGHVGVCvczcdsxcrt2345rfDZHVFSDHV"
    SQLALCHEMY_DATABASE_URI = "sqlite:///"+os.path.join(
        pathlib.Path().absolute(), 'store.db'
    )
    SQLALCHEMY_TRACK_NOTIFICATIONS = False
    UPLOAD_FOLDER = os.path.join(pathlib.Path().absolute(), 'static/uploads')



