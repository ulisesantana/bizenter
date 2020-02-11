import {AssetForm} from "../components/Forms/AssetForm";
import {Segment} from "semantic-ui-react";
import React, {FC, MouseEventHandler, useState} from "react";
import {Asset, Store, TransferRecord} from "../types";
import {Action, Actions} from "../store";
import {BackButton, Data, Flex, TransferRecordTable, AssetTable} from "../components";

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
        <h2>{assets[currentAsset].name} details</h2>
        <AssetForm
          holders={holders}
          onSubmit={onSubmit}
          asset={assets[currentAsset]}
        />
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
      <Flex alignContent="between">
        <AssetForm holders={holders} onSubmit={onSubmit}/>
        <Data
          icon="warehouse"
          data={Object.keys(assets).length}
          kpi={'Total Assets'}
        />
      </Flex>
     <AssetTable
      assets={assets}
      holders={holders}
      onClick={onClickAsset}
     />
    </>
};

export default AssetCRUD;
