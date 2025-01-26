from flask import Flask, request, jsonify
from flask_cors import CORS  # CORSを有効にするために必要

app = Flask(__name__)
CORS(app)  # CORSを有効化

@app.route('/api/export', methods=['POST'])
def export():
    data = request.json
    search_results = data.get('searchResults')
    
    # デバッグ用のブレークポイントをここに設定できます
    print(search_results)  # データの確認
    
    return jsonify({"message": "エクスポートが成功しました"})

if __name__ == '__main__':
    app.run(debug=True)