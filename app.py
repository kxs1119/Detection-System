from flask import Flask,render_template
from flask_cors import CORS
from server.routes.api import api_bp # Import API bluepring

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return render_template('index.html')

# Register the API blueprint with the URL prefix '/api'
app.register_blueprint(api_bp, url_prefix='/api')

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=8080,debug=True) 