import React, { Component } from "react";
import { Container, Header } from "semantic-ui-react";
import Layout from "../components/template/Layout";
import VolunteerRequestStatusTable from "../components/volunteer/VolunteerRequestStatusTable";

class VolunteerRequestStatusPage extends Component {
    render() {
        return (
            <Layout>
                <Header as='h1'>Volunteering Requests Status</Header>
                <br/>
                <VolunteerRequestStatusTable />
            </Layout>
        );
    }
}

export default VolunteerRequestStatusPage;
