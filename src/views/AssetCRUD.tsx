import {AssetForm} from "../components/AssetForm";
import {List, Segment} from "semantic-ui-react";
import React, {FC, MouseEventHandler, useState} from "react";
import {Asset, Store, TransferRecord} from "../types";
import {Action, Actions} from "../store";
import {BackButton, TransferRecordTable} from "../components";

export interface AssetCRUDProps extends Store {
  dispatch: (x: Action) => void
}


function filterTransferRecords(id: string) {
  return ({asset}: TransferRecord) => asset === id;
}

export const AssetCRUD: FC<AssetCRUDProps> = ({assets, holders, records, dispatch}) => {
  const onSubmit = (a: Asset) => {
    dispatch({type: Actions.UPSERT_ASSET, payload: a})
  };

  const [editionMode, setEditionMode] = useState(false);
  const [currentAsset, setCurrentAsset] = useState('');

  const onClickAsset: MouseEventHandler<HTMLAnchorElement> =
    e => {
      e.preventDefault();
      const {currentTarget: {dataset}} = e;

      if (dataset.id) {
        console.log(assets[dataset.id]);
        setCurrentAsset(dataset.id);
        setEditionMode(true);
      }
    };

  const onClickBack = () => {
    setEditionMode(false);
  };

  const history = records
    .filter(filterTransferRecords(currentAsset));

  return editionMode ?
    <>
      <Segment>
        <BackButton onClick={onClickBack}/>
        <h2>Edit Asset</h2>
        <AssetForm holders={holders} onSubmit={onSubmit} asset={assets[currentAsset]}/>
      </Segment>
      {history.length &&
      <Segment>
        <h2>{assets[currentAsset].name} History</h2>
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
        <h2>Add Asset</h2>
        <AssetForm holders={holders} onSubmit={onSubmit}/>
      </Segment>
      <Segment>
        <h3>Free</h3>
        <List divided relaxed>
          {
            Object.values(assets).filter(x => !x.assignedTo).map(({name, id, assignedTo}) =>
              <List.Item key={id} onClick={onClickAsset} data-id={id}>
                <List.Content>
                  <List.Header>{name}</List.Header>
                  {typeof assignedTo === 'string' ? `Assigned to ${holders[assignedTo].name}` : 'Free'}
                </List.Content>
              </List.Item>)
          }
        </List>
        <h3>Taken</h3>
        <List divided relaxed>
          {
            Object.values(assets).filter(x => x.assignedTo).map(({name, id, assignedTo}) =>
              <List.Item key={id} onClick={onClickAsset} data-id={id}>
                <List.Content>
                  <List.Header>{name}</List.Header>
                  {typeof assignedTo === 'string' ? `Assigned to ${holders[assignedTo].name}` : 'Free'}
                </List.Content>
              </List.Item>)
          }
        </List>
      </Segment>
    </>
};
