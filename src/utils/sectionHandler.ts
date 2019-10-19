import {useState} from 'react';

export enum Section {
  TransferRecords = 'TRANSFER_RECORDS',
  Holders = 'HOLDERS',
  Assets = 'ASSETS'
}

function goToGenerator(section: Section, setSection: Function): () => void {
  return () => setSection(section)
}

export interface SectionHandlers {
  gotoTransferRecords: () => void,
  goToHolders: () => void,
  goToAssets: () => void
}

export function useSectionManager(initialSection = Section.Assets): [Section, SectionHandlers]{
  const [section, setSection] = useState(initialSection);
  return [
    section,
    {
      gotoTransferRecords: goToGenerator(Section.TransferRecords, setSection),
      goToHolders: goToGenerator(Section.Holders, setSection),
      goToAssets: goToGenerator(Section.Assets, setSection)
    }
  ];
}
