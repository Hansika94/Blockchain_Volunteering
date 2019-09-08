import React, { Component } from 'react'
import { Message, Form, Button, Input } from 'semantic-ui-react'
import Web3 from 'web3';
console.log("dirname: ", __dirname);
const rewardPoints = require('../ethereum/vogen')
console.log("after deploy")

class TransferTokenForm extends Component {
    state = {
        value: '',
        receiver: '',
        errMsg: '',
        okMsg: '',
        loading: false
    };

   async componentDidMount(){
    window.addEventListener('load', async() => {
        if(window.web3){
            window.web3 =  new Web3(web3.currentProvider);
            console.log("web3 Injected")
        }
        else{
            console.log('Non-Ethereum browser detected. Try MetaMask!');
        }
    });
   }

    onSubmit = async event => {
        event.preventDefault();
        const { value, receiver } = this.state;
        this.setState({ loading: true, errMsg: false, okMsg: false });
        try{
            var accounts = await web3.eth.getAccounts();
            //alert(accounts[0]);
            await rewardPoints.methods.transfer(receiver,value)
            .send({
                from: accounts[0],
                gas: '4500000'
            });
            this.setState({ loading: false, okMsg: true, value: '' });
        } catch (error) {
            var trimmedString = error.message.substring(0, 90);
            this.setState({ loading: false, errMsg: trimmedString, value: '' });
        }
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errMsg} loading={this.state.loading} success={!!this.state.okMsg}>
                <Form.Field>
                    <label>Token amount to send</label>
                    <Input
                        value={this.state.value}
                        onChange={event => this.setState({ value: event.target.value })}
                        label="token"
                        labelPosition="right"
                    />
                </Form.Field>
                <Form.Field>
                    <label>Receiver address</label>
                    <Input
                        value={this.state.receiver}
                        onChange={event => this.setState({ receiver: event.target.value })}
                        label="address"
                        labelPosition="right"
                    />
                </Form.Field>
                <Message error header="Oops!" content={this.state.errMsg} />
                <Message success header="Ok!" content="Points transfer completed and stored on the blockchain" />
                <Button primary>Transfer</Button>
            </Form>
        );
    }
}

export default TransferTokenForm;