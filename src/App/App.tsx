import React, {FC, useReducer} from 'react';
import './App.css';
import {getInitialState, rootReducer} from "../store";
import {AssetCRUD, HolderCRUD} from "../views";
import {Menu, TransferRecordTable} from '../components';
import {Container} from "semantic-ui-react";
import {Section, useSectionManager} from "../utils";

export const App: FC = () => {
  const initialState = getInitialState();
  const [{assets, holders, records}, dispatch] = useReducer(rootReducer, initialState);
  const [section, handlers] = useSectionManager();

  return (
    <>
      <Menu section={section} handlers={handlers}/>
      <Container className={'main'}>

        {section === Section.Holders &&
        <HolderCRUD
          assets={assets}
          records={records}
          holders={holders}
          dispatch={dispatch}
        />
        }
        {section === Section.Assets &&
        <AssetCRUD
          records={records}
          assets={assets}
          holders={holders}
          dispatch={dispatch}
        />
        }
        {section === Section.TransferRecords &&
        <TransferRecordTable
          assets={assets}
          holders={holders}
          records={records}
        />
        }
      </Container>
    </>
  );
};

export default App;
