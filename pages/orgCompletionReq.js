import React, { Component } from "react";
import { Container, Header } from "semantic-ui-react";
import Layout from "../components/template/Layout";
import OrgCompletionReqTable from "../components/organisation/OrgCompletionReqTable";
import { Link, Router } from "../routes";

class OrgCompletionReqPage extends Component {
    render() {
        return (
            <Layout>
                <Header as="h1">Completion Requests</Header>
                <br/>
                <p>
                    Hello, here you can check for the volunteering activities that have been completed by the volunteers.
                </p>
                <br />
                <OrgCompletionReqTable />
            </Layout>
        );
    }
}

export default OrgCompletionReqPage;