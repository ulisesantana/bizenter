import {AssetForm} from "../components/AssetForm";
import {List, Segment} from "semantic-ui-react";
import React, {FC} from "react";
import {Asset, Holder} from "../types";
import {Action, Actions} from "../store";

export interface AssetCRUDProps {
  assets: Record<string, Asset>,
  holders: Record<string, Holder>,
  dispatch: (x: Action) => void
}

export const AssetCRUD: FC<AssetCRUDProps> = ({assets, holders, dispatch}) => {
  const assetHandler = (a: Asset) => {
    dispatch({type: Actions.UPSERT_ASSET, payload: a})
  };

  return (
    <Segment>
      <AssetForm holders={holders} onSubmit={assetHandler}/>
      <h3>Free</h3>
      <List divided relaxed>
        {
          Object.values(assets).filter(x => !x.assignedTo).map(({name, id, assignedTo}) =>
            <List.Item key={id}>
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
            <List.Item key={id}>
              <List.Content>
                <List.Header>{name}</List.Header>
                {typeof assignedTo === 'string' ? `Assigned to ${holders[assignedTo].name}` : 'Free'}
              </List.Content>
            </List.Item>)
        }
      </List>
    </Segment>
  )
};
