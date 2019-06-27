import {Section, SectionHandlers} from "../utils";
import React, {FC} from "react";
import {Menu as MenuSemantic, Icon} from "semantic-ui-react";

export interface MenuProps {
  section: Section,
  handlers: SectionHandlers
}

export const Menu: FC<MenuProps> = ({section, handlers}) => (
  <MenuSemantic icon='labeled' stackable>
    <MenuSemantic.Item
      name='warehouse'
      active={section === Section.Assets}
      onClick={handlers.goToAssets}
    >
      <Icon name='warehouse'/>
      Assets
    </MenuSemantic.Item>

    <MenuSemantic.Item
      name='user'
      active={section === Section.Holders}
      onClick={handlers.goToHolders}
    >
      <Icon name='user'/>
      Holders
    </MenuSemantic.Item>

    <MenuSemantic.Item
      name='history'
      active={section === Section.TransferRecords}
      onClick={handlers.gotoTransferRecords}
    >
      <Icon name='history'/>
      History
    </MenuSemantic.Item>
  </MenuSemantic>
);
