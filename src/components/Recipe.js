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
    width: 600,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
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
  const { saveIdRecipe } = useContext(ModalContext);
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
              handleClose();
            }}>
            <div style={modalStyle} className={classes.paper}>
              <h1>Desde Modal</h1>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}
export default Recipe;