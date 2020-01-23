import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
export const RecipesContext = createContext();

const RecipesProvider = (props) => {

  const [recipes, saveRecipes] = useState([])
  const [search, searchRecipes] = useState({
    name: '',
    category: ''
  });

  const [consult, saveConsult] = useState(false);

  const { name, category } = search;

  useEffect(() => {
    if (consult) {
      const getRecipes = async () => {
        const url = `https://themealdb.com/api/json/v1/1/filter.php?i=${name}&c=${category}`
        const result = await axios.get(url);

        saveRecipes(result.data.meals);
      }
      getRecipes();
    }

  }, [search])
  return (

    <RecipesContext.Provider
      value={{
        recipes,
        searchRecipes,
        saveConsult
      }}
    >
      {props.children}
    </RecipesContext.Provider>
  )
}
export default RecipesProvider;