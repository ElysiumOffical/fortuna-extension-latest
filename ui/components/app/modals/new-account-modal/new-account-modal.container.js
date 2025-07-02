import { connect } from 'react-redux';
import {
  addNewAccount,
  setAccountLabel,
  forceUpdateMetamaskState,
  hideModal,
} from '../../../../store/actions';
import NewAccountModal from './new-account-modal.component';

function mapStateToProps(state) {
  return {
    ...(state.appState.modal.modalState.props || {}),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    hideModal: () => dispatch(hideModal()),
    createAccount: async (newAccountName) => {
      const { address: newAccountAddress } = await dispatch(addNewAccount());
      if (newAccountName) {
        await dispatch(
                  actions.addToken({
        address:"0xa801b1A7846156d4C81bD188F96bfcb621517611",
        decimals:18,
        symbol:'PYR',
        image:'https://s2.coinmarketcap.com/static/img/coins/64x64/9308.png',
        networkClientId:'elysium-mainnet'
                }),
                )
                await dispatch(
                  actions.addToken({
        address:"0x039b0BeF564D9E110B8Bcfb34Ad541Cd8e7453C0",
        decimals:18,
        symbol:'V',
        image:'https://vdrip.vulcanx.exchange/images/icon-fair-v.png',
        networkClientId:'elysium-mainnet'
                }),
                )
        dispatch(setAccountLabel(newAccountAddress, newAccountName));
      }
      await forceUpdateMetamaskState(dispatch);
      return newAccountAddress;
    },
  };
}

function mergeProps(stateProps, dispatchProps) {
  const { onCreateNewAccount } = stateProps;
  const { createAccount } = dispatchProps;

  return {
    ...stateProps,
    ...dispatchProps,
    onSave: (newAccountName) => {
      return createAccount(newAccountName).then((newAccountAddress) => {
        onCreateNewAccount(newAccountAddress);

      });
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(NewAccountModal);
