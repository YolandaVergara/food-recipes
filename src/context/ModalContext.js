import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

//crear el context
export const ModalContext = createContext();

const ModalProvider = (props) => {

  //state del provider
  const [idrecipe, saveIdRecipe] = useState(null);
  const [info, saveRecipe] = useState({});

  //Teniendo una receta, llamamos a la api para que nos muestre el detalle de la misma
  useEffect(() => {
    const getRecipe = async () => {
      if (!idrecipe) return;
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idrecipe}`;
      const result = await axios.get(url);
      saveRecipe(result.data.meals[0]);
      
    }
    getRecipe();
  }, [idrecipe]);

  return (
    <ModalContext.Provider
      value={{
        info,
        saveIdRecipe,
        saveRecipe
      }}>
      {props.children}
    </ModalContext.Provider>
  );
}
export default ModalProvider;