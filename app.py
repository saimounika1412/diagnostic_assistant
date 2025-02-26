# Backend: Flask API
from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import torch
from transformers import pipeline

app = Flask(__name__)
CORS(app)

# Load AI models
image_model = tf.keras.models.load_model('models/medical_cnn.h5')
nlp_pipeline = pipeline("text-classification", model="nlp_symptom_model")

def preprocess_image(image):
    image = image.resize((224, 224))
    image = np.array(image) / 255.0
    image = np.expand_dims(image, axis=0)
    return image

@app.route('/diagnose/image', methods=['POST'])
def diagnose_image():
    file = request.files['file']
    image = Image.open(io.BytesIO(file.read()))
    processed_image = preprocess_image(image)
    prediction = image_model.predict(processed_image)
    diagnosis = "Pneumonia" if prediction[0][0] > 0.5 else "Normal"
    return jsonify({"diagnosis": diagnosis, "confidence": float(prediction[0][0])})

@app.route('/diagnose/text', methods=['POST'])
def diagnose_text():
    data = request.json
    symptoms = data.get("symptoms", "")
    result = nlp_pipeline(symptoms)
    return jsonify({"diagnosis": result[0]['label'], "confidence": result[0]['score']})

if __name__ == '__main__':
    app.run(debug=True)
