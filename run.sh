#!/bin/bash

(cd backend && python app.py) &

(cd frontend && python -m http.server 8000)

