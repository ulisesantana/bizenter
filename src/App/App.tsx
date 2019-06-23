import React, {useReducer} from 'react';
import './App.css';
import {Actions, getInitialState, rootReducer} from "../store";
import {Asset, Holder} from "../types";
import {HolderForm} from "../components/HolderForm";
import {AssetForm} from "../components/AssetForm";

const container = {
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center'
};

export const App: React.FC = () => {
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
      <header className="App-header">
        <h2>New Holder</h2>
        <HolderForm onSubmit={holderHandler}/>
        <div style={container}>
          <ul>
            <h3>Active</h3>
            {
              Object.values(state.holders).filter(x => !x.blocked).map(({name, id}) => <li key={id}>
                {name}
              </li>)
            }
          </ul>
          <ul>
            <h3>Blocked</h3>
            {
              Object.values(state.holders).filter(x => x.blocked).map(({name, id}) => <li key={id}>
                {name}
              </li>)
            }
          </ul>
        </div>
        <AssetForm holders={state.holders} onSubmit={assetHandler}/>
        <div style={container}>
          <ul>
            <h3>Active</h3>
            {
              Object.values(state.assets).filter(x => !x.assignedTo).map(({name, id, assignedTo}) => <li key={id}>
                {name}, {typeof assignedTo === 'string' ? state.holders[assignedTo].name : 'Free'}
              </li>)
            }
          </ul>
          <ul>
            <h3>Blocked</h3>
            {
              Object.values(state.assets).filter(x => x.assignedTo).map(({name, id, assignedTo}) => <li key={id}>
                {name}, {typeof assignedTo === 'string' ? state.holders[assignedTo].name : 'Free'}
              </li>)
            }
          </ul>
        </div>
      </header>
    </div>
  );
};

export default App;
