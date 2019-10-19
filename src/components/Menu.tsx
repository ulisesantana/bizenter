import {Section, SectionHandlers} from "../utils";
import React, {FC} from "react";
import {Icon, Menu as MenuSemantic} from "semantic-ui-react";
import {AuthService} from "../services";

export interface MenuProps {
  section: Section,
  handlers: SectionHandlers
}

const isActiveGenerator = (s: Section) => (a: Section) => a === s;

export const Menu: FC<MenuProps> = ({section, handlers}) => {
  const isActive = isActiveGenerator(section);
  const iconIsActive = (s: Section) => isActive(s) ? 'red': undefined;

  return (
    <MenuSemantic inverted icon='labeled' stackable>
      <MenuSemantic.Item
        name='warehouse'
        active={isActive(Section.Assets)}
        onClick={handlers.goToAssets}
      >
        <Icon color={ iconIsActive(Section.Assets)} name='warehouse'/>
        Assets
      </MenuSemantic.Item>

      <MenuSemantic.Item
        name='user'
        active={isActive(Section.Holders)}
        onClick={handlers.goToHolders}
      >
        <Icon color={ iconIsActive(Section.Holders)} name='user'/>
        Holders
      </MenuSemantic.Item>

      <MenuSemantic.Item
        name='history'
        active={isActive(Section.TransferRecords)}
        onClick={handlers.gotoTransferRecords}
      >
        <Icon color={ iconIsActive(Section.TransferRecords)} name='history'/>
        History
      </MenuSemantic.Item>

      <MenuSemantic.Item
        name='sign-out'
        onClick={AuthService.logOut}
      >
        <Icon name='sign-out'/>
        Logout
      </MenuSemantic.Item>
    </MenuSemantic>
  )
};
