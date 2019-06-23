import React, {Component, FormEventHandler} from "react";
import {Holder} from "../../types";
import {Button, Form} from "semantic-ui-react";
import {onChangeFormFieldHandler} from "../../utils";

export interface HolderFormProps {
  holder?: Holder,
  onSubmit: (h: Holder) => void
}

const initialState = {
  name: '',
  notes: '',
  blocked: false
};

export class HolderForm extends Component<HolderFormProps, Holder> {
  static defaultProps = {
    holder: initialState
  };

  state = this.props.holder as Holder;

  onChangeHandler = onChangeFormFieldHandler(
    this.state,
    (x: Holder) => {
      this.setState(x)
    }
  );

  onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    if (!!this.props.holder && !this.props.holder.name) {
      this.setState(initialState);
    }
  };

  render() {

    return (
        <Form onSubmit={this.onSubmit}>
          <Form.Input
            name="name"
            value={this.state.name}
            onChange={this.onChangeHandler}
            placeholder='Full Name'
            label='Full Name'
          />
          <Form.TextArea
            name="notes"
            value={this.state.notes}
            onChange={this.onChangeHandler}
            placeholder='Observations'
            label='Notes'
          />
          <Form.Checkbox
            name="blocked"
            checked={this.state.blocked}
            onChange={this.onChangeHandler}
            label='Blocked'
          />
          <Button type='submit'>Create</Button>
        </Form>
    )
  }
}
