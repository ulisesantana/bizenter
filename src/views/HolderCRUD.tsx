import {Segment} from "semantic-ui-react";
import {HolderForm} from "../components/HolderForm";
import React, {FC, MouseEventHandler, useState} from "react";
import {Holder} from "../types";
import {Action, Actions} from "../store";
import {BackButton, HolderTable} from "../components";

export interface HolderCRUDProps {
  holders: Record<string, Holder>,
  dispatch: (x: Action) => void
}

export const HolderCRUD: FC<HolderCRUDProps> = ({holders, dispatch}) => {
  const [editionMode, setEditionMode] = useState(false);
  const [currentHolder, setCurrentHolder] = useState('');

  const onSubmit = (h: Holder) => {
    dispatch({type: Actions.UPSERT_HOLDER, payload: h})
  };

  const onClick: MouseEventHandler<HTMLTableRowElement> =
    e => {
      e.preventDefault();
      const {currentTarget: {dataset}} = e;

      if (dataset.id) {
        setCurrentHolder(dataset.id);
        setEditionMode(true);
      }
    };


  const onClickBack = () => {
    setEditionMode(false);
  };


  return (
    <>
      {editionMode
        ?
        <>
          <Segment>
            <BackButton onClick={onClickBack}/>
            <h2>Edit Holder</h2>
            <HolderForm onSubmit={onSubmit} holder={holders[currentHolder]}/>

            <HolderTable
              holders={holders}
              onClick={onClick}
            />
          </Segment>
        </>
        :
        <>
          <Segment>
            <h2>Add Holder</h2>
            <HolderForm onSubmit={onSubmit}/>
          </Segment>

          <Segment>
            <HolderTable
              holders={holders}
              onClick={onClick}
            />
          </Segment>
        </>
      }
    </>
  )
};
