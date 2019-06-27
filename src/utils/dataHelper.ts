import {Entity, Holder, SelectOption} from "../types";
import {SyntheticEvent} from "react";

export function mapToID<T extends { id: string }>(x: T[]): Record<string, T> {
  return Object.values(x).reduce((acc, y) => ({...acc, [y.id]: y}), {})
}

export function sortBy(prop: string, desc = false) {
  return (x: Entity[]) =>
    x.sort((
      {[prop as keyof Entity]: aLabel},
      {[prop as keyof Entity]: bLabel}
      ) =>
        aLabel.toLowerCase() < bLabel.toLowerCase()
          ? (desc ? 1 : -1)
          : aLabel.toLowerCase() > bLabel.toLowerCase()
          ? (desc ? -1 : 1)
          : 0
    )
}

export const sortByName = sortBy('name');
export const sortByDateAsc = sortBy('date');
export const sortByDateDesc = sortBy('date', true);

function removeById(id: string) {
  return <T extends { id: string }>(x: T) => x.id !== id
}

export function filterById(id: string) {
  return <T extends Entity>(x: T[]) => x.filter(removeById(id))
}

export function toOptions(x: Record<string, Holder>): SelectOption[] {
  return [
    {key: 'free', text: 'Free', value: false} as SelectOption
  ].concat(Object.values(x).map(
    ({id, name}) => ({key: id, text: name, value: id})
  ));
}

export function onChangeFormFieldHandler<T, E extends SyntheticEvent, D extends { [key: string]: string }>
(state: T, setState: (x: any) => void) {
  return (event: E, {name, value, checked}: D) => {
    event.preventDefault();
    setState({[name]: checked !== undefined ? checked : value})
  }
}

