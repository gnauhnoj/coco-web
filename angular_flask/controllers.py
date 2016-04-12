import os
import json

from flask import Flask, request, Response
from flask import render_template, url_for, redirect, send_from_directory
from flask import send_file, make_response, abort
from angular_flask import app, mongo

# routing for API endpoints, generated from the models designated as API_MODELS
from angular_flask.models import *


# routing for basic pages (pass routing onto the Angular app)
@app.route('/')
def basic_pages(**kwargs):
    return make_response(open('angular_flask/templates/index.html').read())


# routing for CRUD-style endpoints
# passes routing onto the angular frontend if the requested resource exists
crud_url_models = app.config['CRUD_URL_MODELS']


# special file handlers and error handlers
@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'img/favicon.ico')


@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404


@app.route('/record', methods=['POST'])
def record():
    next_id = mongo.db.records.count()
    r = {'uid': next_id}
    data = json.loads(request.data)

    score = 0
    for trial in data:
        correct = False
        if data[trial][1] == 2:
            correct = True
            score += 1
        data[trial].append(correct)

    if len(data) > 3:
        score -= 3

    r['result'] = data
    r['score'] = score

    mongo.db.records.insert(r)
    return json.dumps(score)
