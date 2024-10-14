from flask import Flask, Response, request
from flask_cors import CORS
import requests
import json

app = Flask(__name__)
CORS(app)

OLLAMA_API = 'http://localhost:11434/api/generate'

# Route to handle streaming text generation
@app.route('/generate', methods=['POST'])
def generate():
    user_input = request.json.get('input')

    if not user_input:
        return Response("No input provided", status=400)

    model_name = "tota"

    # Prepare the payload for the Ollama API request
    payload = {
        "prompt": user_input,
        "model": model_name
    }

    # Stream the response from the Ollama API
    def stream_response():
        with requests.post(OLLAMA_API, json=payload, stream=True) as resp:
            if resp.status_code != 200:
                yield f"Error: {resp.text}\n"
                return

            for chunk in resp.iter_content(chunk_size=512):
                if chunk:
                    # Decode the chunk and filter to get only the generated response
                    decoded_chunk = chunk.decode('utf-8')
                    try:
                        # Parse the JSON to extract the response field
                        json_data = json.loads(decoded_chunk)
                        # Only yield the "response" value
                        yield json_data.get('response', '')
                    except json.JSONDecodeError:
                        continue  # Ignore invalid JSON

    # Return the response as a stream
    return Response(stream_response(), content_type='text/event-stream')

if __name__ == "__main__":
    app.run(debug=True)

