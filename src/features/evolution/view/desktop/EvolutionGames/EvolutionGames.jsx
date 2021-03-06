import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { evolutionIMG } from 'shared/utils/slots/evolution';

import { actions as evolutionGameActions } from 'features/evolution/redux';
import { actions as authActions } from 'features/auth/redux';

import Spinner from 'components/Spinner';
import EvolutionGameIcon from '../EvolutionGameIcon';
import './EvolutionGames.scss';

class EvolutionGames extends React.Component {
  static propTypes = {
    getGameList: PropTypes.func.isRequired,
    handleAuthModal: PropTypes.func.isRequired,
    gameList: PropTypes.array.isRequired,
    actionProcessing: PropTypes.bool.isRequired,
    isAuth: PropTypes.bool.isRequired,
  }

  componentDidMount() {
    const { getGameList } = this.props;
    getGameList();
  }

  render() {
    const b = block('evolution-games');
    const { gameList, actionProcessing, isAuth, handleAuthModal } = this.props;

    const games = gameList.length && gameList.map(game => {
      const id = game.ID;
      return (
        <EvolutionGameIcon
          key={id}
          img={evolutionIMG[id]}
          gameId={id}
          isAuth={isAuth}
          handleAuthModal={handleAuthModal}
        />
      );
    });

    return (
      <div className={b()}>
        <Spinner isLoading={actionProcessing} />
        {games}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  gameURL: state.evolution.gameURL,
  gameList: state.evolution.gameList,
  actionProcessing: state.evolution.actionProcessing,
  isAuth: state.auth.isAuth,
});

const mapDispatchToProps = dispatch => {
  const actions = {
    getGameList: evolutionGameActions.getGameList,
    handleAuthModal: authActions.handleAuthModal,
  };
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(EvolutionGames);
