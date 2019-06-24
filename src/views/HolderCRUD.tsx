import {Segment} from "semantic-ui-react";
import {HolderForm} from "../components/HolderForm";
import React, {FC} from "react";
import {Holder} from "../types";
import {Action, Actions} from "../store";
import {HolderTable} from "../components";

export interface HolderCRUDProps {
  holders: Record<string, Holder>,
  dispatch: (x: Action) => void
}

export const HolderCRUD: FC<HolderCRUDProps> = ({holders, dispatch}) => {
  const holderHandler = (h: Holder) => {
    dispatch({type: Actions.UPSERT_HOLDER, payload: h})
  };


  return (
    <Segment>
      <h2>Add Holder</h2>
      <HolderForm onSubmit={holderHandler}/>
      <HolderTable holders={holders}/>
    </Segment>
  )
};
