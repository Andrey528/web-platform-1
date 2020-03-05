import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import SVGInline from 'react-svg-inline';

import arrowSvg from '../../img/arrow.svg';
import './ResultsTourneyHeader.scss';

const ResultsTourneyHeader = ({ name, locale, isOpen, changeOpen }) => {
  const b = block('results-tourney-header');
  return (
    <div className={b()} onClick={() => changeOpen(!isOpen)}>
      <div className={b('title')} title={name}>
        <span className={b('text')}>{name}</span>
      </div>
      <div className={b('right')}>
        {isOpen && (<React.Fragment>
          <div className={b('col-name', { type: 'date' })}>{locale.date}</div>
          <div className={b('col-name', { type: 'result' })}>{locale.result}</div>
        </React.Fragment>)}
        <div className={b('arrow-box')}>
          <SVGInline className={b('arrow-icon', { closed: !isOpen }).toString()} svg={arrowSvg} />
        </div>
      </div>
    </div>
  );
};

ResultsTourneyHeader.propTypes = {
  locale: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,

  changeOpen: PropTypes.func.isRequired,
};


export default ResultsTourneyHeader;