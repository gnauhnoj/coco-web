import os
import json
import datetime
from flask import Flask, request, Response
from flask import render_template, send_from_directory, url_for
from flask.ext.pymongo import PyMongo

app = Flask(__name__)

app.config.from_object('angular_flask.settings')
mongo = PyMongo(app)

app.url_map.strict_slashes = False

import angular_flask.core
import angular_flask.models
import angular_flask.controllers
