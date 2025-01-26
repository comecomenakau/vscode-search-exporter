from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd  # Excel出力のためにpandasをインポート

app = Flask(__name__)
CORS(app)

# ルートパスのハンドラーを追加
@app.route('/')
def home():
    return 'Flask server is running!'

# テキストデータを受け取るエンドポイント
@app.route('/api/export', methods=['POST'])
def export_data():
    data = request.json  # JSONデータを取得
    search_results = data.get('searchResults', '')

    # データを整形してExcel出力
    if search_results:
        # ここでデータを整形する処理を追加
        df = pd.DataFrame({'Results': search_results.splitlines()})  # 改行で分割してDataFrameに変換
        df.to_excel('output.xlsx', index=False)  # Excelファイルに出力

        return jsonify({"message": "Excel file created successfully!"}), 200
    else:
        return jsonify({"error": "No data provided!"}), 400

@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify({"message": "Hello from Flask!"})

if __name__ == '__main__':
    app.run(debug=True)