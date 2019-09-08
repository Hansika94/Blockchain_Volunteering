import React, { Component } from "react";
import Layout from "../../components/template/Layout";
import ProfileTable from "../../components/organisation/ProfileTableOrg";

class ProfileOrgPage extends Component {
  state = {};

  render() {
    return (
      <Layout>
        <h1>Organisation's Profile</h1>
        <br />
        <p>Welcome to your organisation Profile Page.</p>
        <p>Here is the informations about the organisation in our database.</p>
        <ProfileTable />
      </Layout>
    );
  }
}

export default ProfileOrgPage;
