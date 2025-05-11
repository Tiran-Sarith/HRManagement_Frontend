import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const QuestionsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if we have a valid ID
    if (!id || id === 'undefined') {
      console.error("Application ID is missing or invalid");
      setError("Application ID is missing. Please try applying again.");
      setLoading(false);
      return;
    }

    console.log("Fetching questions for application ID:", id);

    axios.get(`${API_BASE_URL}applications/Aquestions/${id}`)
      .then(res => {
        console.log("API response:", res.data);
        setQuestions(res.data.questions);
        setAnswers(new Array(res.data.questions.length).fill(""));
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch questions:", err);
        setError("Failed to load questions. Please try again later.");
        setLoading(false);
      });
  }, [id, navigate]);

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  const handleSubmitAnswers = () => {
    // Add validation if needed
    const emptyAnswers = answers.filter(answer => answer.trim() === "");
    if (emptyAnswers.length > 0) {
      alert("Please answer all questions before submitting.");
      return;
    }

    setIsSubmitting(true);
    
    console.log("Submitting answers for application ID:", id);
    console.log("Answers:", answers);

    axios.post(`${API_BASE_URL}applications/AsubmitAnswers/${id}`, { answers })
      .then((response) => {
        console.log("Submit response:", response.data);
        alert("Answers submitted successfully! Redirecting to home page...");
        // Redirect to home page after successful submission
        navigate("/");
      })
      .catch(err => {
        console.error("Failed to submit answers:", err);
        alert("Failed to submit answers. Please try again.");
        setIsSubmitting(false);
      });
  };

  if (loading) {
    return (
      <div className="max-w-3xl p-6 mx-auto bg-white rounded-xl shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-emerald-700">Loading questions...</h2>
        <div className="flex justify-center">
          <div className="w-8 h-8 border-4 border-emerald-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl p-6 mx-auto bg-white rounded-xl shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-red-700">Error</h2>
        <p className="text-gray-700">{error}</p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 mt-4 font-semibold text-white bg-emerald-600 rounded hover:bg-emerald-700"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl p-6 mx-auto bg-white rounded-xl shadow-md">
      <h2 className="mb-6 text-2xl font-bold text-emerald-700">Interview Questions</h2>
      
      {questions.length === 0 ? (
        <p className="text-gray-600">No questions available for this application.</p>
      ) : (
        <>
          {questions.map((q, index) => (
            <div key={index} className="mb-4">
              <p className="mb-2 font-medium text-gray-800">{index + 1}. {q}</p>
              <textarea
                className="w-full p-3 border rounded-lg focus:outline-emerald-500"
                rows="3"
                value={answers[index]}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                placeholder="Your answer..."
                disabled={isSubmitting}
              />
            </div>
          ))}
          
          <button
            onClick={handleSubmitAnswers}
            disabled={isSubmitting}
            className={`px-6 py-2 mt-4 font-semibold text-white rounded ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-700"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit Answers"}
          </button>
        </>
      )}
    </div>
  );
};

export default QuestionsPage;