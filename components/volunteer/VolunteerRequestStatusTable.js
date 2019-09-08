import React, { Component } from "react";
import * as firebase from "firebase";
import { Table, Icon, Button, Item } from "semantic-ui-react";

class RequestStatusTable extends Component {
  state = {
    statusList: [],
    loadingRenderFirst: true,
    errMsg: '',
    loading: false
  };

  onComplete = async event => {
    event.preventDefault();
    event.persist();
    var requestId = event.target.id;
    var today = new Date(), 
    date = today.getDate(), 
    month = today.getMonth()+1,
    year = today.getFullYear();

    firebase.app().database().ref("volunteering_request").child(requestId).update({ status: "Waiting_Completion"});
    firebase.app().database().ref("volunteering_request").child(requestId).update({ completion_Date: year + '-' + month + '-' + date});
    alert("Notified Organisation about completion!!");  
    window.location.replace("http://localhost:3000/volunteerRequestStatus");
  }

  // Load all approved requests from the db.
  async loadData() {
    var userId = firebase.auth().currentUser;
    const requestsRef = firebase.app().database().ref("volunteering_request").orderByChild("requestor_id").equalTo(userId.uid);
    var promise = new Promise((resolve, reject) => {
      requestsRef.once("value").then(function(snapshot) {
        resolve(snapshot);
      });
    });
    return promise;
  }

  async componentDidMount() {
    var self = this;
    this.loadData()
      .then((snapshot) => {
        var promise = new Promise((resolve, reject) => {
          snapshot.forEach((item) => {
            if(item.val().status == "Approved"){
              self.state.statusList.push(item)
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
              <Table.HeaderCell>Organisation</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body/>
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell colSpan="3" />
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
              <Table.HeaderCell>Organisation</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell />           
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            this.state.statusList.map((item, index) => {
              var reqStatus = item.val();
              return (
                  <Table.Row key={item.key} >
                    <Table.Cell collapsing>{reqStatus.title}</Table.Cell>
                    <Table.Cell collapsing>{reqStatus.organisation_name}</Table.Cell>
                    <Table.Cell collapsing>{reqStatus.status}</Table.Cell>
                    <Table.Cell collapsing> 
                      <Button onClick = {this.onComplete} id = {item.key}> Completed</Button>
                    </Table.Cell>
                  </Table.Row>
              );
            })
          }
        </Table.Body>
        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell colSpan="3" />
            <Table.HeaderCell />
          </Table.Row>
        </Table.Footer>
      </Table>
      );
    }
  }
}

export default RequestStatusTable;