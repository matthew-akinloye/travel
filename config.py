import os
import pathlib

class Config(object):
    SECRET_KEY = os.environ.get("SECRET_GET") or "HSGHVGVCvczcdsxcrt2345rfDZHVFSDHV"
    SQLALCHEMY_DATABASE_URI = "postgresql://default:sMjv1FmZ6Dnr@ep-falling-mouse-40250356.us-east-1.postgres.vercel-storage.com:5432/verceldb"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    UPLOAD_FOLDER = os.path.join(pathlib.Path().absolute(), 'static/uploads')



