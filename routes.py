from flask import Flask, request
from flask_cors.decorator import cross_origin
from api import *


app = Flask("BalkoChallenge")


@app.route("/get_max_apple", methods=["GET", "POST"])
@cross_origin()
def main():
    params = request.get_json()
    check_error = check_parameters(params)

    if not check_error:
        resp = get_max_apple(params['A'], params['K'], params['L'])
        return response_generator(200, "Everything fine !", "response", resp, "request", params)
    else:
        return check_error


@app.route("/")
@cross_origin()
def access_denied():
    return response_generator(403, "Access Denied !", "", "", "", "")
