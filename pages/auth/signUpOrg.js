import React, { Component } from 'react';
import { } from "semantic-ui-react";
import Layout from "../../components/template/Layout";
import OrgRegistrationForm from "../../components/organisation/OrgRegistrationForm";

class SignUpOrgPage extends Component {
  render() {
    return(
      <Layout>
        <h1>Welcome to the Organisation Registration Page.</h1>
        <br />
        <p>Here you can register your organisation to be added to the list.</p>
        <p>REMEMBER: After completing the form your must wait for the request to be examinated and approved!</p>
        <br />
        <OrgRegistrationForm/>
      </Layout>
    );
  }
}

export default SignUpOrgPage;