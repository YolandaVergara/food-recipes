import React, { useContext, useState } from 'react';
import { CategoryContext } from '../context/CategoryContext';

const Form = () => {
  const [search, saveSearch] = useState({
    name: '',
    category: ''
  })
  const { categories } = useContext(CategoryContext);

  //función para leer los contenidos
  const getDataRecipe = ev => {

    saveSearch({
      ...search,
      [ev.target.name] : ev.target.value
    })
  }
  return (

    <form className="col-12">

      <fieldset className="text-center">
        <legend>Busca por categoría o ingrediente</legend>
      </fieldset>

      <div className="row mt-4">
        <div className="col-md-4">
          <input
            name="name"
            className="form-control"
            type="text"
            placeholder="Buscar por ingrediente"
            onChange={getDataRecipe}
          />
        </div>

        <div className="col-md-4">
          <select
            className="form-control"
            name="category"
            onChange={getDataRecipe}
          >
            <option value="">Selecciona categoría</option>
            {categories.map(category => (
              <option key={category.strCategory}
                value={category.strCategory}>{category.strCategory}</option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <input
            type="submit"
            className="btn btn-block btn-primary"
            value="Buscar"
          />
        </div>
      </div>
    </form>
  )
}
export default Form;