import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import LoadingSnackbar from "../Components/LoadingSnackbar";
 // Import the LoadingSnackbar component

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Form() {
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate(); // Initialize navigate
  const [vacancy, setVacancy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLoadingSnackbar, setShowLoadingSnackbar] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [file, setFile] = useState(null);
  const [jobTitle, setJobTitle] = useState("");

  const [jobRequirements, setJobRequirements] = useState("");
  const [vacancyId, setVacancyId] = useState("");

  const maxCharacters = 263;

  useEffect(() => {
    // Fetch vacancy details using the ID from the URL
    axios.get(`${API_BASE_URL}vacancies/Vview/${id}`)
      .then((response) => {
        setVacancy(response.data);
        setJobTitle(response.data?.jobTitle || ""); // Auto-fill jobTitle
        setJobRequirements(response.data?.requirements || ""); // Auto-fill requirements
        setVacancyId(response.data?._id || ""); // Auto-fill vacancyId

        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching vacancy details:', error);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Validate required fields
    if (!name || !email || !phoneNo || !introduction || !file || !jobTitle) {
      alert("Please fill out all required fields and upload a file!");
      return;
    }

    // Show loading state
    setIsSubmitting(true);
    setShowLoadingSnackbar(true);

    // Create form data
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("portfolio", portfolio);
    formData.append("phoneNo", phoneNo);
    formData.append("introduction", introduction);
    formData.append("file", file);
    formData.append("jobTitle", jobTitle);
    formData.append("jobRequirements", jobRequirements);
    formData.append("vacancyId", vacancyId);

    console.log("Submitting form data:", formData);

    try {
      const result = await axios.post(
        `${API_BASE_URL}applications/Aadd`,
        formData
      );
      console.log("Server response:", result.data);
      
      // Extract the application ID from the response
      const applicationId = result.data._id;
      
      if (applicationId) {
        // Keep showing the snackbar during the transition
        // We'll navigate after a slight delay to show the loading state
        setTimeout(() => {
          navigate(`/questions/${applicationId}`);
        }, 1500); // Add a small delay for better UX
      } else {
        setShowLoadingSnackbar(false);
        setIsSubmitting(false);
        alert("Application submitted but couldn't retrieve application ID. Please contact support.");
      }
    } catch (error) {
      console.error("Error submitting form:", error.response || error.message);
      setShowLoadingSnackbar(false);
      setIsSubmitting(false);
      alert("An error occurred while submitting the form. Please try again.");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "10px",
        maxWidth: "600px",
        margin: "auto",
      }}
    >
      <Typography
        variant="h6"
        style={{
          fontWeight: "bold",
          color: "#008000",
          marginBottom: "20px",
        }}
      >
        Personal Information
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          "& > :not(style)": { marginBottom: "20px", width: "100%" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="name"
          label="Name with initials*"
          variant="outlined"
          required
          onChange={(e) => setName(e.target.value)}
          disabled={isSubmitting}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
            },
          }}
        />

        <TextField
          id="email"
          label="Email*"
          type="email"
          variant="outlined"
          required
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
            },
          }}
        />

        <TextField
          id="portfolio"
          label="Portfolio / Github / LinkedIn"
          variant="outlined"
          onChange={(e) => setPortfolio(e.target.value)}
          disabled={isSubmitting}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
            },
          }}
        />

        <TextField
          id="phoneNo"
          label="Telephone No*"
          type="tel"
          variant="outlined"
          required
          onChange={(e) => setPhoneNo(e.target.value)}
          disabled={isSubmitting}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
            },
          }}
        />

        <TextField
          id="introduction"
          label="Say something about you*"
          multiline
          rows={4}
          value={introduction}
          onChange={(e) => setIntroduction(e.target.value)}
          helperText={`${maxCharacters - introduction.length} characters left`}
          variant="outlined"
          required
          disabled={isSubmitting}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
            },
          }}
        />
        <div className="flex gap-2">
          <Button
            variant="outlined"
            component="label"
            disabled={isSubmitting}
            style={{
              borderRadius: "10px",
            }}
          >
            Upload CV*
            <input
              type="file"
              accept="application/pdf"
              hidden
              required
              onChange={(e) => setFile(e.target.files[0])}
              disabled={isSubmitting}
            />
          </Button>
          {file && (
          <Typography className="pt-1.5" color="textSecondary">
            {file.name}
          </Typography>
        )}
        </div>
        <FormControlLabel
          control={<Checkbox disabled={isSubmitting} />}
          label="I'd like to receive updates from the company"
        />

        <FormControlLabel
          control={<Checkbox required disabled={isSubmitting} />}
          label="I agree to the Terms & Conditions"
        />

        <Box display="flex" justifyContent="space-between">
          <Button
            variant="outlined"
            disabled={isSubmitting}
            style={{
              borderRadius: "10px",
              color: "#008000",
              borderColor: "#008000",
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            style={{
              borderRadius: "10px",
              backgroundColor: "#008000",
              color: "white",
            }}
          >
            {isSubmitting ? "Submitting..." : "Apply"}
          </Button>
        </Box>
      </Box>
      
      {/* Loading Snackbar */}
      <LoadingSnackbar 
        open={showLoadingSnackbar} 
        message="Processing your application..."
      />
    </div>
  );
}