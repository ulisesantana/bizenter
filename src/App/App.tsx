import React, {FC, useReducer, Suspense} from 'react';
import './App.css';
import {getInitialState, rootReducer} from "../store";
import {Menu} from '../components';
import {Container, Dimmer, Loader} from "semantic-ui-react";
import {Section, useSectionManager} from "../utils";

const HolderCRUD = React.lazy(() => import('../views/HolderCRUD'));
const AssetCRUD = React.lazy(() => import('../views/AssetCRUD'));
const TransferRecordTable = React.lazy(() => import('../components/TransferRecordTable'));

const SuspenseLoader: FC = () => (
  <Dimmer active>
    <Loader size='massive'/>
  </Dimmer>
);

export const App: FC = () => {
  const initialState = getInitialState();
  const [{assets, holders, records}, dispatch] = useReducer(rootReducer, initialState);
  const [section, handlers] = useSectionManager();

  return (
    <>
      <Menu section={section} handlers={handlers}/>
      <Container className={'main'}>

        <Suspense
          fallback={<SuspenseLoader/>}
        >
          {section === Section.Holders &&
          <HolderCRUD
            assets={assets}
            records={records}
            holders={holders}
            dispatch={dispatch}
          />
          }
        </Suspense>

        <Suspense
          fallback={<SuspenseLoader/>}
        >
          {section === Section.Assets &&
          <AssetCRUD
            records={records}
            assets={assets}
            holders={holders}
            dispatch={dispatch}
          />
          }
        </Suspense>

        <Suspense
          fallback={<SuspenseLoader/>}
        >
          {section === Section.TransferRecords &&
          <TransferRecordTable
            assets={assets}
            holders={holders}
            records={records}
          />
          }
        </Suspense>

      </Container>
    </>
  );
};

export default App;
