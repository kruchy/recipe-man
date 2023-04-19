import React, { useState, useEffect } from "react";
import "./"
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import knownIngredients from "./ingredients";
import Image from "./img/chef.png"
const StyledAutocomplete = styled(Autocomplete)`
  width: 500px;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
`;

const Logo = styled(Box)`
  background-image: url(${Image});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 600px; 
  height: 400px; 
  margin: 20px auto; 
`;

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const apiUrl = process.env.REACT_APP_BACKEND_URL;
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 10000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSearchRecipes = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate recipes");
      }

      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error(error);
      setError("Wystąpił chwilowy błąd. Spróbuj ponownie później.");
    }
  };

  return (
    <div className="App">
      {error && (
        <div className="error-notification" style={notificationStyle}>
          {error}
        </div>
      )}
      <Logo />
      <div className="search-container" style={containerStyle}>
        <StyledAutocomplete
          multiple
          options={knownIngredients}
          onChange={(event, value) => setIngredients(value)}
          renderInput={(params) => (
            <StyledTextField
              {...params}
              variant="outlined"
              label="Wprowadź składniki"
              fullWidth
              className="search-input"
            />
          )}
        />
        <Button className="search-button" onClick={handleSearchRecipes} variant="contained" color="primary">
          Szukaj przepisów
        </Button>
      </div>

      <div className="recipes-container">
        {recipes.map((recipe, index) => (
          <div key={index} className="recipe">
            <img src={recipe.image} alt={recipe.title} />
            <div>
              <h2>{recipe.title}</h2>
              <p>{recipe.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const containerStyle= {
  display: "flex",
  "justifyContent" : "center",
  "alignItems" : "center",
  width: "100%",
  padding: "16px",
}

const notificationStyle = {
  position: "fixed",
  top: "20px",
  right: "20px",
  backgroundColor: "rgba(255, 0, 0, 0.8)",
  padding: "10px",
  borderRadius: "5px",
  zIndex: 1000,
  color: "white",
};

export default App;
