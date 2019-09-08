import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import Layout from '../../components/template/Layout';
import AdminApproveOrg from '../../components/admin/AdminApproveOrg';


class ApproveOrgPage extends Component {

    render () {
        return(
            <Layout>
                <Header as='h1'>Approve Organisation page</Header>
                <br/>
                <p>Hello admin, here you can approve the organisation request to become official.</p>
                <AdminApproveOrg/>
            </Layout>
        );
    }
}

export default ApproveOrgPage;
