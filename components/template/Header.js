import React, { Component } from "react";
import { Container, Dropdown, Header, Menu } from "semantic-ui-react";
import { Link } from "../../routes";
import * as firebase from "firebase";
import Head from "next/head";
import Favicon from "react-favicon";


// Logout if button logout is pressed in the dropdown menu
function onClickLogout() {
  event.preventDefault();

  // Call firebase for signout
  firebase.auth().signOut()
    .then(
      // Redirect to home after logout
      window.location.replace("http://localhost:3000/index")
    );
}

function onClickRedirectProfileUser() {
  window.location.replace("http://localhost:3000/auth/profileUser");
}

function onClickRedirectProfileOrg() {
  window.location.replace("http://localhost:3000/auth/profileOrg");
}

function onClickRedirectVoluneerSignup() {
  window.location.replace("http://localhost:3000/auth/signUpVolunteer");
}

function onClickOrgRegistration() {
  window.location.replace("http://localhost:3000/auth/signUpOrg");
}

// User logged Header
function UserLogged() {
  return (
    <Menu.Menu position="right">
      <Menu.Item key="b" name="transfer">
        <Link route="/transfer">
          <a>Transfer TOKENS</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="c" name="options">
        <Link route="/volunteerOptions">
          <a>Volunteer Options</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="d" name="requestStatus">
        <Link route="/volunteerRequestStatus">
          <a>Request Status</a>
        </Link>
      </Menu.Item>
      <Dropdown item text="Welcome User">
        <Dropdown.Menu>
          <Dropdown.Item onClick={onClickRedirectProfileUser}>
            Profile
          </Dropdown.Item>
          <Dropdown.Item onClick={onClickLogout}>
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Menu>
  );
}

// Org logged Header
function OrgLogged() {
  return (
    <Menu.Menu position="right">
      <Menu.Item key="u" name="activity">
        <Link route="/volunteerActivity">
          <a>Activity</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="u" name="approvalRequest">
        <Link route="/orgApprovalReq">
          <a>Approval Requests</a>
        </Link>
      </Menu.Item>
      <Menu.Item key="u" name="completionRequest">
        <Link route="/orgCompletionReq">
          <a>Completion Requests</a>
        </Link>
      </Menu.Item>
      <Dropdown item text="Welcome Organisation">
        <Dropdown.Menu>
          <Dropdown.Item onClick={onClickRedirectProfileOrg}>
            Profile
          </Dropdown.Item>
          <Dropdown.Item onClick={onClickLogout}>
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Menu>
  );
}

// No login Header
function NoLogged() {
  return <Menu.Menu position="right">
      <Menu.Item name="signIn">
        <Link route="/auth/signIn">
          <a>Sign In</a>
        </Link>
      </Menu.Item>
          <Dropdown text="Sign Up" item>
            <Dropdown.Menu>
              <Dropdown.Item onClick={onClickRedirectVoluneerSignup}>
                Volunteer Sign Up
              </Dropdown.Item>
              <Dropdown.Item onClick={onClickOrgRegistration}>
                Organisation Registration
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
    </Menu.Menu>;
}

// Admin Header
function AdminLogged() {
  var user = firebase.auth().currentUser;
  return (
    <Menu.Menu position="right">
      <Menu.Item name="createTokens">
        <Link route="/createTokens">
          <a>Token Generation</a>
        </Link>
      </Menu.Item>
      <Menu.Item name="transfer">
        <Link route="/transfer">
          <a>Transfer Tokens</a>
        </Link>
      </Menu.Item>
      <Menu.Item name="approveOrg">
        <Link route="/approve/approveOrg">
          <a>Approve Organisations</a>
        </Link>
      </Menu.Item>
      <Dropdown item text="Welcome Admin">
        <Dropdown.Menu>
          <Dropdown.Header>
            <a>Signed in as {user.email}</a>
          </Dropdown.Header>
          <Dropdown.Item onClick={onClickRedirectProfileUser}>
            Profile
          </Dropdown.Item>
          <Dropdown.Item onClick={onClickLogout}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Menu>
  );
}

