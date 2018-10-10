import React, { Component } from "react";
import * as RecordsAPI from "../utils/RecordsAPI";

class RecordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      title: "",
      amount: ""
    };
  }

  valid() {
    return this.state.date && this.state.title && this.state.amount;
  }

  handleChange(event) {
    let name, obj;
    name = event.target.name;
    this.setState(((obj = {}), (obj["" + name] = event.target.value), obj));
  }

  handleSubmit(event) {
    event.preventDefault();
    RecordsAPI.create(this.state)
      .then(response => console.log(response))
      .fail(error => console.log("error", error));
  }

  render() {
    return (
      <form className="form-inline" onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group mr-1">
          <input
            type="text"
            className="form-control"
            placeholder="Date"
            name="date"
            value={this.state.date}
            onChange={this.handleChange.bind(this)}
          />
        </div>
        <div className="form-group mr-1">
          <input
            type="text"
            className="form-control"
            placeholder="Title"
            name="title"
            value={this.state.title}
            onChange={this.handleChange.bind(this)}
          />
        </div>
        <div className="form-group mr-1">
          <input
            type="text"
            className="form-control"
            placeholder="Amount"
            name="amount"
            value={this.state.amount}
            onChange={this.handleChange.bind(this)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!this.valid()}
        >
          Create Record
        </button>
      </form>
    );
  }
}

export default RecordForm;
