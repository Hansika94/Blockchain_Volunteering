import React, { Component } from 'react';
import { Button, Form, Input, Message, Header } from 'semantic-ui-react';
import Layout from "../components/template/Layout";
import TransferTokensForm from '../components/TransferTokensForm';

class BlockchainPayementIndex extends Component {
    static async getInitialProps(props) {
        return {
            address: props.query.address
        };
    }
    render() {
        return(
            <Layout>
                <Header as='h1'>Transfer Tokens</Header>
                <br/>
                <TransferTokensForm />
                <br/>
                <br/>
                <p>You can transfer your tokens to others.</p>
                <p>Insert the amount of token units you want to send.</p>
                <p>Insert the Ethereum address of who you want to send your tokens.</p>
                <br />
            </Layout>

        );
    }
}

export default BlockchainPayementIndex;
