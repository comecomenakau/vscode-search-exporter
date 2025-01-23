from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# ルートパスのハンドラーを追加
@app.route('/')
def home():
    return 'Flask server is running!'

# ... 既存のコード ...

if __name__ == '__main__':
    app.run(debug=True)