from flask import Flask, request, jsonify
import pandas as pd
import joblib
import numpy as np
import os

app = Flask(__name__)

# ✅ Load Models
best_model = joblib.load('models/best_model.pkl')
scaler = joblib.load('models/scaler.pkl')
label_encoders = joblib.load('models/label_encoders.pkl')

numerical_cols = ['age', 'bmi', 'cholesterol_level', 'diagnosis_date', 'end_treatment_date']
categorical_cols = ['gender', 'country', 'cancer_stage', 'family_history', 'smoking_status',
                    'hypertension', 'asthma', 'cirrhosis', 'other_cancer', 'treatment_type']

# ✅ Handle unseen labels by adding them to encoder
def update_encoder(encoder, value):
    if value not in encoder.classes_:
        encoder.classes_ = np.append(encoder.classes_, value)
    return encoder.transform([value])[0]

@app.route('/')
def home():
    return "Lung Cancer Prediction API is running!"

@app.route('/predict', methods=['POST'])
def predict():
    # ✅ Ensure Content-Type is JSON
    if request.content_type != 'application/json':
        return jsonify({'error': 'Content-Type must be application/json'}), 415

    try:
        # ✅ Get input data from request
        data = request.get_json()
        input_data = pd.DataFrame(data, index=[0])

        # ✅ Encode categorical data
        for col in categorical_cols:
            input_data[col] = update_encoder(label_encoders[col], input_data[col].iloc[0])

        # ✅ Convert dates to numerical timestamps
        input_data['diagnosis_date'] = pd.to_datetime(input_data['diagnosis_date']).astype(int) // 10**9
        input_data['end_treatment_date'] = pd.to_datetime(input_data['end_treatment_date']).astype(int) // 10**9

        # ✅ Scale numerical data
        input_data[numerical_cols] = scaler.transform(input_data[numerical_cols])

        # ✅ Predict using the best model
        if hasattr(best_model, 'predict_proba'):
            probability = best_model.predict_proba(input_data)[:, 1][0]
            prediction = 1 if probability > 0.35 else 0  # Threshold increased to 0.35
        else:
            prediction = best_model.predict(input_data)[0]

        # ✅ Return prediction result
        result = 'Survived' if prediction == 1 else 'Not Survived'
        return jsonify({'prediction': result})

    except Exception as e:
        return jsonify({'error': str(e)})

# ✅ Use PORT from environment for deployment (Render/Heroku)
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
