import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { KeyringTypes } from '@metamask/keyring-controller';
import {
  addNewAccount,
  setAccountLabel,
  addToken,
  getNextAvailableAccountName as getNextAvailableAccountNameFromController,
} from '../../../store/actions';
import { endTrace, trace, TraceName } from '../../../../shared/lib/trace';
import { CreateAccount } from '../create-account';

export const CreateEthAccount = ({
  onActionComplete,
  onSelectSrp,
  selectedKeyringId,
  redirectToOverview,
}) => {
  const dispatch = useDispatch();

  const onCreateAccount = async (name) => {
    trace({ name: TraceName.AddAccount });
    try {
      const newAccount = await dispatch(addNewAccount(selectedKeyringId));
      if (name) {
        await dispatch(
                  addToken({
        address:"0xa801b1A7846156d4C81bD188F96bfcb621517611",
        decimals:18,
        symbol:'PYR',
        image:'https://s2.coinmarketcap.com/static/img/coins/64x64/9308.png',
        networkClientId:'elysium-mainnet'
                }),
                )
                await dispatch(
                  addToken({
        address:"0x039b0BeF564D9E110B8Bcfb34Ad541Cd8e7453C0",
        decimals:18,
        symbol:'V',
        image:'https://vdrip.vulcanx.exchange/images/icon-fair-v.png',
        networkClientId:'elysium-mainnet'
                }),
                )
        dispatch(setAccountLabel(newAccount.address, name));
      }
      onActionComplete(true, newAccount);
    } finally {
      endTrace({ name: TraceName.AddAccount });
    }
  };

  const getNextAvailableAccountName = async () => {
    return await getNextAvailableAccountNameFromController(KeyringTypes.hd);
  };

  return (
    <CreateAccount
      onActionComplete={onActionComplete}
      onCreateAccount={onCreateAccount}
      getNextAvailableAccountName={getNextAvailableAccountName}
      onSelectSrp={onSelectSrp}
      selectedKeyringId={selectedKeyringId}
      redirectToOverview={redirectToOverview}
    ></CreateAccount>
  );
};

CreateEthAccount.propTypes = {
  /**
   * Executes when the Create button is clicked
   */
  onActionComplete: PropTypes.func.isRequired,
  /**
   * Callback to select the SRP
   */
  onSelectSrp: PropTypes.func,
  /**
   * Currently selected HD keyring
   */
  selectedKeyringId: PropTypes.string,
  /**
   * Whether to redirect to the overview page after creating the account
   */
  redirectToOverview: PropTypes.bool,
};
