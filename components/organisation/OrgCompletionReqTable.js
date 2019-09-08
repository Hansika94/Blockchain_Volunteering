import React, { Component } from "react";
import * as firebase from "firebase";
import { Table, Button } from "semantic-ui-react";
import Web3 from 'web3';
console.log("dirname: ", __dirname);
const rewardPoints = require('../../ethereum/vogen');

class OrgCompletionReqTable extends Component {
  state = {
    completionList: [],
    loadingRenderFirst: true,
    errMsg: '',
    loading: false
  };

  onApproval = async event => {
    event.preventDefault();
    event.persist();
    var requestId = event.target.id;
    var volunteerEthAddr = event.target.value;
    //var timespend = event.target.key;
    //alert(timespend);

    firebase.app().database().ref("volunteering_request").child(requestId).update({ status: "Completed" }); 
    var ref = firebase.app().database().ref("volunteering_request").child(requestId);
    ref.on('value', (snapshot) => {
      const activityId = snapshot.child("activity_id").val();

      firebase.app().database().ref("volunteering_activity").child(activityId).update({ status: "Completed" }); 
    });

    try{
      var accounts = await window.web3.eth.getAccounts();
      await rewardPoints.methods.transfer(volunteerEthAddr,'20')
      .send({
          from: accounts[0],
          gas: '4500000'
      });
      this.setState({ loading: false, okMsg: true, value: '' });
  } catch (error) {
      var trimmedString = error.message.substring(0, 90);
      this.setState({ loading: false, errMsg: trimmedString, value: '' });
  }

    alert("Approved");  
    window.location.replace("http://localhost:3000/orgCompletionReq");
  }


  onRejection = async event => {
    event.preventDefault();
    event.persist();
    var requestId = event.target.id;
    firebase.app().database().ref("volunteering_request").child(requestId).update({ status: "Rejected" });

    alert("Rejected");  
  }

    // Load all pending approval requests from the db.
  async loadData() {
    const requestsRef = firebase.app().database().ref("volunteering_request").orderByChild("status").equalTo("Waiting_Completion");
    var promise = new Promise((resolve, reject) => {
      requestsRef.once("value").then(function(snapshot) {
        resolve(snapshot);
      });
    });
    return promise;
  }

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
            var orgId = firebase.auth().currentUser;
            if(item.val().organisation_id == orgId.uid){
              self.state.completionList.push(item);
            } 
          });
          resolve();
        });
        self.setState({ loadingRenderFirst: false });
        return promise;
      });
  }

  render() {
    if (this.state.loadingRenderFirst== true) {
      return (
        <Table celled compact definition size="small">
          <Table.Header fullWidth>
            <Table.Row key={"header"}>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Volunteer</Table.HeaderCell>
              <Table.HeaderCell>Time spent</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body/>
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell colSpan="4" />
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
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Volunteer</Table.HeaderCell>
              <Table.HeaderCell>Time spent</Table.HeaderCell>
            <Table.HeaderCell />           
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            this.state.completionList.map((item, index) => {
              var requests = item.val();
              return (
                  <Table.Row key={item.key} >
                    <Table.Cell collapsing>{requests.title}</Table.Cell>
                    <Table.Cell collapsing>{requests.description}</Table.Cell>
                    <Table.Cell collapsing>{requests.requestor_name}</Table.Cell>
                    <Table.Cell collapsing>{requests.time_spend + "hours"}</Table.Cell>
                      <Button onClick = {this.onApproval} id = {item.key} value = {requests.requestor_eth} key = {requests.time_spend}> Accept</Button>
                      <Button onClick = {this.onRejection} id = {item.key}> Reject</Button>
                  </Table.Row>
              );
            })
          }
        </Table.Body>
        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell colSpan="4" />
            <Table.HeaderCell />
          </Table.Row>
        </Table.Footer>
      </Table>
      );
    }
  }
}
export default OrgCompletionReqTable;