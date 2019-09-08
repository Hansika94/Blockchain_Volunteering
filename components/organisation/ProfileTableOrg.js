import React, { Component } from "react";
import * as firebase from "firebase";
import { Table, Icon } from "semantic-ui-react";

class ProfileTableOrg extends Component {
  state = {
    username: '',
    orgName: '',
    ownerFirstName: '',
    ownerLastName: '',
    orgAddress: '',
    city: '',
    country: '',
    zipcode: '',
    phone: '',
    email: '',
    ethereum: '',
    approved: true
  };

  async componentDidMount() {
    var self = this;
    // Check when the org logs in.
    firebase.auth().onAuthStateChanged(function(org) {
      if (org) {
        // Getting org info from the db
        const ref = firebase.database().ref("organisations/" + org.uid);
        ref.once("value").then(function(snapshot) {
          const username = snapshot.child("username").val();
          const orgName = snapshot.child("orgName").val();
          const ownerFirstName = snapshot.child("ownerFirstName").val();
          const ownerLastName = snapshot.child("ownerLastName").val();
          const orgAddress = snapshot.child("orgAddress").val();
          const city = snapshot.child("city").val();
          const country = snapshot.child("country").val();
          const zipcode = snapshot.child("zipcode").val();
          const phone = snapshot.child("phone").val();
          const email = snapshot.child("email").val();
          const ethereum = snapshot.child("ethereum").val();
          const approved = snapshot.child("approved").val();
          // Saving in state vars the fetched data
          self.setState({
            username,
            orgName,
            ownerFirstName,
            ownerLastName,
            orgAddress,
            city,
            country,
            zipcode,
            phone,
            email,
            ethereum,
            approved
          });
        });
      }
    });
  }

  render() {
    return (
      <Table celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan="3">org Profile Recap</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Username</Table.Cell>
            <Table.Cell>{this.state.username}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell collapsing>Organisation Name</Table.Cell>
            <Table.Cell>{this.state.orgName}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Owner First Name</Table.Cell>
            <Table.Cell>{this.state.ownerFirstName}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Owner Last Name</Table.Cell>
            <Table.Cell>{this.state.ownerLastName}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Organisation Address</Table.Cell>
            <Table.Cell>{this.state.orgAddress}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>City</Table.Cell>
            <Table.Cell>{this.state.city}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Country</Table.Cell>
            <Table.Cell>{this.state.country}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Zipcode</Table.Cell>
            <Table.Cell>{this.state.zipcode}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Phone</Table.Cell>
            <Table.Cell>{this.state.phone}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Email</Table.Cell>
            <Table.Cell>{this.state.email}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Ethereum Account</Table.Cell>
            <Table.Cell>{this.state.ethereum}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Approved</Table.Cell>
            <Table.Cell>{this.state.approved.toString()}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }
}

export default ProfileTableOrg;