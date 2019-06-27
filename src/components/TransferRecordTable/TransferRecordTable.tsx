import React, {FC} from "react";
import {Table} from "semantic-ui-react";
import {Asset, Holder, TransferRecord} from "../../types";

export interface TransferRecordTableProps {
  assets: Record<string, Asset>
  holders: Record<string, Holder>
  records: TransferRecord[]
}

export const TransferRecordTable: FC<TransferRecordTableProps> = ({holders, assets, records}) => (
  <Table celled selectable>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Date</Table.HeaderCell>
        <Table.HeaderCell>Asset</Table.HeaderCell>
        <Table.HeaderCell>Asset Serial</Table.HeaderCell>
        <Table.HeaderCell>From</Table.HeaderCell>
        <Table.HeaderCell>To</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      { records.map(({id, asset, date, from, to}) =>
        <Table.Row key={id} data-id={id}>
          <Table.Cell>{date}</Table.Cell>
          <Table.Cell>{assets[asset].name}</Table.Cell>
          <Table.Cell>{assets[asset].serial}</Table.Cell>
          <Table.Cell>{ holders[from as string] && holders[from as string].name}</Table.Cell>
          <Table.Cell>{ holders[to as string] && holders[to as string].name}</Table.Cell>
        </Table.Row>
      )}
    </Table.Body>
  </Table>
);


