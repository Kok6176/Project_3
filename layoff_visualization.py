""" This is a Python Flask API to do the effects of Layoffs in the period of 2020-2022 in a number of industries & countries
    """

from flask import Flask, render_template, request, flash, Markup
from flask_sqlalchemy import SQLAlchemy
from flask_bootstrap import Bootstrap

from flask_wtf import FlaskForm
from wtforms import SubmitField, HiddenField, StringField

app = Flask(__name__)

# Flask-WTF requires an enryption key - the string can be anything
app.config['SECRET_KEY'] = 'MLXH243GssUWwKdTWS7FDhdwYF56wPj8'

# Flask-Bootstrap requires this line
Bootstrap(app)

# the name of the database; add path if necessary
db_name = 'layoffdb.sqlite'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + db_name
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
# this variable, db, will be used for all SQLAlchemy commands
db = SQLAlchemy(app)

# each table in the database needs a class to be created for it
# db.Model is required - don't change it
# identify all columns by name and data type
class layoff(db.Model):
    __tablename__ = 'credential'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    city = db.Column(db.String)
    state = db.Column(db.String)
    country = db.Column(db.String)

    def __init__(self, name, city, state, country):
        self.name = name
        self.city = city
        self.state = state
        self.country = country

class layoff_db(db.Model):
    __tablename__ = 'cleanlayoffs'
    id = db.Column(db.Integer, primary_key=True)
    company = db.Column(db.String)
    location = db.Column(db.String)
    industry = db.Column(db.String)
    country = db.Column(db.String)
    date = db.Column(db.String)
    total_laid_off = db.Column(db.Integer)
# +++++++++++++++++++++++

# form for add_record 
# each field includes validation requirements and messages
class AddRecord(FlaskForm):
    # id used only by update/edit
    id_field = HiddenField()
    name = StringField('Name')
    city = StringField('City')
    state = StringField('State')
    country = StringField('Country')

    submit = SubmitField('Submit')
 
@app.route('/', methods=['GET', 'POST'])
def add_record():
    m= request.args.get('message')
    if m:
       return render_template('add_record.html', message=m) 
    form1 = AddRecord()
    if form1.validate_on_submit():
        name = request.form['name']
        city = request.form['city']
        state = request.form['state']
        country = request.form['country']

        record = layoff(name, city, state, country)
        # Flask-SQLAlchemy magic adds record to database
        db.session.add(record)
        db.session.commit()
        # create a message to send to the template
        message = f" Welcome {name}, from {city},{state},{country}.      The Layoff details you wanted to checkout ."
        return render_template('add_record.html', message=message)
    else:
        # show validaton errors
        # see https://pythonprogramming.net/flash-flask-tutorial/
        for field, errors in form1.errors.items():
            for error in errors:
                flash("Error in {}: {}".format(
                    getattr(form1, field).label.text,
                    error
                ), 'error')
        return render_template('add_record.html', form1=form1)

@app.route('/bar_chart', methods=['GET', 'POST'])
def bar_chart():
    data_loc="../layoffs.json"
    return render_template('bar_chart.html',data_loc=data_loc)
    
@app.route('/linechart', methods=['GET', 'POST'])
def linechart():
    return render_template('linechart.html')
    
@app.route('/maps', methods=['GET', 'POST'])
def maps():
    return render_template('maps.html')

if __name__ == '__main__':
    app.run(debug=True)    