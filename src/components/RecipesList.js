import React, { useContext } from 'react';
import Recipe from './Recipe';
import { RecipesContext } from '../context/RecipesContext';

const RecipesList = () => {

  //sacamos las Recetas
  const { recipes } = useContext(RecipesContext);

  return (
    <div className="row mt-5">
      {recipes.map(recipe => (
        <Recipe
        key={recipe.idMeal}
        recipe={recipe}
        />
      ))}
    </div>

  );
}
export default RecipesList;