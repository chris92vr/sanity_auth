import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { client } from '../client';

export class CurrentDate extends Component {
  state = {
    date: '',
    dateToSalary: '',
    show: false,
    handleClose: false,
    daySalaary: '',
    dateToSalaryInDays: '',
  };

  componentDidMount() {
    this.getDate();
    this.getDateToSalary();
  }

  getDate = () => {
    var today = new Date(),
      date =
        today.getDate() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getFullYear();

    this.setState({ date });
  };

  getDateToSalary = () => {
    var today = new Date();
    client
      .fetch(
        '*[_type == "user" && _id == ' + localStorage.getItem('userid') + ']'
      )
      .then((data) => {
        console.log('darfasfrta: ', data);
        var dateSal = data[0].dayOfSalary;
        console.log('darfasfrtasAS: ', data[0].dayOfSalary);

        var daysalary = dateSal;
        var dateToSalaryInDays,
          dateToSalary = today.getDate() - daysalary;

        dateToSalaryInDays = dateToSalary * -1;
        if (dateToSalaryInDays < 0) {
          dateToSalaryInDays = dateToSalaryInDays * -1;
        } else {
          dateToSalaryInDays = dateToSalaryInDays * 1;
        }
        this.setState({ dateToSalaryInDays });
        if (this.daySalaary !== undefined) {
          client
            .patch(localStorage.getItem('userid').split('"')[1])
            .set({
              dayOfSalary: parseFloat(this.daySalaary),
            })
            .commit()
            .catch((err) => console.log(err));
        } else {
          console.log('day salary', this.daySalaary);
        }
        console.log('date to salary 2341', dateSal);
      });
  };

  render() {
    return (
      <>
        <div className="CurrentDate text-dark border border-dark rounded p-2 m-2">
          <p>Today is {this.state.date} </p>
        </div>
        <div className="m-2 CurrentDate text-dark border border-info rounded p-2 ">
          <p> {this.state.dateToSalaryInDays} Days to the next Salary</p>
        </div>
        <Button
          variant="warning"
          className="Button m-2"
          onClick={() => {
            this.setState({ handleClose: true });
          }}
        >
          Edit Date Salary
          <Modal
            {...this.props}
            show={this.state.handleClose}
            onHide={this.show}
            centered
            size="lg"
            aria-labelledby="example-modal-sizes-title-lg"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
                Edit Date Salary
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">
                  Enter the number of day of the salary:
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Number of day of the salary"
                  onChange={(e) => {
                    this.daySalaary = e.target.value;
                  }}
                />
              </div>
            </Modal.Body>{' '}
            <Modal.Footer>
              <Button
                className="Button"
                variant="primary"
                onClick={() => {
                  this.getDateToSalary();
                  console.log('day salary', this.daySalaary);
                  console.log('show', this.state.show);
                  window.alert('Date Salary Updated!');

                  window.location.reload(false);
                }}
              >
                Save Changes
              </Button>

              <Button
                className="Button"
                variant="secondary"
                onClick={() => {
                  this.setState({ show: false });
                  this.setState({ handleClose: false });
                  window.location.reload(false);
                }}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Button>
      </>
    );
  }
}

export default CurrentDate;
