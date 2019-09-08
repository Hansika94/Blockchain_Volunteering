import React, { Component } from "react";
import { Form, Input, Button, Message, Select, Checkbox } from "semantic-ui-react";
import { Router } from "../../routes";
import * as firebase from "firebase";
import { countryOptions, options } from "../../others/common";

class OrgRegistrationForm extends Component {
  state = {
    orgName: "",
    ownerFirstName: "",
    ownerLastName: "",
    phone: "",
    email: "",
    orgAddress: "",
    city: "",
    country: "",
    zipCode: "",
    username: "",
    password: "",
    confirmPassword: "",
    ethereum: "",
    errorMessage: "",
    approved: false,
  };

  // Functions for handling changes in dropdown fields
  handleChangeCountry = (e, { value }) => this.setState({ country: value });

  // Form validation
  validate = () => {
    let isError = false;
    if (this.state.username.length < 5) {
      isError = true;
      this.setState({ errorMessage: "Username is too short." });
    }
    else if (this.state.zipCode.length != 5 || this.state.zipCode.match('e')) {
      isError = true;
      this.setState({ errorMessage: "Zip code must be 5 number long." });
    }
    else if (this.state.password != this.state.confirmPassword) {
      isError = true;
      this.setState({ errorMessage: "Password is different from Confirm Password." });
    }
    else if(!/^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[A-Za-z]+$/i.test(this.state.email)) {
      isError = true;
      this.setState({ errorMessage: "Remove special characters from Email field."})
    }
    else if(this.state.password.length < 6) {
      isError = true;
      this.setState({ errorMessage: "Password length must be greater that 6."})
    }
    else if(!/^(0x)?[0-9a-fA-F]{40}$/i.test(this.state.ethereum)) {
      isError = true;
      this.setState({ errorMessage: "Ethereum address inserted is not hexadecimal or 40 byte long. Letters must be all small caps or all all caps."})
    }
    return isError;
  };

  // Submit the org request
  onSubmit = async event => {
    event.preventDefault();
    var self = this;
    // Perform the form validation
    const err = this.validate();
    if (!err) {
      // Create a new org with username and password and log in instantly
      console.log("Create a new ORG with email and password");
      firebase.auth().createUserWithEmailAndPassword(self.state.email, self.state.password)
        .then(response => console.log("response in then: ", response))
        .catch(e => console.log("ORG Creaton failed:", e.message)) //TODO
        .finally(() => {
          var org = firebase.auth().currentUser;
          console.log("ORG: ",org);
          // Send email verification to the org after registering him with emailVerified = false.
          org.sendEmailVerification()
            .then(function() {
              firebase.app().database().ref("organisations/" + org.uid)
                .set({
                  orgName: self.state.orgName,
                  ownerFirstName: self.state.ownerFirstName,
                  ownerLastName: self.state.ownerLastName,
                  phone: self.state.phone,
                  email: self.state.email,
                  orgAddress: self.state.orgAddress,
                  city: self.state.city,
                  country: self.state.country,
                  zipcode: self.state.zipCode,
                  ethereum: self.state.ethereum,
                  username: self.state.username,
                  approved: false,
                })
                .then(() => {
                  alert("Email Verification for organisation Sent!");
                  // Redirect to home
                  window.location.replace("http://localhost:3000/index");
                })
                .catch(error => {
                  self.setState({ errorMessage: error.message });
                });
            })
            .catch(function(error) {
              alert("Error in sending email verification");
              self.setState({ errorMessage: error.message });
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
            label="Organisation name"
            placeholder="Organisation name"
            onChange={event => this.setState({ orgName: event.target.value })}
            value={this.state.orgName}
            required
          />
        </Form.Group>

        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            label="Owner First Name"
            placeholder="Owner first name"
            onChange={event => this.setState({ ownerFirstName: event.target.value })}
            value={this.state.ownerFirstName}
            required
          />
        </Form.Group>

        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            label="Owner Last Name"
            placeholder="Owner last name"
            onChange={event => this.setState({ ownerLastName: event.target.value })}
            value={this.state.ownerLastName}
            required
          />
        </Form.Group>

        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            label="Phone"
            placeholder="Phone"
            type="number"
            onChange={event => this.setState({ phone: event.target.value })}
            value={this.state.phone}
            required
          />
          </Form.Group>
  
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            label="Email"
            placeholder="Email"
            onChange={event => this.setState({ email: event.target.value })}
            value={this.state.email}
            required
          />
        </Form.Group>

        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            label="Organisation address"
            placeholder="Organisation address"
            onChange={event => this.setState({ orgAddress: event.target.value })}
            value={this.state.orgAddress}
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

        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            label="Username"
            placeholder="Username"
            onChange={event => this.setState({ username: event.target.value })}
            value={this.state.username}
            required
          />
        </Form.Group>
  
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            label="Password"
            placeholder="Password"
            onChange={event => this.setState({ password: event.target.value })}
            value={this.state.password}
            type="password"
            required
          />
        </Form.Group>
  
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            label="Confirm Password"
            placeholder="Confirm Password"
            onChange={event => this.setState({ confirmPassword: event.target.value })}
            value={this.state.confirmPassword}
            type="password"
            required
          />
        </Form.Group>

        <Form.Field
          control={Input}
          label="Ethereum Account"
          placeholder="Ethereum Account"
          onChange={event => this.setState({ ethereum: event.target.value })}
          value={this.state.ethereum}
          required
        />
        
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

export default OrgRegistrationForm;