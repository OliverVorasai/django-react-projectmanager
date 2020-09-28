import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
    }
  }

  handleChange = e => {
    let { name, value } = e.target;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }
    const activeItem = { ...this.state.activeItem, [name]: value};
    this.setState({ activeItem });
  };

  render() {
    const { toggle, onSave } = this.props;
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Project Item</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="text"
                name="title"
                value={this.state.activeItem.title}
                onChange={this.handleChange}
                placeholder="Enter Project Title"
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input 
                type="text"
                name="description"
                value={this.state.activeItem.description}
                onChange={this.handleChange}
                placeholder="Enter Project description"
              />
            </FormGroup>
            <FormGroup>
              <Label for="start">Start Date</Label>
              <Input
                type="date"
                name="start"
                value={this.state.activeItem.start}
                onChange={this.handleChange}
                placeholder="date placeholder"
              />
            </FormGroup>
            <FormGroup>
              <Label for="deadline">Deadline Date</Label>
              <Input
                type="date"
                name="deadline"
                value={this.state.activeItem.deadline}
                onChange={this.handleChange}
                placeholder="date placeholder"
              />
            </FormGroup>
            <FormGroup>
              <Label for="owner">Project Owner</Label>
                <Input
                  type="email"
                  name="owner"
                  value={this.state.activeItem.owner}
                  onChange={this.handleChange}
                  placeholder="Enter project owner email"
                />
            </FormGroup>
            <FormGroup check>
              <Label for="completed">
                <Input
                  type="checkbox"
                  name="completed"
                  checked={this.state.activeItem.completed}
                  onChange={this.handleChange}
                />
                Completed
              </Label>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => onSave(this.state.activeItem)}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}