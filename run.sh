#!/bin/bash

# Start the Flask backend in the background
(cd backend && python app.py) &

# Start the HTTP server for the frontend
(cd frontend && python -m http.server 8000)

