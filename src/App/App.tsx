import React, {FC, useReducer} from 'react';
import './App.css';
import {getInitialState, rootReducer} from "../store";
import {AssetCRUD, HolderCRUD} from "../views";
import {Menu} from '../components';
import {Container} from "semantic-ui-react";
import {Section, useSectionManager} from "../utils";

export const App: FC = () => {
  const initialState = getInitialState();
  const [{assets, holders, records}, dispatch] = useReducer(rootReducer, initialState);
  const [section, handlers] = useSectionManager();

  return (
    <>
      <Menu section={section} handlers={handlers}/>
      <Container>

        {section === Section.Holders &&
        <HolderCRUD
          holders={holders}
          dispatch={dispatch}
        />
        }
        {section === Section.Assets &&
        <AssetCRUD
          assets={assets}
          holders={holders}
          dispatch={dispatch}
        />
        }
        {section === Section.TransferRecords &&
        (<pre>
          <code>
            {JSON.stringify(Object.values(records), null, 2)}
          </code>
        </pre>)
        }
      </Container>
    </>
  );
};

export default App;
