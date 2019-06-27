import {AssetForm} from "../components/AssetForm";
import { List, Segment} from "semantic-ui-react";
import React, {FC, MouseEventHandler, useState} from "react";
import {Asset, Holder} from "../types";
import {Action, Actions} from "../store";
import {BackButton} from "../components";

export interface AssetCRUDProps {
  assets: Record<string, Asset>,
  holders: Record<string, Holder>,
  dispatch: (x: Action) => void
}

export const AssetCRUD: FC<AssetCRUDProps> = ({assets, holders, dispatch}) => {
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

  return editionMode ?
    <Segment>
      <BackButton onClick={onClickBack}/>
      <h2>Edit Asset</h2>
      <AssetForm holders={holders} onSubmit={onSubmit} asset={assets[currentAsset]}/>
    </Segment>
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
              <List.Item key={id}  onClick={onClickAsset} data-id={id}>
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
