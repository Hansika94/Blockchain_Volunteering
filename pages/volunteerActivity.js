import React, { Component } from "react";
import { Container, Header } from "semantic-ui-react";
import Layout from "../components/template/Layout";
import ActivityForm from "../components/organisation/ActivityForm";
import { Link, Router } from "../routes";

class VolunteerActivityPage extends Component {
    render() {
        return (
            <Layout>
                <Header as='h1'>Add a Volunteering Activity</Header>
                <br/>
                <ActivityForm />
            </Layout>
        );
    }
}

export default VolunteerActivityPage;