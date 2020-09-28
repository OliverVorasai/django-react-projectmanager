import React, { Component, useState } from 'react';
import Modal from "./components/Modal";
import axios from "axios";
import {
  Button,
  Collapse,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  CardFooter,
} from "reactstrap";

const ProjectDetails = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const { title, description, start, deadline, owner } = props.item;
  return (
    <div>
      <Button color="primary" onClick={toggle} style={{ marginTop: '1rem', marginBottom: '1rem' }}>Show Details</Button>
      <Collapse isOpen={isOpen}>
        <Card>
          <CardBody>
            <CardTitle>{title}</CardTitle>
            <CardSubtitle>{description}</CardSubtitle>
            <CardText>
              Start Date: {start}
              <br />
              Deadline: {deadline}
            </CardText>
            <CardFooter>

              Project Owner: {owner}
            </CardFooter>
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      viewCompleted: false,
      activeItem: {
        title: "",
        description: "",
        start: "",
        deadline: "",
        owner: "",
        completed: false
      },
      projectList: [],
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("http://localhost:8000/api/projects/")
      .then(res => this.setState({ projectList: res.data }))
      .catch(err => console.log(err));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = item => {
    this.toggle();
    if (item.id) {
      // Editing a project
      axios
        .put(`http://localhost:8000/api/projects/${item.id}/`, item)
        .then(res => this.refreshList());
      return;
    }
    // Adding a new project
    axios
      .post("http://localhost:8000/api/projects/", item)
      .then(res => this.refreshList());
  };

  handleDelete = item => {
    axios
      .delete(`http://localhost:8000/api/projects/${item.id}`)
      .then(res => this.refreshList());
  };

  createItem = () => {
    const item = { title: "", description: "", start: "", deadline: "", owner: "", completed: false };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  displayCompleted = status => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }
    return this.setState({ viewCompleted: false });
  };

  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "active" : ""}
        >
          Complete
        </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "" : "active"}
        >
          Incomplete
        </span>
      </div>
    );
  };

  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.projectList.filter(
      item => item.completed === viewCompleted
    );
    return newItems.map(item => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`project-title mr-2 ${this.state.viewCompleted ? "completed-project" : ""
            }`}
          title={item.description}
        >
          {item.title}
          <ProjectDetails
            item={item}
          />
        </span>
        <span>
          <button onClick={() => this.editItem(item)} className="btn btn-info mr-2">Edit</button>
          <button onClick={() => this.handleDelete(item)} className="btn btn-danger">Delete </button>
        </span>
      </li>
    ));
  };

  render() {
    return (
      <main className="content">
        <h1 className="text-black text-uppercase text-center my-4">Project Manager App</h1>
        <div className="row">
          <div className="col-md-11 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="">
                <button onClick={this.createItem} className="btn btn-primary">Add Project</button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}

export default App;
