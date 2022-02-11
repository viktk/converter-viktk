import React from 'react';
import PropTypes from 'prop-types';
import './toggler.scss';

// le composant Toggle a un role simple :
// appeler une fonction (onToggle) donnée en prop lorsque l'on clique sur le bouton
// et en fonction du booléen isOpen, afficher une classe CSS (toggler--open)
// de facon conditionnelle
const Toggler = ({ isOpen, onToggle }) => (
  <button
    className={isOpen ? 'toggler toggler--open' : 'toggler'}
    type="button"
    onClick={onToggle}
  >
    =
  </button>
);

Toggler.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  // nouveauté : premiere prop de type fonction
  onToggle: PropTypes.func.isRequired,
};

export default Toggler;
