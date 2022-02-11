import React from 'react';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';

import './footer.scss';

const Footer = ({ devise, amount }) => (
  <header className="footer">
    <div className="footer__content">
      <CountUp decimals={2} className="footer__content__total" end={amount} />
      <p className="footer__content__namedevise">{devise}</p>
    </div>
  </header>
);

Footer.propTypes = {
  devise: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
};

export default Footer;
