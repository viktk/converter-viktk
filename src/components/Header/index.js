import React from 'react';
import PropTypes from 'prop-types';

import './header.scss';

const Header = ({ searchValue, onAmountChange }) => (
  <header className="header">
    <div className="header__content">
      <h1 className="header__content__title">Converter</h1>
      <p className="header__content__devise">
        <input
          type="number"
          min="0"
          max="100000"
          placeholder="Montant en euro"
          className="header__content__search"
          // value={searchValue}
          // pour éviter l'erreur NaN lorsque le champs montant est vide
          value={searchValue || ''}
          onChange={onAmountChange}
        />
        euro(s)
      </p>
    </div>
  </header>
);

Header.propTypes = {
  // searchValue: PropTypes.number.isRequired,
  searchValue: PropTypes.number, // modification pour le NaN
  onAmountChange: PropTypes.func.isRequired,
};

export default Header;
