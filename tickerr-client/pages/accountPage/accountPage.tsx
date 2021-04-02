import React, { useContext, useReducer } from "react";

import { Page } from "../page/page";

import { Button } from "../../components/buttons/button";
import { ConfirmAccountDeletionModal } from "./components/confirmAccountDeletionModal/confirmAccountDeletionModal";
import { UserIcon } from "../../components/userIcon/userIcon";

import { AccountStateContext } from "./contexts/accountStateContext";
import { AppContext } from "../../components/app/contexts/appContext";

import { accountStateReducer } from "./reducers/accountStateReducer";

import { useUpdatePageTitleEffect } from "../../effects/appEffects";

import { defaultAccountState } from "./models/accountState";

import { AccountStateAction } from "./enums/accountStateAction";

interface AccountPageProps {
  
}

export const AccountPage: React.FC<AccountPageProps> = (props: AccountPageProps) => {
  const { appState } = useContext(AppContext);

  const { user } = appState;

  const [accountState, dispatchToAccountState] = useReducer(accountStateReducer, defaultAccountState());

  const dispatch = (type: AccountStateAction, payload?: any): void => dispatchToAccountState({ type, payload });

  const { toggles } = accountState;

  useUpdatePageTitleEffect("Tickerr | My Account");

  const getContent = (): JSX.Element => {
    if(user) {
      return (
        <React.Fragment>
          <UserIcon image={user.image} />
          <div className="tickerr-user-full-name">
            <h1 className="passion-one-font">{user.name}</h1>
          </div>
          <div className="tickerr-user-email">
            <h1 className="passion-one-font">{user.email}</h1>
          </div>
          <Button 
            id="tickerr-delete-account-button" 
            className="passion-one-font" 
            handleOnClick={() => dispatch(AccountStateAction.ToggleConfirmAccountDeletion, true)}
          >
            Delete my account
          </Button>
        </React.Fragment>
      )
    }
  }
  
  const getConfirmDeleteModal = (): JSX.Element => {
    if(toggles.deletion) {
      return ( 
        <ConfirmAccountDeletionModal />
      )
    }
  }

  return(
    <AccountStateContext.Provider value={{ accountState, dispatchToAccountState }}>
      <Page id="tickerr-account-page" requireAuth>   
        {getContent()}
        {getConfirmDeleteModal()}
      </Page>
    </AccountStateContext.Provider>
  )
}