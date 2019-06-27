import React, {Component, FormEventHandler} from "react";
import {Asset, Holder} from "../../types";
import {Form} from "semantic-ui-react";
import {onChangeFormFieldHandler, toOptions} from "../../utils";
import {TransferPayload} from "../../store";
import {FormButton} from "../FormButton";

export interface AssetFormProps {
  asset?: Asset,
  holders: Record<string, Holder>,
  onSubmit: (x: Asset | TransferPayload) => void
}

const initialState = {
  name: '',
  notes: '',
  blocked: false,
  serial: '',
  assignedTo: false
};

export class AssetForm extends Component<AssetFormProps, Asset> {
  editMode = this.props.asset !== undefined;
  state = this.editMode
    ? this.props.asset as Asset
    : initialState as Asset;


  options = toOptions(this.props.holders);

  onChangeHandler = onChangeFormFieldHandler(
    this.state,
    (x: Holder) => {
      this.setState(x)
    }
  );

  onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const from = this.editMode
      ? this.props.asset!.assignedTo
      : null;

    if (from === this.state.assignedTo) {
      this.props.onSubmit(this.state);
    } else {
      this.props.onSubmit({
          ...this.state,
          from,
          to: this.state.assignedTo
        } as TransferPayload
      );
    }

    if (!this.editMode) {
      this.setState(initialState)
    }
  };

  render() {

    return (
      <>
        <Form onSubmit={this.onSubmit}>
          <Form.Input
            name="name"
            value={this.state.name}
            required
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
          <Form.Input
            name="serial"
            required
            value={this.state.serial}
            onChange={this.onChangeHandler}
            placeholder='LHG1L451G6L1GL41'
            label='Serial Number'
          />
          <Form.Select
            fluid
            name="assignedTo"
            label='Holder'
            options={this.options}
            placeholder='Holder'
            search
            onChange={this.onChangeHandler}
            value={this.state.assignedTo}
          />
          <FormButton editMode={this.editMode}/>
        </Form>
      </>
    )
  }
}
