import React, {FC, MouseEventHandler} from "react";
import {Table} from "semantic-ui-react";
import {Asset, Holder} from "../../../types";

export interface AssetTableProps {
  holders: Record<string, Holder>,
  assets: Record<string, Asset>,
  onClick: MouseEventHandler
}

export const AssetTable: FC<AssetTableProps> = ({holders, assets, onClick}) => (
  <Table celled selectable>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Status</Table.HeaderCell>
        <Table.HeaderCell>Serial</Table.HeaderCell>
        <Table.HeaderCell>Assigned to</Table.HeaderCell>
        <Table.HeaderCell>Notes</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      { Object.values(assets).map(({name, notes, serial, assignedTo, blocked, id}) =>
        <Table.Row key={id} data-id={id} onClick={onClick}>
          <Table.Cell>{name}</Table.Cell>
          <Table.Cell>{blocked ? 'Blocked' : 'Active'}</Table.Cell>
          <Table.Cell>{serial}</Table.Cell>
          <Table.Cell>{assignedTo && holders[assignedTo as string].name}</Table.Cell>
          <Table.Cell>{notes}</Table.Cell>
        </Table.Row>
      )}
    </Table.Body>
  </Table>
);


