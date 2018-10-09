import React, { Component } from "react";
import Record from "./Record";
import { getJSON } from "jquery";

class Records extends Component {
  constructor() {
    super();
    this.state = {
      records: [],
      error: null,
      isLoad: false
    };
  }

  componentDidMount() {
    getJSON("https://5bbc479929214000136cbfaf.mockapi.io/api/v1/records").then(
      response =>
        this.setState({
          records: response,
          isLoad: true
        }),
      error =>
        this.setState({
          isLoad: true,
          error: error
        })
    );
  }

  render() {
    const { error, isLoad, records } = this.state;

    if (error) {
      return <div>Error: {error.responseText}</div>;
    } else if (!isLoad) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <h2>Records</h2>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Date</th>
                <th>Title</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {records.map(record => (
                <Record key={record.id} {...record} />
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

export default Records;
