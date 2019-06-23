import {useState} from 'react';

export enum Section {
  Randomize = 'RANDOMIZE',
  Edit = 'EDIT',
  List = 'LIST',
  Settings = 'SETTINGS'
}

function goToGenerator(section: Section, setSection: Function){
  return () => {
    setSection(section)
  };
}

export interface SectionHandlers {
  goToRandomize: () => void,
  goToEdit: () => void,
  goToList: () => void,
  goToSettings: () => void
}

export function useSectionManager(initialSection = Section.Randomize): [Section, SectionHandlers]{
  const [section, setSection] = useState(initialSection);
  return [
    section,
    {
      goToRandomize: goToGenerator(Section.Randomize, setSection),
      goToEdit: goToGenerator(Section.Edit, setSection),
      goToList: goToGenerator(Section.List, setSection),
      goToSettings: goToGenerator(Section.Settings, setSection)
    }
  ];
}