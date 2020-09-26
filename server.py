from flask import Flask, render_template, jsonify, request
from model import db, connect_to_db, Card
import time

app = Flask(__name__)  

@app.route("/")
def show_homepage():
    """Show the application's homepage."""

    return render_template("homepage.html")

@app.route("/cards")
def show_cards():
    """Show all trading cards."""

    return render_template("cards.html")

# usually prefix with api, these are api routes 
# for communicating between the frontend and the backend
# they're returning json (js object containing data you're asking for) not html 
    # it's a js object; can think of it like dictionary
    # has an array of things in it
    # data is within the cards key
# this route is created because you need to be able to ask for data from the url
@app.route("/cards.json")
def get_cards_json():
    """Return a JSON response with all cards in DB."""

    cards = Card.query.all()
    cards_list = []

    for c in cards:
        cards_list.append({"skill": c.skill, "name": c.name, "imgUrl": c.image_url})
    # use sleep to see how it loads
    time.sleep(2)

    return jsonify({"cards": cards_list}) 
    # jsonify turns ^ into [{'cards': cards_list}]
    # jsonify is something that Flask gives you
        # converts python dictionary or list to valid json object
            # cards_list is a python list that contains dictionaries

@app.route("/add-card", methods=["POST"])
def add_card():
    """Add a new card to the DB."""

    name = request.form.get('name')
    skill = request.form.get('skill')

    new_card = Card(name=name, skill=skill)
    db.session.add(new_card)
    db.session.commit()

    return jsonify({"success": True})

@app.route("/cards-jquery")
def show_cards_jquery():
    return render_template("cards-jquery.html")



if __name__ == "__main__":
  connect_to_db(app)
  app.run(debug=True, host='0.0.0.0')