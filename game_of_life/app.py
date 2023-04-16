from flask import Flask, render_template, jsonify, request
from gameoflife import GameOfLife

app = Flask(__name__)
game = GameOfLife()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/update_grid', methods=['POST'])
def update():
    grid = request.get_json()
    new_grid = game.update_grid(grid)
    return jsonify(new_grid)

if __name__ == '__main__':
    app.run(debug=True)
