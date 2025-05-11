import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const QuestionsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}applications/Aquestions/${id}`)
      .then(res => {
        setQuestions(res.data.questions);
        setAnswers(new Array(res.data.questions.length).fill(""));
      })
      .catch(err => console.error("Failed to fetch questions:", err));
  }, [id]);

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  const handleSubmitAnswers = () => {
    axios.post(`${API_BASE_URL}applications/AsubmitAnswers/${id}`, { answers })
      .then(() => {
        alert("Answers submitted successfully!");
        navigate("/careers"); // or show a success screen
      })
      .catch(err => console.error("Failed to submit answers:", err));
  };

  return (
    <div className="max-w-3xl p-6 mx-auto bg-white rounded-xl shadow-md">
      <h2 className="mb-6 text-2xl font-bold text-emerald-700">Interview Questions</h2>
      {questions.map((q, index) => (
        <div key={index} className="mb-4">
          <p className="mb-2 font-medium text-gray-800">{index + 1}. {q}</p>
          <textarea
            className="w-full p-3 border rounded-lg focus:outline-emerald-500"
            rows="3"
            value={answers[index]}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
          />
        </div>
      ))}
      <button
        onClick={handleSubmitAnswers}
        className="px-6 py-2 mt-4 font-semibold text-white bg-emerald-600 rounded hover:bg-emerald-700"
      >
        Submit Answers
      </button>
    </div>
  );
};

export default QuestionsPage;
