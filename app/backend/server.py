from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import pandas as pd  # Excel出力のためにpandasをインポート
from io import BytesIO

app = Flask(__name__)
CORS(app)

# ルートパスのハンドラーを追加
@app.route('/')
def home():
    return 'Flask server is running!'

# テキストデータを受け取るエンドポイント
@app.route('/api/export', methods=['POST'])
def export():
    try:
        print("=== エクセル出力リクエスト受信 ===")
        data = request.json
        search_results = data.get('searchResults')
        
        print("受信データ:", search_results)

        # 文字列を行に分割
        rows = search_results.strip().split('\n')
        
        # DataFrameを作成
        df = pd.DataFrame(rows, columns=['検索結果'])
        
        # Excelファイルをメモリ上に作成
        excel_buffer = BytesIO()
        df.to_excel(excel_buffer, index=False)
        excel_buffer.seek(0)
        
        print("エクセル作成完了")

        # エクセルファイルを送信
        return send_file(
            excel_buffer,
            mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            as_attachment=True,
            download_name='export.xlsx'
        )

    except Exception as e:
        print("エラー発生:", str(e))
        return jsonify({"error": str(e)}), 500

@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify({"message": "Hello from Flask!"})

@app.route('/test', methods=['GET'])
def test():
    return jsonify({"message": "Server is running!"})

if __name__ == '__main__':
    print("=== サーバー起動 ===")
    print("Listening on http://localhost:5000")
    app.run(debug=True, port=5000)