import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Divider, Header, Icon, Segment } from "semantic-ui-react";
import { refreshWorkDateDataId } from '../../redux/workdates/workDateAction';
import firebase from '../../firebase';


class ToDoPane extends Component {
    state = {
        worksRef: firebase.database().ref('works')
    }

    handleDeleteWork = (work) => {
        const { worksRef } = this.state;
        const { workDateId } = this.props;

        worksRef
            .child(workDateId)
            .child(work.id)
            .remove()
            .then(() => {
                this.props.refreshWorkDateDataId(Math.random())
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleUpdataStatus = (work) => {
        const { worksRef } = this.state;
        const { workDateId } = this.props;


        worksRef.child(workDateId).child(work.id).update({
            name: work.name,
            status: 'DONE',
            timestamp: firebase.database.ServerValue.TIMESTAMP
        })
            .then((updateWork) => {
                console.log(updateWork)
                this.props.refreshWorkDateDataId(Math.random())
            })
            .catch(err => {
                console.log(err)
            })
    }


    render() {
        const { toDoWorks } = this.props;
        return (
            <Segment stacked>
                <Header>
                    <Icon name="bell" color="red"></Icon>
                    <Header.Content>Todo</Header.Content>
                </Header>
                <Divider></Divider>
                {toDoWorks && toDoWorks.length > 0 && toDoWorks.map(item => (<Segment key={item.id} attached clearing>
                    {item.name}
                    <Button icon="trash alternate" color="red" floated="right" size="tiny"
                        onClick={() => this.handleDeleteWork(item)}></Button>
                    <Button icon="checkmark" color="green" floated="right" size="tiny"
                        onClick={() => this.handleUpdataStatus(item)}></Button>

                </Segment>))}



            </Segment>
        )
    }
}


const mapDispatchToProps = (dispatch) => ({
    refreshWorkDateDataId: (id) => dispatch(refreshWorkDateDataId(id))
})

export default connect(null, mapDispatchToProps)(ToDoPane)