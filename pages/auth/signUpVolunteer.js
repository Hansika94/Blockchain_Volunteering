import React, { Component } from 'react';
import { } from "semantic-ui-react";
import Layout from "../../components/template/Layout";
import VolunteerRegistrationForm from "../../components/volunteer/VolunteerRegistrationForm";

class SignUpVolunteerPage extends Component {
  render() {
    return(
      <Layout>
        <h1>Sign Up for Volunteer</h1>
        <br />
        <p>Welcome to the Volunteer Registration Page</p>
        <br />
        <VolunteerRegistrationForm/>
      </Layout>
    );
  }
}

export default SignUpVolunteerPage;