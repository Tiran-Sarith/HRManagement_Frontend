import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";

export default function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [telephone, setTelephone] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState("");


  const maxCharacters = 263;

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents default form submission
    const formData = new FormData();
    
    formData.append("name",name );
    formData.append("email",email );
    formData.append("portfolio",portfolio );
    formData.append("telephone",telephone );
    formData.append("message",message );
    formData.append("file",file );
console.log(message, name, email, portfolio,telephone,file)
    // Perform validation
    // if (!name || !email || !telephone || !message || !file) {
    //   alert("Please fill out all required fields!");
    //   return;
    // }

    // // Create a data object for submission
    // const formData = {
    //   name,
    //   email,
    //   portfolio,
    //   telephone,
    //   message,
    //   file, // You might need to handle file uploads differently (see note below)
    // };
    // console.log("Form submitted:", formData);

  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", maxWidth: "600px", margin: "auto" }}>
      <Typography
        variant="h6"
        style={{
          fontWeight: "bold",
          color: "#008000", // Green text
          marginBottom: "20px",
        }}
      >
        Personal Information
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit} // Add the submit handler here
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
              borderRadius: "10px", // Adjust the border radius
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
              borderRadius: "10px", // Adjust the border radius
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
              borderRadius: "10px", // Adjust the border radius
            },
          }}
        />

        <TextField
          id="telephone"
          label="Telephone No*"
          type="tel"
          variant="outlined"
          required
          onChange={(e) => setTelephone(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px", // Adjust the border radius
            },
          }}
        />

        <TextField
          id="message"
          label="Say something about you*"
          multiline
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          helperText={`${maxCharacters - message.length} characters left`}
          variant="outlined"
          required
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px", // Adjust the border radius
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
          <input type="file" accept="application/pdf" hidden required 
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
              backgroundColor: "#008000", // Green button
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
