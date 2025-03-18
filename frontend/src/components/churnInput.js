import React, { useState } from 'react';
import axios from 'axios';
import styles from './churnInput.module.css';

function ChurnInput() {
  const [inputData, setInputData] = useState({
    credit_score: '',
    age: '',
    tenure: '',
    balance: '',
    num_of_products: '',
    has_cr_card: false,
    is_active_member: false,
    estimated_salary: '',
    geography: 'France',
    gender: 'Male',
  });

  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.checked });
  };

  const predictChurn = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      try {
        const response = await axios.post('http://localhost:8000/api/PredictChurnView/', inputData);
        setResult(response.data.churn_prediction);
      } catch (error) {
        console.error('Error predicting churn:', error);
      }
    } else {
      alert('Please fill in all required fields.');
    }
  };

  const isFormValid = () => {
    const requiredFields = ['credit_score', 'age', 'tenure', 'balance', 'num_of_products', 'estimated_salary'];
    return requiredFields.every(field => inputData[field] !== '');
  };

  return (
    <div className={styles.container}>
      <h1 style={{ color: 'white' }}>Churn Prediction App</h1>
      <div className={styles.flexcontainer}>
        <div className={styles.item}>
          <form className={styles.form}>
            <div>
              <label>Credit Score:</label>
              <input type="number" name="credit_score" value={inputData.credit_score} onChange={handleInputChange} required />
            </div>
            <div>
              <label>Age:</label>
              <input type="number" name="age" value={inputData.age} onChange={handleInputChange} required />
            </div>
            <div>
              <label>Tenure:</label>
              <input type="number" name="tenure" value={inputData.tenure} onChange={handleInputChange} required />
            </div>
            <div>
              <label>Balance:</label>
              <input type="number" name="balance" value={inputData.balance} onChange={handleInputChange} required />
            </div>
            <div>
              <label>Number of Products:</label>
              <input type="number" name="num_of_products" value={inputData.num_of_products} onChange={handleInputChange} required />
            </div>
            <div>
              <label>Has Credit Card?</label>
              <input type="checkbox" name="has_cr_card" checked={inputData.has_cr_card} onChange={handleCheckboxChange} />
            </div>
            <div>
              <label>Is Active Member?</label>
              <input type="checkbox" name="is_active_member" checked={inputData.is_active_member} onChange={handleCheckboxChange} />
            </div>
            <div>
              <label>Estimated Salary:</label>
              <input type="number" name="estimated_salary" value={inputData.estimated_salary} onChange={handleInputChange} required />
            </div>
            <div>
              <label>Geography:</label>
              <select name="geography" value={inputData.geography} onChange={handleInputChange}>
                <option value="France">France</option>
                <option value="Spain">Spain</option>
                <option value="Germany">Germany</option>
              </select>
            </div>
            <div>
              <label>Gender:</label>
              <select name="gender" value={inputData.gender} onChange={handleInputChange}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <button onClick={predictChurn}>Predict Churn</button>
          </form>
        </div>
        <div className={styles.item2}>
          <h2 style={{ color: 'yellow' }}>Result Of Prediction:</h2>
          {result !== null ? (
            <p>
              Churn Prediction: {result ? 'Churn: Customer is likely to exit.' : 'No Churn: Customer is not exiting the bank.'}
            </p>
          ) : (
            <p>Result will be shown here</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChurnInput;
