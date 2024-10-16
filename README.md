# totaUI: A Local LLM Web Interface

## Overview

![preview](assets/preview.png)

totaUI is a beautiful and interactive web interface designed for local Language Models (LLMs). This application allows users to interact with their chosen model in a chat-like format, enabling real-time text generation.

### Features

- **Real-time Streaming:** Receive responses word by word as they are generated.
- **Model Selector:** Choose from multiple available models.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Python 3.6+](https://www.python.org/downloads/)
- [Pip](https://pip.pypa.io/en/stable/installation/) (Python package manager)

## Installation

Follow these steps to set up the project locally:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/totaUI.git
   cd totaUI
   ```

2. **Set Up the Backend**

   Navigate to the backend directory and install required packages:

   ```bash
   cd backend
   pip install flask flask-cors requests
   ```

3. **Set Up the Frontend**

   Navigate to the frontend directory. For basic usage, you might not need additional setup.

4. **Run the Application**

   You can use the provided `run.sh` script to start both the backend and frontend:

   ```bash
   chmod +x run.sh
   ./run.sh
   ```

   Alternatively, you can start them manually:
   - In one terminal, run the backend:
     ```bash
     cd backend
     python app.py
     ```

   - In another terminal, run the frontend:
     ```bash
     cd frontend
     python -m http.server 8000
     ```

5. **Access the Web Interface**

   Open your web browser and go to `http://localhost:8000` to interact with the LLM!

## Model Customization

By default, totaUI is set to work with a general local model. If you'd like to replace this with your own model, simply edit the configuration file in the backend to point to your preferred model files or API. This allows users to easily integrate any locally installed models or other APIs as needed.

## Usage

Once the application is running, you can:
- Select your preferred model from the dropdown in the top right.
- Type your messages in the input box and hit "Send".

## Contributions

Contributions are welcome! If you would like to contribute, please fork the repository and submit a pull request.
