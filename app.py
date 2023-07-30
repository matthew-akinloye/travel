from flask import Flask, redirect
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from flask_basicauth import BasicAuth
from flask import Blueprint
from sqlalchemy import inspect
from flask_babel import Babel






app = Flask(__name__)
babel = Babel(app)
app.config.from_object(Config)
app.config['FLASK_ADMIN_SWATCH'] = 'cyborg'
app.config['BASIC_AUTH_travelNAME'] = 'admin'
app.config['BASIC_AUTH_PASSWORD'] = 'nimda1234'
app.config['BABEL_SUPPORTED_LOCALES'] = ['en', 'fr']
app.config['BABEL_DEFAULT_LOCALE'] = 'en'





# Define the database and migration objects

basic_auth = BasicAuth(app)

@app.route('/admin/')
@basic_auth.required
def admin_page():
    return redirect("/admin/travel/")

db = SQLAlchemy(app)
migrate = Migrate(app, db)


# Import your models
from models import Travel


# Create an instance of the Admin class
admin = Admin(app, name='Admin', template_mode='bootstrap3')



class TravelView(ModelView):
    column_editable_list = ['id']
    column_searchable_list = ['location', 'created']
    column_filters = ['created']
    column_hide_backrefs = False
    

class AdminModelView(ModelView):
    column_editable_list = ['location']
    column_exclude_list = ['Created']
    column_display_pk = True
    column_searchable_list = ['travel.location', 'status']
    column_filters = ['status', 'created']
    column_labels = {'travel.location': 'travel Name'}
    form_args = {'travel_id': {'coerce': int}}

admin.add_view(TravelView(Travel,db.session))


# Import the routes and models modules
import routes
import models

# Run the application
if __name__ == '__main__':
    app.run()