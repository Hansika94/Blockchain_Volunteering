import React, { Component } from 'react';
import { Button, Form, Input, Message, Header } from 'semantic-ui-react';
import Layout from '../components/template/Layout';
import { Link, Router } from '../routes';


class BlockchainPayementIndex extends Component {
    static async getInitialProps(props) {
        return {
            address: props.query.address
        };
    }

    render() {
        return(
            <Layout>
                <Header as='h1'>Home</Header>
                <br />
                <p>Welcome to the Volunteer for Older Generation(VOGen Coin) main page.</p>
                <p>VOGen Coin(VOGen) is an Ethereum token developed following the standard ERC20,
                    it lives in the Ethereum ecosystem and its movements are recorded in the Ethereum blockchain.</p>
                <p>The volunteers can collect VOGen Coin by participating in volunteering activities.</p>
                <p>These coins earned and recorded on blockchain can then be used to buy services for self when needed.</p>
                <p>Also, the user can trasfer these tokens to others in the "transfer" section.</p>
                <p>The informations about this token management are completely open and transparent.</p>
                <p>The user can see some info in the "statistics" section.</p>
                <p>The user can check the complete set of information about this token in Etherscan.</p>
                <p>The user can check also the full contract code in Etherscan searching the contract address.</p>
                <br />
                <p><b>Remember!</b> You need MetaMask Chrome extention installed to perform operation on this website.</p>
                <p><b>Remember!</b> Operations with VOGen token can only be done thorugh the main contract.</p>
                <br />
            </Layout>
        );
    }
}

export default BlockchainPayementIndex;