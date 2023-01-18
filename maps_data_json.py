#  import dependencies
import numpy as np
import pandas as pd


import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy import func
from flask import Flask, jsonify,redirect , request
import json

#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///layoffdb.sqlite")
# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
layoff = Base.classes.cleanlayoffs_mapsdatajson
    # data = engine.execute("SELECT * FROM cleanlayoffs")
    # Create our session (link) from Python to the DB
session = Session(engine)

# Display the row's columns and data in dictionary format
results = session.query(layoff.country,layoff.location,layoff.industry,func.substr(layoff.date,0,5).label('year'),func.sum(layoff.total_laid_off).label('total')).group_by(layoff.country,layoff.location,layoff.industry,func.substr(layoff.date,0,5)).all()
session.close()
list_coms = []

#loop to above data into dictionary
for st in results:
    first_row = {}
    c = []
    first_row["country"]= st[0]
    first_row["location"]= st[1]
    first_row["industry"] = st[2]
    first_row["date"] = st[3]
    first_row["total_laid_off"]= st[4]


    list_coms.append(first_row)

# dump the dictionary into json file
jsonvar = json.dumps(list_coms)

jsonFile = open("layoff_line_data1.json", "w")
jsonFile.write(jsonvar)
jsonFile.close()

