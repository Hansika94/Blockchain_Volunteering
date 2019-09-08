import React, { Component } from "react";
import * as firebase from "firebase";
import { Table, Icon, Button } from "semantic-ui-react";

class VolunteerOptionsTable extends Component {
  state = {
    activityList: [],
    loadingRenderFirst: true,
    errMsg: '',
    loading: false
  };
  
  onSubmit = async event => {
    event.preventDefault();
    event.persist();
    var request = event.target.id;
    var user = firebase.auth().currentUser;
    var today = new Date(), 
    date = today.getDate(), 
    month = today.getMonth()+1,
    year = today.getFullYear();
    var fullname = '';
    var addr = '';

    firebase.app().database().ref("volunteering_activity").child(request).update({ status: "Requested" });

    var ref = firebase.app().database().ref("users").child(user.uid);
    ref.once("value").then(function(snapshot) {
      const fname = snapshot.child("firstname").val();
      const lname = snapshot.child("lastname").val();
      const ethAddr = snapshot.child("ethereum").val();
      fullname = fname + ' ' + lname;
      addr = ethAddr;
    })

    var ref = firebase.app().database().ref("volunteering_activity").child(request);
    ref.once("value").then(function(snapshot) {
      const title = snapshot.child("title").val();
      const desc = snapshot.child("description").val();
      const org_id = snapshot.child("organisation_id").val();
      const org_name = snapshot.child("organisation_name").val();
      const time = snapshot.child("duration").val();

      firebase.app().database().ref("volunteering_request/")
      .push({
        title: title,
        description: desc,
        activity_id: request,
        requestor_id: user.uid,
        requestor_name: fullname,
        requestor_eth: addr,
        organisation_id: org_id,
        organisation_name: org_name,
        time_spend: time,
        submission_Date: year + '-' + month + '-' + date,
        approval_Date: '',
        completion_Date: '',
        status: 'Waiting_Approval'
      })
      .then(() => {
        alert("Request Send");
        window.location.replace("http://localhost:3000/volunteerOptions");
      });  
    });   
  }

  // Load all activities from the db.
  async loadData() {
    var self = this;
    const activityRef = firebase.app().database().ref("volunteering_activity").orderByChild("status").equalTo("New");
    var promise = new Promise((resolve, reject) => {
      activityRef.once("value").then(function(snapshot) {
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
            self.state.activityList.push(item);
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
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Start Time</Table.HeaderCell>
              <Table.HeaderCell>Duration</Table.HeaderCell>
              <Table.HeaderCell>Address</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body/>
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell colSpan="6" />
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
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Start Time</Table.HeaderCell>
            <Table.HeaderCell>Duration</Table.HeaderCell>
            <Table.HeaderCell>Address</Table.HeaderCell>
            <Table.HeaderCell />           
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            this.state.activityList.map((item, index) => {
              var activity = item.val();
              return (
                  <Table.Row key={item.key} >
                    <Table.Cell collapsing>{activity.title}</Table.Cell>
                    <Table.Cell collapsing>{activity.description}</Table.Cell>
                    <Table.Cell collapsing>{activity.date}</Table.Cell>
                    <Table.Cell collapsing>{activity.start_time}</Table.Cell>
                    <Table.Cell collapsing>{activity.duration}</Table.Cell>
                    <Table.Cell collapsing>{activity.address}, {activity.city}, {activity.country}</Table.Cell>
                    <Table.Cell collapsing> 
                     <Button onClick = {this.onSubmit} id = {item.key}> Volunteer</Button>
                    </Table.Cell>
                  </Table.Row>
              );
            })
          }
        </Table.Body>
        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell colSpan="6" />
            <Table.HeaderCell />
          </Table.Row>
        </Table.Footer>
      </Table>
      );
    }
  }
}

export default VolunteerOptionsTable;