from flask import Flask, request,jsonify
import util
app = Flask(__name__)


@app.route('/get_location_names', methods=['GET'])
def get_location_names():
    response = jsonify({
        'locations': util.get_location_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/predict_home_price', methods=['POST'])
def predict_home_price():
    location = request.form['location']
    flat_type = float(request.form['flat_type'])
    storey_range = float(request.form['storey_range'])
    area_sqm = float(request.form['area_sqm'])
    lease_commence = float(request.form['lease_commence'])

    response = jsonify({
        'estimated_price': util.get_estimated_price(location, flat_type, storey_range, area_sqm, lease_commence)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == "__main__":
    print("Starting Python Flask Server for HDB Resale Prediction...")
    util.load_saved_artifacts()
    app.run()