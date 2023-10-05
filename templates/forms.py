from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import InputRequired



class RegistrationForm(FlaskForm):
    user_id = StringField("User id:",
                          
        validators=[InputRequired()])

    submit = SubmitField("Submit")