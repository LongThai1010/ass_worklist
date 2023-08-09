import React, { Component } from 'react'
import { Button, Form, Header, Icon, Input, Modal, Segment } from 'semantic-ui-react'
import { refreshWorkDateDataId, setWorkDate, setWorkDateData } from '../../redux/workdates/workDateAction';
import { connect } from 'react-redux';
import firebase from '../../firebase'


class TopPaneHeader extends Component {
    state = {
        modal: false,
        workName: '',
        workDatesRef: firebase.database().ref('workdates'),
        worksRef: firebase.database().ref('works'),
    }

    handleChange = (event) => {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    }

    handleSubmit = (event) => {
        const { workName, worksRef } = this.state;

        if (this.props.workDateData) {
            this.saveWork(this.props.workDateData.id, workName, worksRef)
        } else {
            this.saveWorkDate()
        }

    }

    saveWorkDate = () => {
        if (this.isFormValid(this.state)) {
            const { workDatesRef, workName, worksRef } = this.state;
            const { user, workDate } = this.props;

            const key = workDatesRef.push().key;

            const newWorkDate = {
                id: key,
                date: workDate,
                uid: user.uid,
            }

            workDatesRef
                .child(key)
                .update(newWorkDate)
                .then(() => {
                    console.log('success')

                    this.saveWork(key, workName, worksRef)
                }).catch(err => {
                    console.log(err)
                })
        }
    }

    saveWork = (key, workname, worksRef) => {
        const newWork = {
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            name: workname,
            status: 'TODO'
        }

        worksRef.child(key).push().set(newWork).then(() => {
            console.log('save work')

            this.closeModal();
            this.props.refreshWorkDateDataId(Math.random())
        }).catch(err => {
            console.log(err)
        })
    }

    isFormValid = ({ workName }) => workName;

    closeModal = (event) => {
        this.setState({ modal: false })
    }

    openModal = (event) => {
        this.setState({ modal: true })
    }

    render() {
        const { modal } = this.state;
        const { workDate } = this.props
        return (
            <>
                <Segment clearing>
                    <Header>
                        <Icon name="calendar"></Icon>
                        <Header.Content><h2>Date: {workDate}</h2></Header.Content>
                        <Button icon="plus" floated="right" size="" onClick={this.openModal}></Button>
                    </Header>
                </Segment>

                <Modal basic open={modal} onClose={this.closeModal}>
                    <Modal.Header>Add a work</Modal.Header>
                    <Modal.Content>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Field>
                                <Input fluid label='Work Name: '
                                    name='workName'
                                    onChange={this.handleChange}
                                >
                                </Input>
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='green' inverted onClick={this.handleSubmit}>
                            <Icon name='checkmark'></Icon> ADD
                        </Button>

                        <Button color='red' inverted onClick={this.closeModal}>
                            <Icon name='remove'></Icon> CANCEL
                        </Button>
                    </Modal.Actions>
                </Modal>
            </>
        )
    }
}


const mapStateToProps = ({ workDates: { workDate, workDateData }, users: { user } }) => ({
    workDate: workDate,
    workDateData: workDateData,
    user: user
})

const mapDispatchToProps = (dispatch) => ({
    setWorkDate: (workDate) => dispatch(setWorkDate(workDate)),
    setWorkDateData: (data) => dispatch(setWorkDateData(data)),
    refreshWorkDateDataId: (id) => dispatch(refreshWorkDateDataId(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TopPaneHeader)
