import React, { Component } from "react";
import * as firebase from "firebase";
import { Button, Table } from "semantic-ui-react";
import rewardPoints from '../../ethereum/vogen';
import web3 from '../../ethereum/web3';

class AdminApproveOrg extends Component {
  state = {
    orgList: [],
    loadingRenderFirst: true,
    errMsg: '',
    loading: false
  };

  // Take the ethereum address approved and push the value into the org approved in the blockchain
  onSubmit = async event => {
    event.preventDefault();
    event.persist();
    const orgEthereumAddress = event.target.value;
    const orgId = event.target.id;
    this.setState({ loading: true });
    // Get accounts.
    const accounts = await web3.eth.getAccounts();
    //Add the organisation to the official organisation array in the contract.
    await rewardPoints.methods.addOrg(orgEthereumAddress)
    .send({
      from: accounts[0],
      gas: '4500000'
    }).then(() => {
      // Edit file in firebase and than in table.
      firebase.app().database().ref("organisations").child(orgId).update({ approved: true });
    }).catch((err) => {
      // If the operation fails set the status to "approved = false".
      firebase.app().database().ref("organisations").child(orgId).update({ approved: false });
      var trimmedString = err.message.substring(0, 90);
      this.setState({ errMsg: trimmedString });
    });
    this.setState({ loading: false });
    window.location.reload();
  }

  // Load all orgs from the db.
  async loadData() {
    var self = this;
    const orgRef = firebase.app().database().ref("organisations").orderByChild("approved");
    var promise = new Promise((resolve, reject) => {
      orgRef.once("value").then(function(snapshot) {
        resolve(snapshot);
      });
    });
    return promise;
  }

  // Getting list of approved and not approved org when component is mounting
  async componentDidMount() {
    var self = this;

    window.addEventListener('load', async() => {
      if(window.web3){
          window.web3 =  new Web3(web3.currentProvider);
          console.log("web3 Injected")
      }
      else{
          console.log('Non-Ethereum browser detected. Try MetaMask!');
      }
  });

    this.loadData()
      .then((snapshot) => {
        var promise = new Promise((resolve, reject) => {
          snapshot.forEach((item) => {
            self.state.orgList.push(item);
          });
          resolve();
        });
        self.setState({ loadingRenderFirst: false });
        return promise;
      });
  }

  render() {
    // Phase 1 of rendering, data not fetched from the db.
    if (this.state.loadingRenderFirst== true) {
      return (
        <Table celled compact definition size="small">
          <Table.Header fullWidth>
            <Table.Row key={"header"}>
              <Table.HeaderCell />
              <Table.HeaderCell>Organisation Name</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Address</Table.HeaderCell>
              <Table.HeaderCell>Ethereum Address</Table.HeaderCell>
              <Table.HeaderCell>Approved</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body/>
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell colSpan="4" />
              <Table.HeaderCell />
            </Table.Row>
          </Table.Footer>
        </Table>
      );
    }
    // Phase 2 of rendering, data fetched from the db.
    if (this.state.loadingRenderFirst == false) {
    return (
      <Table celled compact definition size="small">
        <Table.Header fullWidth>
          <Table.Row key={"header"}>
            <Table.HeaderCell />
            <Table.HeaderCell>Organisation Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Address</Table.HeaderCell>
            <Table.HeaderCell>Ethereum Address</Table.HeaderCell>
            <Table.HeaderCell>Approved</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            this.state.orgList.map((item, index) => {
              var org = item.val();
              return (
                  <Table.Row key={item.key} disabled={!!org.approved} positive={org.approved} negative={!org.approved}>
                    <Table.Cell collapsing>
                      <Button  disabled={!!org.approved || this.state.loading} loading={this.state.loading} onClick={this.onSubmit} id={item.key} value={org.ethereum} size="small">Approve</Button>
                    </Table.Cell>
                    <Table.Cell collapsing>{org.orgName}</Table.Cell>
                    <Table.Cell collapsing>{org.email}</Table.Cell>
                    <Table.Cell collapsing>{org.orgAddress}, {org.city}, {org.country}</Table.Cell>
                    <Table.Cell collapsing>{org.ethereum}</Table.Cell>
                    <Table.Cell collapsing>{org.approved.toString()}</Table.Cell>
                  </Table.Row>
              );
            })
          }
        </Table.Body>
        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell colSpan="4" />
            <Table.HeaderCell />
          </Table.Row>
        </Table.Footer>
      </Table>
      );
    }
  }
}
export default AdminApproveOrg;
