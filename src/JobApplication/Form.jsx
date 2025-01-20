import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import axios from "axios";

export default function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [file, setFile] = useState(null);
  const [jobTitle, setJobTitle] = useState("");

  const maxCharacters = 263;

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Validate required fields
    if (!name || !email || !phoneNo || !introduction || !file ||!jobTitle) {
      alert("Please fill out all required fields and upload a file!");
      return;
    }

    // Create form data
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("portfolio", portfolio);
    formData.append("phoneNo", phoneNo);
    formData.append("introduction", introduction);
    formData.append("file", file);
    formData.append("jobTitle", jobTitle);

    console.log("Submitting form data:", formData);

    try {
      const result = await axios.post(
        "http://localhost:8070/applications/Aadd",
        formData
      );
      console.log("Server response:", result.data);
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error.response || error.message);
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
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
            },
          }}
        />

<TextField
          id="jobTitle"
          label="Job Title"
          type="tel"
          variant="outlined"
          required
          onChange={(e) => setJobTitle(e.target.value)}
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
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
            },
          }}
        />

        <Button
          variant="outlined"
          component="label"
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
          />
        </Button>

        <FormControlLabel
          control={<Checkbox />}
          label="I'd like to receive updates on related career opportunities in the future by signing up for Sysco LABS Select"
        />

        <FormControlLabel
          control={<Checkbox required />}
          label="I agree to the Terms & Conditions of Sysco LABS as specified in the privacy policy and have understood it"
        />

        <Box display="flex" justifyContent="space-between">
          <Button
            variant="outlined"
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
            style={{
              borderRadius: "10px",
              backgroundColor: "#008000",
              color: "white",
            }}
          >
            Apply
          </Button>
        </Box>
      </Box>
    </div>
  );
}
