import React, { Component } from "react";
import Record from "./Record";
import RecordForm from "./RecordForm";
import * as RecordsAPI from "../utils/RecordsAPI";

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
    RecordsAPI.getAll().then(
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
    let recordsCompontent;

    if (error) {
      recordsCompontent = <div>Error: {error.responseText}</div>;
    } else if (!isLoad) {
      recordsCompontent = <div>Loading...</div>;
    } else {
      recordsCompontent = (
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
      );
    }
    return (
      <div>
        <h2>Records</h2>
        <RecordForm />
        {recordsCompontent}
      </div>
    );
  }
}

export default Records;
