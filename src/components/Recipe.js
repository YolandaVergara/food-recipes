import React, { useContext, useState } from 'react';
import { ModalContext } from '../context/ModalContext';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 800,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflow:'scroll',
    height:'100%',
    display:'block'
  },
}));


const Recipe = ({ recipe }) => {

  //Configuración del modal de matrial-ui
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const classes = useStyles();
  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }

  //extraemos los valores del ModalContext
  const { info, saveIdRecipe, saveRecipe } = useContext(ModalContext);
  //mostrar ingredientes en función de la info traída de la API
  const showIngredients = info => {
    let ingredients = [];
    for (let i = 1; i < 16; i++) {
      if (info[`strIngredient${i}`]) {
        ingredients.push(
          <li>{info[`strIngredient${i}`]} {info[`strMeasure${i}`]}</li>
        )
      }
    }
    return ingredients;
  }

  return (
    <div className="col-md-4 mb-3">
      <div className="card">
        <h2 className="card-header">{recipe.strMeal}</h2>
        <img className="card-img-top" src={recipe.strMealThumb} alt={`Imagen de ${recipe.strMeal}`} />
        <div className="card-body">
          <button
            type="button"
            className="btn btn-primary btn-block"
            onClick={() => {
              saveIdRecipe(recipe.idMeal);
              handleOpen();
            }}
          >
            Ver receta
          </button>


          <Modal
            open={open}
            onClose={() => {
              saveIdRecipe(null);
              saveRecipe({});
              handleClose();
            }}>
            <div style={modalStyle} className={classes.paper}>
              <h2>{info.strMeal}</h2>
              <h3 className="mt-4">Instrucciones</h3>
              <p>{info.strInstructions}</p>
              <img className="img-fluid my-4" src={info.strMealThumb} alt={info.strMeal} />
              <h3>Ingredientes y cantidades</h3>
              <ul>
                {showIngredients(info)}
              </ul>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}
export default Recipe;