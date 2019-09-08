import React, { Component } from "react";
import { Container, Header } from "semantic-ui-react";
import Layout from "../components/template/Layout";
import OrgApprovalReqTable from "../components/organisation/OrgApprovalReqTable";
import { Link, Router } from "../routes";

class OrgApprovalReqPage extends Component {
    render() {
        return (
            <Layout>
                <Header as="h1">Approval Requests</Header>
                <br/>
                <p>
                    Hello, here you can check for the volunteering activities that have been requested by the volunteers.
                </p>
                <br />
                <OrgApprovalReqTable />
            </Layout>
        );
    }
}

export default OrgApprovalReqPage;