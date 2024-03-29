from flask import Flask, jsonify, request, json
from flask_sqlalchemy import SQLAlchemy
import datetime
from flask_marshmallow import Marshmallow
from flask_cors import CORS
import urllib.request
from werkzeug.utils import secure_filename 
import os
from verify import verifyInvoice;


app = Flask(__name__)
CORS(app)


UPLOAD_FOLDER = 'static/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

ALLOWED_EXTENSIONS = {'pdf', 'jpg', 'jpeg', 'png'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.',1)[1].lower() in ALLOWED_EXTENSIONS

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/invocedoc'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

class Invoce(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(100))
    image = db.Column(db.Text())
    date = db.Column(db.DateTime, default=datetime.datetime.now)

    def __init__(self, description, image):
        self.description = description
        self.image = image
        self.image = image

class InvoceSchema(ma.Schema):
    class Meta:
        fields = ('id', 'description', 'image', 'date')

# Use distinct variable names for single and many instances
invoce_schema = InvoceSchema()
invoce_schemas = InvoceSchema(many=True)

@app.route('/get', methods=['GET'])
def get_invoices():
    all_invoce = Invoce.query.all()
    results = invoce_schemas.dump(all_invoce)
    return jsonify(results)

@app.route('/get/<id>/', methods=['GET'])
def post_details(id):
    invoce = Invoce.query.get(id)
    return invoce_schema.jsonify(invoce)

@app.route('/update/<id>/', methods=['PUT'])
def update_invoce(id):
    invoce = Invoce.query.get(id)

    description = request.json['description']
    image = request.json['image']

    invoce.description = description
    invoce.image = image
    db.session.commit()
    return invoce_schema.jsonify(invoce)

@app.route('/delete/<id>/', methods=['DELETE'])
def delete_invoce(id):
    invoce = Invoce.query.get(id)
    db.session.delete(invoce)
    db.session.commit()
    return invoce_schema.jsonify(invoce)

@app.route('/add', methods=['POST'])
def add_invoce():

    description = request.json['description']
    image = request.json['image']

    invoce = Invoce(description=description, image=image)
    db.session.add(invoce)
    db.session.commit()
    return invoce_schema.jsonify(invoce)



@app.route('/upload', methods=["POST"])
def upload_file():
 # check if the post request has the file part
    if 'files[]' not in request.files:
        resp = jsonify({
            "message": 'No file part in the request',
            "status": 'failed'
        })
        resp.status_code = 400
        return resp
  
    files = request.files.getlist('files[]')
      
    success = False
    resp = ""

    for file in files:      
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            newFile = Invoce(description=filename, image=filename)
            result = verifyInvoice(filename)
            if result:
                print(result)
                db.session.add(newFile)
                db.session.commit()
                success = True
        else:
            resp = jsonify({
                'result': result,
                "message": 'File type is not allowed',
                "status": 'failed'
            })
            return resp
         
    if success:
        resp = jsonify({
            "message": 'Files successfully uploaded',
            "status": 'success',
            "result": result
        })
        resp.status_code = 201
        return resp
    return resp


if __name__ == "__main__":
    app.run(debug=True)
