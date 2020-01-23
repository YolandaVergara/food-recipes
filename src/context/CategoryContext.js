import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';


//Creo el Context

export const CategoryContext = createContext();

//Provider para encontrar funciones y state

const CategoryProvider = (props) => {

  const [categories, saveCategory] = useState([]);

  //Llamada a la API
  useEffect(() => {
    const getCategory = async () => {
      const url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
      const categories = await axios.get(url);
      saveCategory(categories.data.meals);

    }
    getCategory();
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        categories
      }}>

      {props.children}
    </CategoryContext.Provider>
  )


}
export default CategoryProvider;