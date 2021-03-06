import React, { useState } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Spinner from 'components/Spinner';

import { actions as promocodeActions } from 'features/promocodes/redux';

import Input from 'components/Input/mobile';
import Button from 'components/Button/mobile';
import BackBlock from 'components/BackBlock/mobile';
import './PromotionalCodes.scss';

const PromotionalCodes = ({ activatePromocode, locale, actionProcessing }) => {
  const b = block('article');
  const [promocode, setPromocode] = useState('');
  const onActivateClick = () => {
    activatePromocode(promocode);
  };
  return (
    <React.Fragment>
      <BackBlock>
        <span>{locale.promocodes}</span>
      </BackBlock>
      <div className={b()}>
        <Spinner isLoading={actionProcessing} />
        <div className={b('wrapper')}>
          <div className={b('title')}>
            {locale.inputPromocode}
          </div>
          <div className={b('form')}>
            <div className={b('value')}>
              <Input
                type="text"
                name="promocode"
                placeholder=" "
                value={promocode}
                callBack={e => setPromocode(e.currentTarget.value)}
                size="default"
              />
            </div>
            <div className={b('activation-button')}>
              <Button
                text={locale.activate}
                size="default"
                color="dark"
                type="button"
                callBack={onActivateClick}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

PromotionalCodes.propTypes = {
  activatePromocode: PropTypes.func.isRequired,
  locale: PropTypes.object,
  actionProcessing: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    locale: state.locale.promocode,
    actionProcessing: state.promocode.actionProcessing,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    activatePromocode: promocodeActions.activatePromocode,
  };
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PromotionalCodes);