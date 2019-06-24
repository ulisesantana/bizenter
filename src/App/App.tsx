import React, {FC, useReducer} from 'react';
import './App.css';
import {Actions, getInitialState, rootReducer} from "../store";
import {Asset, Holder} from "../types";
import {HolderForm} from "../components/HolderForm";
import {AssetForm} from "../components/AssetForm";
import {List, Segment} from "semantic-ui-react";

export const App: FC = () => {
  const initialState = getInitialState();
  const [state, dispatch] = useReducer(rootReducer, initialState);
  const holderHandler = (h: Holder) => {
    dispatch({type: Actions.UPSERT_HOLDER, payload: h})
  };

  const assetHandler = (a: Asset) => {
    dispatch({type: Actions.UPSERT_ASSET, payload: a})
  };


  return (
    <div className="App">
      <Segment color={"orange"}>
      <h2>New Holder</h2>
      <HolderForm onSubmit={holderHandler}/>
        <h3>Active</h3>
        <List divided relaxed>
          {
            Object.values(state.holders).filter(x => !x.blocked).map(({name, notes, id}) =>
              <List.Item key={id}>
                <List.Content>
                  <List.Header>{name}</List.Header>
                  {notes}
                </List.Content>
              </List.Item>)
          }
        </List>
        <h3>Blocked</h3>
        <List divided relaxed>
          {
            Object.values(state.holders).filter(x => !x.blocked).map(({name, notes, id}) =>
              <List.Item key={id}>
                <List.Content>
                  <List.Header>{name}</List.Header>
                  {notes}
                </List.Content>
              </List.Item>)
          }
        </List>
      </Segment>

      <Segment color={'teal'}>
      <AssetForm holders={state.holders} onSubmit={assetHandler}/>
        <h3>Free</h3>
        <List divided relaxed>
          {
            Object.values(state.assets).filter(x => !x.assignedTo).map(({name, id, assignedTo}) =>
              <List.Item key={id}>
                <List.Content>
                  <List.Header>{name}</List.Header>
                  {typeof assignedTo === 'string' ? `Assigned to ${state.holders[assignedTo].name}` : 'Free'}
                </List.Content>
              </List.Item>)
          }
        </List>
        <h3>Taken</h3>
        <List divided relaxed>
          {
            Object.values(state.assets).filter(x => x.assignedTo).map(({name, id, assignedTo}) =>
              <List.Item key={id}>
                <List.Content>
                  <List.Header>{name}</List.Header>
                  {typeof assignedTo === 'string' ? `Assigned to ${state.holders[assignedTo].name}` : 'Free'}
                </List.Content>
              </List.Item>)
          }
        </List>
      </Segment>
    </div>
  );
};

export default App;
