import React, {FC} from "react";
import {Button} from "semantic-ui-react";

export interface FormButton {
  editMode?: boolean
}

export const FormButton: FC<FormButton> = ({editMode}) =>
  <Button
    color={editMode ? "blue" :"green"}
    type='submit'>
    {editMode ? 'Save' : 'Create'}
  </Button>;
