import { Component } from "react";
import { DateInput } from "semantic-ui-calendar-react";
import { Button, Divider, Grid, GridColumn, GridRow, Header, Icon, Menu, Segment } from "semantic-ui-react";

class Home extends Component {


    render() {
        return (


            <GridRow>
                <Grid>

                    <Grid.Column width="8">
                        <Segment stacked>
                            <Header>
                                <Icon name="bell" color="red"></Icon>
                                <Header.Content>Todo</Header.Content>
                            </Header>
                            <Divider></Divider>
                            <Segment attached clearing>
                                Do homework
                                <Button icon="trash alternate" color="red" floated="right" size="tiny"></Button>
                                <Button icon="checkmark" color="green" floated="right" size="tiny"></Button>

                            </Segment>

                            <Segment attached clearing>
                                Do homework
                                <Button icon="trash alternate" color="red" floated="right" size="tiny"></Button>
                                <Button icon="checkmark" color="green" floated="right" size="tiny"></Button>

                            </Segment>

                            <Segment attached clearing>
                                Do homework
                                <Button icon="trash alternate" color="red" floated="right" size="tiny"></Button>
                                <Button icon="checkmark" color="green" floated="right" size="tiny"></Button>

                            </Segment>
                        </Segment>
                    </Grid.Column>

                    <Grid.Column width="8">
                        <Segment stacked>
                            <Header>
                                <Icon name="calendar check outline" color="red"></Icon>
                                <Header.Content>Done</Header.Content>
                            </Header>
                            <Divider></Divider>
                            <Segment attached clearing>
                                Do homework
                                <Button icon="trash alternate" color="red" floated="right" size="tiny"></Button>
                                <Button icon="checkmark" color="green" floated="right" size="tiny"></Button>

                            </Segment>

                            <Segment attached clearing>
                                Do homework
                                <Button icon="trash alternate" color="red" floated="right" size="tiny"></Button>
                                <Button icon="checkmark" color="green" floated="right" size="tiny"></Button>

                            </Segment>

                            <Segment attached clearing>
                                Do homework
                                <Button icon="trash alternate" color="red" floated="right" size="tiny"></Button>
                                <Button icon="checkmark" color="green" floated="right" size="tiny"></Button>

                            </Segment>
                        </Segment>




                    </Grid.Column>
                </Grid>
            </GridRow>




        );
    }
}

export default Home;