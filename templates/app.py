from flask import Flask, render_template, redirect, url_for, session, g, request
from flask_session import Session
from templates.database import get_db, close_db
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
from templates.forms import RegistrationForm
from datetime import datetime

app = Flask(__name__)
app.teardown_appcontext(close_db)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
app.config["SECRET_KEY"] = "this-is-my-secret-key"
Session(app)

@app.route("/")
def index():
    return render_template("index.html") 

@app.route("/game")
def game():
    return render_template("game.html")


# @app.route("/store_score", methods=["POST"])
# def store_score():
#     score = int(request.form["score"])
#     #insert score to db

    
# @app.route("/user", methods=["GET", "POST"]) 
# def user():
#     form = RegistrationForm()
    
#     if form.validate_on_submit():
#         user_id = form.user_id.data
#         db = get_db()
#         possible_clashing_user = db.execute("""SELECT * FROM users
#                     WHERE user_id = ?;""", (user_id,)).fetchone()
#         if possible_clashing_user is not None:
#             form.user_id.errors.append("User id already taken!")
#         else:
#             db.execute("""INSERT INTO users (user_id, password)
#                     VALUES (?, ?);""",
#                     (user_id, generate_password_hash(r_password)))
#             db.commit()
#         return redirect( url_for("user") )
    
#     return render_template("user.html", form=form)