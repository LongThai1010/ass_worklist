import { Component } from 'react';
import './App.css';
import { Divider, Grid, GridColumn } from 'semantic-ui-react';
import Home from './home/Home';
import SidePane from './SidePane/SidePane';
import firebase from '../firebase';
import { setUser, clearUser } from '../redux/users/userAction'
import { connect } from 'react-redux';
import TopPaneHeader from './TopPane/TopPaneHeader';
import ContentPane from './ContentPane/ContentPane';
import EmptyContentMessage from './ContentPane/EmptyContentMessage';


class App extends Component {
  handleSignout = () => {
    firebase.auth().signOut().then(() => {
      this.props.clearUser();
    })
  }

  render() {
    const { workDate, workDateData, refreshWorkDateDataId } = this.props;

    return (
      <Grid stretched stackable style={{ background: "#eee" }}>
        <GridColumn width="4">
          <SidePane onSignout={this.handleSignout} />
          {/* <Home /> */}
        </GridColumn>

        <GridColumn width="12">
          <GridColumn>

            <GridColumn width="16">
              <Grid.Row>
                <TopPaneHeader></TopPaneHeader>
              </Grid.Row>
              <Divider></Divider>
              <Grid.Row>
                {
                  this.props.workDateData
                    ?
                    <ContentPane key={`${workDateData.id}${refreshWorkDateDataId}`}
                      workDateId={workDateData.id}
                      workDate={workDate}
                    >
                    </ContentPane>
                    :
                    <EmptyContentMessage key={workDate} workDate={workDate}></EmptyContentMessage>
                }
              </Grid.Row>

            </GridColumn>
          </GridColumn>
        </GridColumn>

      </Grid>
    );
  }
}

const mapStateToProps = ({ users: { loading }, workDates: { workDate, workDateData, refreshWorkDateDataId } }) => ({
  workDate: workDate,
  workDateData,
  refreshWorkDateDataId
})

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(setUser(user)),
  clearUser: () => dispatch(clearUser()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);


