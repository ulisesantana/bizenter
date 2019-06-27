import {Segment} from "semantic-ui-react";
import {HolderForm} from "../components/HolderForm";
import React, {FC, MouseEventHandler, useState} from "react";
import {Holder, Store, TransferRecord} from "../types";
import {Action, Actions} from "../store";
import {BackButton, HolderTable, TransferRecordTable} from "../components";

export interface HolderCRUDProps extends Store {
  dispatch: (x: Action) => void
}

function filterTransferRecords(id: string) {
  return (x: TransferRecord) => x.from === id || x.to === id;
}

export const HolderCRUD: FC<HolderCRUDProps> =
  ({holders, records, assets, dispatch}) => {
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

    const history = records
      .filter(filterTransferRecords(currentHolder));

    return (
      <>
        {editionMode
          ?
          <>
            <Segment>
              <BackButton onClick={onClickBack}/>
              <h2>Edit Holder</h2>
              <HolderForm onSubmit={onSubmit} holder={holders[currentHolder]}/>
            </Segment>
            {!!history.length &&
            <Segment>
              <h2>{holders[currentHolder].name} History</h2>
              <TransferRecordTable
                holders={holders}
                assets={assets}
                records={history}
              />
            </Segment>
            }
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

export default HolderCRUD;
