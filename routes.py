
import hashlib
import os
from app import app, db
from flask import render_template, redirect, request, session, url_for, send_from_directory,flash
from models import Travel, Imageone, Imagetwo, Imagethr, Imagefour, Imagefive, User


from urllib.parse import urlencode
from werkzeug.utils import secure_filename


from flask_login import LoginManager, login_user, logout_user

from datetime import datetime, timedelta

from flask_login import login_required

@app.route('/protected')
@login_required
def protected():
    # Your protected view logic
    return 'Protected view'


@app.route('/travel/contact/whatsapp/<int:travel_id>')
def contact_via_whatsapp(travel_id):
    travel = Travel.query.get(travel_id)
    if travel:
        phone_number = "08169625345"  # Replace with your desired WhatsApp number
        message = f"Hello, I'm interested in the travel to {{travel.location}} with a price of {{travel.price}}."
        params = {
            'phone': phone_number,
            'text': message
        }
        whatsapp_url = f"https://wa.me/{urlencode(params)}"
        return redirect(whatsapp_url)
    else:
        flash('Travel not found.')
        return redirect(url_for('index'))


@app.route('/')
def index():
    return redirect(url_for('home'))


   
@app.route('/home')
def home():
    travels = Travel.query.order_by(Travel.id).all()
    return render_template("index.html", travels=travels )

@app.route('/a')
def homea():
    travels = Travel.query.order_by(Travel.id).all()
    return render_template("form.html", travels=travels )


@app.route('/admin')
@login_required
def admin():
    travels = Travel.query.all()
    imgone = Imageone.query.all()
    imgtwo = Imagetwo.query.all()
    imgthr = Imagethr.query.all()
    imgfour = Imagefour.query.all()
    imgfive = Imagefive.query.all()
    user = User.query.all()
    return render_template('admin.html',user=user, travels=travels, imgone=imgone,imgtwo=imgtwo, imgthr=imgthr, imgfour=imgfour, imgfive=imgfive)




@app.route('/admin/add', methods=['GET', 'POST'])
@login_required
def add_travel():
    travels = Travel.query.all()
    imgone = Imageone.query.all()
    imgtwo = Imagetwo.query.all()
    imgthr = Imagethr.query.all()
    imgfour = Imagefour.query.all()
    imgfive = Imagefive.query.all()
    if request.method == 'POST':
        location = request.form['location']
        price = request.form['price']
        duration = request.form['duration']
        description = request.form['description']
        caption = request.form['caption']
        imgone = request.files['imageone']
        imgtwo = request.files['imagetwo']
        imgthr = request.files['imagethr']
        imgfour = request.files['imagefour']
        imgfive = request.files['imagefive']
        
        # Handle image uploads
        image = request.files['image']
        filename = secure_filename(image.filename)
        image.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        
        imgone_filename = secure_filename(imgone.filename)
        imgone.save(os.path.join(app.config['UPLOAD_FOLDER'], imgone_filename))

        imgtwo_filename = secure_filename(imgtwo.filename)
        imgtwo.save(os.path.join(app.config['UPLOAD_FOLDER'], imgtwo_filename))

        imgthr_filename = secure_filename(imgthr.filename)
        imgthr.save(os.path.join(app.config['UPLOAD_FOLDER'], imgthr_filename))

        imgfour_filename = secure_filename(imgfour.filename)
        imgfour.save(os.path.join(app.config['UPLOAD_FOLDER'], imgfour_filename))

        imgfive_filename = secure_filename(imgfive.filename)
        imgfive.save(os.path.join(app.config['UPLOAD_FOLDER'], imgfive_filename))
        
        travel = Travel(location=location, price=price, duration=duration,
                        image=filename, description=description, caption=caption)
        db.session.add(travel)

        image_one = Imageone(location=location, image=imgone_filename)
        travel.imageone.append(image_one)

        image_two = Imagetwo(location=location, image=imgtwo_filename)
        travel.imagetwo.append(image_two)

        image_thr = Imagethr(location=location, image=imgthr_filename)
        travel.imagethr.append(image_thr)

        image_four = Imagefour(location=location, image=imgfour_filename)
        travel.imagefour.append(image_four)

        image_five = Imagefive(location=location, image=imgfive_filename)
        travel.imagefive.append(image_five)

        db.session.commit()
        flash("Travel Record added successfully")
        return redirect(url_for('add_travel'))
    
    return render_template('add_travel.html', travels=travels, imgone=imgone,imgtwo=imgtwo, imgthr=imgthr, imgfour=imgfour, imgfive=imgfive)



