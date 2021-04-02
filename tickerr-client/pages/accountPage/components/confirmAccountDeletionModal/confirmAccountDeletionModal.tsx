import React, { useContext } from "react";
import { useHistory } from "react-router";

import { Button } from "../../../../components/buttons/button";
import { Modal } from "../../../../components/modal/modal";
import { ModalBody } from "../../../../components/modal//modalBody";
import { ModalTitle } from "../../../../components/modal/modalTitle";

import { AccountStateContext } from "../../contexts/accountStateContext";
import { AppContext } from "../../../../components/app/contexts/appContext";

import { UserService } from "../../../../services/userService";

import { AccountStateAction } from "../../enums/accountStateAction";
import { AppAction } from "../../../../enums/appAction";
import { AuthErrorCode } from "../../../../enums/authErrorCode";
import { RequestStatus } from "../../../../enums/requestStatus";

interface ConfirmAccountDeletionModalProps {  
  
}

export const ConfirmAccountDeletionModal: React.FC<ConfirmAccountDeletionModalProps> = (props: ConfirmAccountDeletionModalProps) => {  
  const { dispatchToApp } = useContext(AppContext);

  const { accountState, dispatchToAccountState } = useContext(AccountStateContext);

  const { errorCode, status, statusMessage } = accountState;

  const dispatch = (type: AccountStateAction, payload?: any): void => dispatchToAccountState({ type, payload });

  const history: any = useHistory();

  const handleDeleteUser = async (): Promise<void> => {
    try {
      dispatch(AccountStateAction.SetStatus, RequestStatus.Loading);

      await UserService.delete();

      dispatchToApp({ type: AppAction.Cya });

      history.push("/cya");
    } catch (err) {
      console.error(err);

      if(err.code === AuthErrorCode.RecentLogin) {
        dispatch(AccountStateAction.RecentLoginRequiredError);
      } else {
        dispatch(AccountStateAction.UnknownError);
      }
    }
  }

  const handleOnClose = (): void => dispatch(AccountStateAction.CancelAccountDeletion);  

  const getModalBody = (): JSX.Element => {
    if(errorCode === AuthErrorCode.RecentLogin) {
      return (
        <Button id="tickerr-confirm-account-deletion-reauth-button" className="passion-one-font" handleOnClick={() => UserService.reauth()}>
          Sign in again
        </Button>
      )
    }

    return (
      <React.Fragment>
        <Button id="tickerr-confirm-account-deletion-button" className="passion-one-font" handleOnClick={handleDeleteUser}>
          Yes, I am sure!
        </Button>
        <Button className="passion-one-font" handleOnClick={handleOnClose}>
          Nevermind!
        </Button>
      </React.Fragment>
    )
  }

  return (      
    <Modal 
      id="tickerr-confirm-account-deletion-modal" 
      status={status} 
      statusMessage={statusMessage}
      handleOnClose={handleOnClose}
    >
      <ModalTitle text="Are you sure?" handleOnClose={handleOnClose} />
      <ModalBody>
        {getModalBody()}
      </ModalBody>
    </Modal>
  );
}