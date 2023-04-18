import React, { useState } from "react";
import Select from "react-select";
import "./App.css";

const knownIngredients = [
  { value: "cebula", label: "Cebula" },
  // Dodaj więcej składników, jeśli chcesz
];

function App() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);

  const handleSearch = async () => {
    const response = await fetch("http://localhost:3001/generateRecipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredients: selectedIngredients.map((ingredient) => ingredient.value) }),
    });

    const generatedRecipes = await response.json();
    setRecipes(generatedRecipes);
  };

  return (
    <div className="App">
      <h1>RecipeMan</h1>
      <Select
        options={knownIngredients}
        isMulti
        onChange={(selected) => setSelectedIngredients(selected)}
        value={selectedIngredients}
        className="select-ingredients"
      />
      <button onClick={handleSearch}>Szukaj przepisów</button>
      <div className="recipes">
        {recipes.map((recipe, index) => (
          <div key={index} className="recipe">
            <img src={recipe.image} alt={recipe.title} />
            <div className="recipe-text">
              <h2>{recipe.title}</h2>
              <p>{recipe.description}</p>
            </div>
          </div>
      ))}
      </div>
    </div>
    
    );
    }