@app.route('/admin/edit/<int:travel_id>', methods=['GET', 'POST'])
@login_required
def edit_travel(travel_id):
    travel = Travel.query.get_or_404(travel_id)

    
    if request.method == 'POST':
        travel.location = request.form['location']
        travel.price = request.form['price']
        travel.duration = request.form['duration']
        # Handle image upload
        image = request.files['image']
        filename = secure_filename(image.filename)
        image.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        
        travel.description = request.form['description']
        travel.caption = request.form['caption']
        
        db.session.commit()
        flash("Travel Record edited successfully")
        return redirect(url_for('admin'))
    
    return render_template('edit_travel.html', travel=travel)

@app.route('/admin/delete/<int:travel_id>', methods=['POST'])
@login_required
def delete_travel(travel_id):
    travel = Travel.query.get_or_404(travel_id)
    imgone = Imageone.query.get_or_404(travel_id)
    imgtwo = Imagetwo.query.get_or_404(travel_id)
    imgthr = Imagethr.query.get_or_404(travel_id)
    imgfour = Imagefour.query.get_or_404(travel_id)
    imgfive = Imagefive.query.get_or_404(travel_id)
    
    db.session.delete(travel)
    db.session.delete(imgone)
    db.session.delete(imgtwo)
    db.session.delete(imgthr)
    db.session.delete(imgfour)
    db.session.delete(imgfive)
    
    db.session.commit()
    flash("Travel Record deleted successfully")
    return redirect(url_for('admin'))


@app.route('/travel/details/<int:travel_id>')
def travel_details(travel_id):
    # Retrieve the travel details from the database using the travel ID
    travel = Travel.query.get(travel_id)
    travels = Travel.query.order_by(Travel.id).all()
    imgone = Imageone.query.get(travel_id)
    imgtwo = Imagetwo.query.get(travel_id)
    imgthr = Imagethr.query.get(travel_id)
    imgfour = Imagefour.query.get(travel_id)
    imgfive = Imagefive.query.get(travel_id)

    # Check if the travel exists
    if travel:
        return render_template('details.html', travel=travel, travels=travels, imgone=imgone, imgtwo=imgtwo, imgthr=imgthr, imgfour=imgfour, imgfive=imgfive)
    else:
        # Handle case where the travel ID does not exist
        flash('Travel not found.')
        return redirect(url_for('index'))


@app.route('/uploads/<filename>')
@login_required
def view_file(filename):
    return send_from_directory('static/uploads', filename)


@app.route('/signin', methods=['GET', 'POST'])
def signin():
    if request.method == 'GET':
        return render_template("signin.html")
    else:
        email = request.form['email']
        password = request.form['password']
        user = User.query.filter_by(email=email).first()
        p_hash = hashlib.sha256(password.encode()).hexdigest()
        if user is not None and user.password_hash == hashlib.sha256(password.encode()).hexdigest():
            login_user(user)
            flash("Welcome to your admin dashboard!")
            session['email'] = email
            session['p_hash'] = p_hash
                # set cookies
            resp = redirect(url_for('admin'))
            resp.set_cookie('id', str(user.id), max_age=timedelta (hours=24))
            resp.set_cookie('p_hash', p_hash, max_age=timedelta(hours=24))
            return resp
        else:
            flash("Invalid login details")
            return render_template('signin.html')