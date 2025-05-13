import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingSnackbar from "../Components/LoadingSnackbar";
import SuccessSnackbar from "../Components/SuccessSnackbar"; // Import the new SuccessSnackbar component

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const QuestionsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLoadingSnackbar, setShowLoadingSnackbar] = useState(true); // Start with showing the loading snackbar
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false); // For success snackbar

  useEffect(() => {
    // Check if we have a valid ID
    if (!id || id === 'undefined') {
      console.error("Application ID is missing or invalid");
      setError("Application ID is missing. Please try applying again.");
      setLoading(false);
      setShowLoadingSnackbar(false);
      return;
    }

    console.log("Fetching questions for application ID:", id);

    // We're already showing the loading snackbar while fetching questions
    axios.get(`${API_BASE_URL}applications/Aquestions/${id}`)
      .then(res => {
        console.log("API response:", res.data);
        setQuestions(res.data.questions);
        setAnswers(new Array(res.data.questions.length).fill(""));
        setLoading(false);
        // Hide the snackbar after questions are loaded
        setShowLoadingSnackbar(false);
      })
      .catch(err => {
        console.error("Failed to fetch questions:", err);
        setError("Failed to load questions. Please try again later.");
        setLoading(false);
        setShowLoadingSnackbar(false);
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
    setShowLoadingSnackbar(true); // Show loading snackbar when submitting answers
    
    console.log("Submitting answers for application ID:", id);
    console.log("Answers:", answers);

    axios.post(`${API_BASE_URL}applications/AsubmitAnswers/${id}`, { answers })
      .then((response) => {
        console.log("Submit response:", response.data);
        setShowLoadingSnackbar(false);
        
        // Show success snackbar instead of alert
        setShowSuccessSnackbar(true);
        
        // Redirect to home page after the success snackbar is shown
        // We don't need the alert anymore since we're showing the snackbar
      })
      .catch(err => {
        console.error("Failed to submit answers:", err);
        alert("Failed to submit answers. Please try again.");
        setIsSubmitting(false);
        setShowLoadingSnackbar(false);
      });
  };

  // Function to handle what happens after success snackbar is closed
  const handleSuccessSnackbarClose = () => {
    // Navigate to home page after success snackbar is closed
    navigate("/");
  };

  if (loading) {
    return (
      <div className="max-w-3xl p-6 mx-auto bg-white rounded-xl shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-emerald-700">Generating Questions...</h2>
        <p className="text-gray-600 mb-4">We're analyzing your CV and preparing relevant questions. This might take a few moments.</p>
        <div className="flex justify-center">
          <div className="w-8 h-8 border-4 border-emerald-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
        
        {/* Show the loading snackbar during initial load */}
        <LoadingSnackbar 
          open={showLoadingSnackbar} 
          message="Generating questions..."
        />
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
              <p className="mb-2 font-medium text-md font-roboto text-gray-800 text-justify font-bold">{index + 1}. {q}</p>
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
      
      {/* Loading Snackbar - shown when submitting answers */}
      <LoadingSnackbar 
        open={showLoadingSnackbar} 
        message={isSubmitting ? "Submitting your answers..." : "Processing your application..."}
      />
      
      {/* Success Snackbar - shown after successful submission */}
      <SuccessSnackbar 
        open={showSuccessSnackbar} 
        message="Answers submitted successfully!" 
        duration={2000} 
        onClose={handleSuccessSnackbarClose}
      />
    </div>
  );
};

export default QuestionsPage;