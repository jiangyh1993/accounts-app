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

  addRecord(record) {
    this.setState({
      error: null,
      isLoad: true,
      records: [...this.state.records, record]
    });
  }

  updateRecord(record, data) {
    const recordIndex = this.state.records.indexOf(record);
    const newRecords = this.state.records.map((item, index) => {
      if (index !== recordIndex) {
        return item;
      }
      return {
        ...item,
        ...data
      };
    });
    this.setState({
      records: newRecords
    });
  }

  deleteRecord(record) {
    const recordIndex = this.state.records.indexOf(record);
    const newRecords = this.state.records.filter(
      (item, index) => index !== recordIndex
    );
    this.setState({
      records: newRecords
    });
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {records.map(record => (
              <Record
                key={record.id}
                record={record}
                handleEditRecord={this.updateRecord.bind(this)}
                handleDeleteRecord={this.deleteRecord.bind(this)}
              />
            ))}
          </tbody>
        </table>
      );
    }
    return (
      <div>
        <h2>Records</h2>
        <RecordForm handleNewRecord={this.addRecord.bind(this)} />
        {recordsCompontent}
      </div>
    );
  }
}

export default Records;
