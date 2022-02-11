import React from 'react';
import PropTypes from 'prop-types';

import './list.scss';

const Lists = ({
  devises,
  onListClick,
  searchValue,
  onSearchChange,
}) => (
  <div className="lists">
    {/* <h2 className="lists__title">Currencies</h2> */}
    <input
      type="text"
      placeholder="Recherche une devise"
      className="lists__search"
      value={searchValue}
      onChange={onSearchChange}
    />
    <ul className="lists__devises">
      {
        // on évalue du JS dans des accolades
        // on fait ensuite un map sur devises
        // pour transformer chaque case du tableau de données
        // en élément JSX
        devises.map(
          // map prend en parametre un callback
          // ce callback prend en parametre une case du tableau
          // (une devise quoi)
          // et renvoie du JSX
          (devise) => (
            // on renvoie du JSX dans le callback du map
            <li
              onClick={() => {
                console.log('Coucou, je suis une liste');
                onListClick(devise.name);
              }}
              key={devise.name}
              className="lists__devises__item"
            >
              {devise.name}
            </li>
          ),
        )
      }
    </ul>
  </div>
);

Lists.propTypes = {
  devises: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      rate: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  onListClick: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

export default Lists;
