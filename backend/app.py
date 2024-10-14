from flask import Flask, Response, request
from flask_cors import CORS
import requests
import json

app = Flask(__name__)
CORS(app)

OLLAMA_API = 'http://localhost:11434/api/generate'

@app.route('/generate', methods=['POST'])
def generate():
    user_input = request.json.get('input')

    if not user_input:
        return Response("No input provided", status=400)

    model_name = "YOUR_DEFAULT_MODEL_NAME"

    payload = {
        "prompt": user_input,
        "model": model_name
    }

    def stream_response():
        with requests.post(OLLAMA_API, json=payload, stream=True) as resp:
            if resp.status_code != 200:
                yield f"Error: {resp.text}\n"
                return

            for chunk in resp.iter_content(chunk_size=512):
                if chunk:
                    decoded_chunk = chunk.decode('utf-8')
                    try:
                        json_data = json.loads(decoded_chunk)
                        yield json_data.get('response', '')
                    except json.JSONDecodeError:
                        continue 

    return Response(stream_response(), content_type='text/event-stream')

if __name__ == "__main__":
    app.run(debug=True)

