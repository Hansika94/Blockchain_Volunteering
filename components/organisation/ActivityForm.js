import React, { Component } from "react";
import { Form, Input, Button, Message, Select, Checkbox } from "semantic-ui-react";
import { Router } from "../../routes";
import * as firebase from "firebase";
import { countryOptions, options } from "../../others/common";

class ActivityForm extends Component {
  state = {
    title: '',
    desc: '',
    date: '',
    starttime: '',
    duration: '',
    address: '',
    city: '',
    country: '',
    zipCode: ''
  };

  // Functions for handling changes in dropdown fields
  handleChangeCountry = (e, { value }) => this.setState({ country: value });

  // Form validation
  validate = () => {
    let isError = false;
    let re = /^(\d{1,2}):(\d{2})([ap]m)?$/;
    let regs = '';

    if (this.state.zipCode.length != 5 || this.state.zipCode.match('e')) {
      isError = true;
      this.setState({ errorMessage: "Zip code must be 5 number long." });
    }

    if (this.state.starttime.value != ''){
      if(regs = this.state.starttime.match(re)) {
        if(regs[3]) {
          // 12-hour value between 1 and 12
          if(regs[1] < 1 || regs[1] > 12) {
            alert("Invalid value for hours in 12 hours format: " + regs[1]);
            isError = true;
          }
        } else {
          // 24-hour value between 0 and 23
          if(regs[1] > 23) {
            alert("Invalid value for hours: " + regs[1]);
            isError = true;
          }
        }
        // minute value between 0 and 59
        if(regs[2] > 59) {
          alert("Invalid value for minutes: " + regs[2]);
          isError = true;
        }
      } else {
        alert("Invalid time format: " + this.state.starttime);
        isError = true;
      }
    }

    return isError;
  };

  // Submit the activity request
  onSubmit = async event => {
    event.preventDefault();
    console.log("object");
    var self = this;
    var org = firebase.auth().currentUser;
    // Perform the form validation
    const err = this.validate();
    console.log("after validate");
    if (!err) {
      console.log("check error passed");

      var ref = firebase.app().database().ref("organisations").child(org.uid);
      ref.once("value").then(function(snapshot) {
        const oname = snapshot.child("orgName").val();
        // Create a new activity and save it in the database
        firebase.app().database().ref("volunteering_activity/")
        .push({
          title: self.state.title,
          description: self.state.desc,
          date: self.state.date,
          start_time: self.state.starttime,
          duration: self.state.duration,
          address: self.state.address,
          city: self.state.city,
          country: self.state.country,
          zipcode: self.state.zipCode,
          status: 'New',
          organisation_id: org.uid,
          organisation_name: oname
        })
        .then(() => {
          alert("Activity added!");
          window.location.replace("http://localhost:3000/volunteerActivity");
        });
      });
    }
  };

  render() {

    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            label="Title"
            placeholder="Add a title"
            onChange={event => this.setState({ title: event.target.value })}
            value={this.state.title}
            required
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            label="Description"
            placeholder="Add a description"
            onChange={event => this.setState({ desc: event.target.value })}
            value={this.state.desc}
            required
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            label="Date"
            placeholder="Date"
            type="date"
            onChange={event => this.setState({ date: event.target.value })}
            value={this.state.date}
            required
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            label="Start Time"
            placeholder= "e.g. 07:30 or 7:30am"
            onChange={event => this.setState({ starttime: event.target.value })}
            value={this.state.starttime}
            required
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            label="Duration"
            placeholder="Duration in hours"
            onChange={event => this.setState({ duration: event.target.value })}
            value={this.state.duration}
            required
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            label="Address"
            placeholder="Address"
            onChange={event => this.setState({ address: event.target.value })}
            value={this.state.address}
            required
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            label="City"
            placeholder="City"
            onChange={event => this.setState({ city: event.target.value })}
            value={this.state.city}
            required
          />
          <Form.Field
            control={Select}
            label="Country"
            options={countryOptions}
            placeholder="Country"
            onChange={this.handleChangeCountry}
            value={this.state.country}
            required
          />
          <Form.Field
            control={Input}
            label="Zip Code"
            placeholder="Zip Code"
            type="number"
            onChange={event => this.setState({ zipCode: event.target.value })}
            value={this.state.zipCode}
            required
          />
        </Form.Group>
        <Form.Field
          control={Checkbox}
          label="I agree to the Terms and Conditions"
        />
        <Message error header="Oops!" content={this.state.errorMessage} />
        <Form.Field control={Button}>Submit</Form.Field>
      </Form>
    );
  }
}

export default ActivityForm;
