import React, { Component } from "react";
import { Container, Header } from "semantic-ui-react";
import Layout from "../components/template/Layout";
import VolunteerOptionsTable from "../components/volunteer/VolunteerOptionsTable";
import { Link, Router } from "../routes";

class VolunteerOptionsPage extends Component {
    render() {
        return (
            <Layout>
                <Header as='h1'>Volunteering Options</Header>
                <br/>
                <VolunteerOptionsTable />
            </Layout>
        );
    }
}

export default VolunteerOptionsPage;