class HeaderTop extends Component {
  // Initial state is that none is logged in.
  state = {
    isAdminLoggedIn: false,
    isUserLoggedIn: false,
    isOrgLoggedIn: false,
    isNoneLoggedIn: true,
  }

  // Check if the authentication state change.
  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
      // If user exists someone is logged in.
      if (user) {
        // Check if it is an ADMIN.
        if (user.email == "h.shishodia@gmail.com") {
          console.log("Admin logged in");
          this.setState({
            isAdminLoggedIn: true,
            isUserLoggedIn: false,
            isOrgLoggedIn: false,
            isNoneLoggedIn: false
          });
        }
        else {
          // Check if the user email is present in the org section of the db.
          firebase.app().database().ref("organisations").orderByChild("email").equalTo(user.email).once("value", snapshot => {
              const userData = snapshot.val();
              // Check if it is a Org.
              if (userData) {
                console.log("Org logged in!");
                this.setState({
                  isAdminLoggedIn: false,
                  isUserLoggedIn: false,
                  isOrgLoggedIn: true,
                  isNoneLoggedIn: false
                });
              // Check if it is a Volunteer.
              } else {
                console.log("Volunteer logged in");
                this.setState({
                  isAdminLoggedIn: false,
                  isUserLoggedIn: true,
                  isOrgLoggedIn: false,
                  isNoneLoggedIn: false
                });
              }
          });
        }
      // The variable user=null, so NONE is logged in.
      } else {
        console.log("None logged in");
        this.setState({
          isAdminLoggedIn: false,
          isUserLoggedIn: false,
          isOrgLoggedIn: false,
          isNoneLoggedIn: true
        });
      }
    });
  }

  render() {
    // Firebase configuration.

    var config = {
      apiKey: "AIzaSyDamV5-VuWpAAWvTV36BycSoskOVm23FmM",
      authDomain: "vogen-81330.firebaseapp.com",
      databaseURL: "https://vogen-81330.firebaseio.com",
      projectId: "vogen-81330",
      storageBucket: "",
      messagingSenderId: "116492875959",
      appId: "1:116492875959:web:e7beb3bd0698f29e"
    };
/*
    var config = {
      apiKey: "AIzaSyB7-H-6t5kb5D8XB9jf33SVkpjgmeJqATg",
      authDomain: "test-3ff4d.firebaseapp.com",
      databaseURL: "https://test-3ff4d.firebaseio.com",
      projectId: "test-3ff4d",
      storageBucket: "test-3ff4d.appspot.com",
      messagingSenderId: "1059441748413"
    };
*/    
    // If Firebase is not initialized, do it.
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
    return (
      <div>
        <Head>
          <link
            rel="stylesheet"
            href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
          />
        </Head>
        <div>
          <Favicon url="https://cdn.iconscout.com/public/images/icon/premium/png-512/ethereum-e-payment-money-payment-system-finance-business-ecommerce-37130f673fd3b537-512x512.png" />
          <h1>Hello, Favicon!</h1>
        </div>
        <Menu fixed="top" inverted>
          <Container>
            <Menu.Item as="a" header>
              Volunteer Points
            </Menu.Item>
            <Menu.Item name="home">
              <Link route="/index">
                <a>Home</a>
              </Link>
            </Menu.Item>
            <Menu.Item name="statistics">
              <Link route="/stats">
                <a>Statistics</a>
              </Link>
            </Menu.Item>
            {this.state.isAdminLoggedIn ? <AdminLogged /> : <div></div> }
            {this.state.isUserLoggedIn ? <UserLogged/> : <div></div>  }
            {this.state.isOrgLoggedIn ? <OrgLogged/> : <div></div>  }
            {this.state.isNoneLoggedIn ? <NoLogged /> : <div></div> }
          </Container>
        </Menu>
      </div>
    );
  }
}

export default HeaderTop;