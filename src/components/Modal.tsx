import React, {FC} from 'react';
import {Header, Modal as SemanticModal} from "semantic-ui-react";

export interface ModalProps {
  title?: string
  cta: JSX.Element
}

export const Modal: FC<ModalProps> = ({children, title, cta}) => (
  <SemanticModal trigger={cta} basic size='small'>
    {!!title && <Header content={title}/>}
    <SemanticModal.Content>
      {children}
    </SemanticModal.Content>
  </SemanticModal>
);
