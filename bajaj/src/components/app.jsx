import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' },
  ];

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      const response = await axios.post('http://localhost:3000/bfhl', parsedInput);
      setResponseData(response.data);
    } catch (error) {
      alert('Invalid JSON or API error!');
    }
  };

  const renderResponse = () => {
    if (!responseData) return null;

    const filteredResponse = {};
    selectedOptions.forEach((option) => {
      filteredResponse[option.value] = responseData[option.value];
    });

    return (
      <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Your Roll Number</h1>
      <textarea
        rows="5"
        cols="50"
        placeholder="Enter JSON here"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <Select
        options={options}
        isMulti
        onChange={setSelectedOptions}
        style={{ marginTop: '20px' }}
      />
      {renderResponse()}
    </div>
  );
};

export default App;
