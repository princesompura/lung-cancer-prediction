from flask import Flask, request, jsonify
import pandas as pd
import joblib
import numpy as np
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:5173", "https://lung-cancer-frontend.onrender.com"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

# Load Models
best_model = joblib.load('models/best_model.pkl')
scaler = joblib.load('models/scaler.pkl')
label_encoders = joblib.load('models/label_encoders.pkl')

numerical_cols = ['age', 'bmi', 'cholesterol_level', 'diagnosis_date', 'end_treatment_date']
categorical_cols = ['gender', 'country', 'cancer_stage', 'family_history', 'smoking_status',
                    'hypertension', 'asthma', 'cirrhosis', 'other_cancer', 'treatment_type']
# Define the expected feature order (same as during training)
expected_features = numerical_cols + categorical_cols

def update_encoder(encoder, value):
    if value not in encoder.classes_:
        print(f"\n Unknown value '{value}' for encoder — mapping to default value!")
        value = encoder.classes_[0]
    return encoder.transform([value])[0]

@app.route('/')
def home():
    return "Lung Cancer Prediction API is running!"

@app.route('/predict', methods=['POST'])
def predict():
    if request.content_type != 'application/json':
        print("Content-Type error: Expected application/json, got", request.content_type)
        return jsonify({'error': 'Content-Type must be application/json'}), 415

    try:
        print("Received request data:", request.get_json())
        data = request.get_json()
        input_data = pd.DataFrame(data, index=[0])
        print("Input data as DataFrame:", input_data.to_dict())

        # Normalize input values to match training format
        input_data['gender'] = input_data['gender'].iloc[0].capitalize()
        input_data['country'] = input_data['country'].iloc[0].replace('USA', 'United States')
        input_data['family_history'] = input_data['family_history'].iloc[0].capitalize()
        input_data['smoking_status'] = input_data['smoking_status'].iloc[0].title()
        input_data['hypertension'] = 1 if input_data['hypertension'].iloc[0].lower() == 'yes' else 0
        input_data['asthma'] = 1 if input_data['asthma'].iloc[0].lower() == 'yes' else 0
        input_data['cirrhosis'] = 1 if input_data['cirrhosis'].iloc[0].lower() == 'yes' else 0
        input_data['other_cancer'] = 1 if input_data['other_cancer'].iloc[0].lower() == 'yes' else 0
        input_data['treatment_type'] = input_data['treatment_type'].iloc[0].title()
        print("After normalization:", input_data.to_dict())

        # Encode categorical data
        for col in categorical_cols:
            input_data[col] = update_encoder(label_encoders[col], input_data[col].iloc[0])
        print("After encoding categorical data:", input_data.to_dict())

        # Convert dates to numerical timestamps
        input_data['diagnosis_date'] = pd.to_datetime(input_data['diagnosis_date']).astype(int) // 10**9
        input_data['end_treatment_date'] = pd.to_datetime(input_data['end_treatment_date']).astype(int) // 10**9
        print("After converting dates:", input_data.to_dict())

        # Scale numerical data
        input_data_numerical = input_data[numerical_cols]  # Select numerical columns in the correct order
        input_data_numerical = scaler.transform(input_data_numerical)
        input_data[numerical_cols] = input_data_numerical
        print("After scaling numerical data:", input_data.to_dict())

        # Reorder input_data to match the expected feature order
        input_data = input_data[expected_features]
        print("After reordering features:", input_data.to_dict())

        # Predict using Logistic Regression
        if hasattr(best_model, 'predict_proba'):
            probability = best_model.predict_proba(input_data)[:, 1][0]
            print(f"\n Predicted Probability for 'Survived': {probability}")
            prediction = 1 if probability > 0.35 else 0
        else:
            prediction = best_model.predict(input_data)[0]
        print("Prediction:", prediction)

        result = 'Survived' if prediction == 1 else 'Not Survived'
        print("Final result:", result)
        return jsonify({'prediction': result})

    except Exception as e:
        print("Error occurred:", str(e))
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)