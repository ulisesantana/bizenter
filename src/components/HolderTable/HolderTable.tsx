import React, {FC} from "react";
import {Table} from "semantic-ui-react";
import {Holder} from "../../types";

export interface HolderTableProps {
  holders: Record<string, Holder>
}

export const HolderTable: FC<HolderTableProps> = ({holders}) => (
  <Table celled selectable>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Status</Table.HeaderCell>
        <Table.HeaderCell>Notes</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      { Object.values(holders).map(({name, notes, blocked, id}) =>
        <Table.Row key={id}>
          <Table.Cell>{name}</Table.Cell>
          <Table.Cell>{blocked ? 'Blocked' : 'Active'}</Table.Cell>
          <Table.Cell>{notes}</Table.Cell>
        </Table.Row>
      )}
    </Table.Body>
  </Table>
);


