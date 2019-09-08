import React, { Component } from "react";
import * as firebase from "firebase";
import { Table, Button } from "semantic-ui-react";

class OrgApprovalReqTable extends Component {
  state = {
    approvalList: [],
    loadingRenderFirst: true,
    errMsg: '',
    loading: false
  };

  onApproval = async event => {
    event.preventDefault();
    event.persist();
    var requestId = event.target.id;
    var today = new Date(), 
    date = today.getDate(), 
    month = today.getMonth()+1,
    year = today.getFullYear();

    firebase.app().database().ref("volunteering_request").child(requestId).update({ status: "Approved" });
    firebase.app().database().ref("volunteering_request").child(requestId).update({ approval_Date: date +'/' + month +'/' + year});
    
    var ref = firebase.app().database().ref("volunteering_request").child(requestId);
    ref.once("value").then(function (snapshot){
      const activityId = snapshot.child("activity_id").val();

      firebase.app().database().ref("volunteering_activity").child(activityId).update({ status: "Assigned" }); 
    });
    alert("Approved");  
    window.location.replace("http://localhost:3000/orgApprovalReq");
  }

  onRejection = async event => {
    event.preventDefault();
    event.persist();
    var requestId = event.target.id;
    firebase.app().database().ref("volunteering_activity").child(requestId).update({ status: "New" });
    firebase.app().database().ref("volunteering_request").child(requestId).update({ status: "Rejected" });

    alert("Rejected");  
  }

    // Load all pending approval requests from the db.
  async loadData() {
    const requestsRef = firebase.app().database().ref("volunteering_request").orderByChild("status").equalTo("Waiting_Approval");
    var promise = new Promise((resolve, reject) => {
      requestsRef.once("value").then(function(snapshot) {
        resolve(snapshot);
      });
    });
    return promise;
  }

  async componentDidMount(){
    var self = this;
    this.loadData()
    .then((snapshot) => {
      var promise = new Promise((resolve, reject) => {
        snapshot.forEach((item) => {
          var orgId = firebase.auth().currentUser;
          if(item.val().organisation_id == orgId.uid){
            self.state.approvalList.push(item)
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
              <Table.HeaderCell>Request Date</Table.HeaderCell>
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
              <Table.HeaderCell>Request Date</Table.HeaderCell>
            <Table.HeaderCell />           
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            this.state.approvalList.map((item, index) => {
              var requests = item.val();
              return (
                  <Table.Row key={item.key} >
                    <Table.Cell collapsing>{requests.title}</Table.Cell>
                    <Table.Cell collapsing>{requests.description}</Table.Cell>
                    <Table.Cell collapsing>{requests.requestor_name}</Table.Cell>
                    <Table.Cell collapsing>{requests.submission_Date}</Table.Cell>
                    <Table.Cell collapsing> 
                      <Button onClick = {this.onApproval} id = {item.key} > Accept</Button>
                      <Button onClick = {this.onRejection} id = {item.key} > Reject</Button>
                    </Table.Cell>
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
export default OrgApprovalReqTable;