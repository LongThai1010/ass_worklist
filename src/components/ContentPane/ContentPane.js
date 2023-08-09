import React, { Component } from 'react'
import { Grid } from "semantic-ui-react";
import ToDoPane from './ToDoPane';
import DonePane from './DonePane';
import firebase from '../../firebase';
import Spinner from '../ui/Spinner'
import EmptyContentMessage from './EmptyContentMessage';

class ContentPane extends Component {
    state = {
        worksRef: firebase.database().ref('works'),
        workDateId: this.props.workDateId,
        toDoWorks: [],
        doneWorks: [],
        loading: true,
        hasWork: true,
    }

    componentDidMount() {
        const { workDateId } = this.state;

        if (workDateId) this.addListeners(workDateId)
    }
    componentWillUnmount() {
        this.removeListeners()
    }

    addListeners = (workDateId) => {
        let toDoWorks = [];
        let doneWorks = [];

        const { worksRef } = this.state;
        worksRef.child(workDateId).on('child_added', (snap) => {
            // console.log(snap.val())

            this.retriesworks(snap.val(), snap.key, toDoWorks, doneWorks)
        })

        worksRef.child(workDateId).once('value', (snap) => {
            if (snap.numChildren() === 0) {
                this.setState({ hasWork: false, loading: false })
            } else {
                this.setState({ hasWork: true })
            }
        })
    }

    retriesworks = (work, key, toDoWorks, doneWorks) => {
        if (work.status === 'TODO') {
            toDoWorks.push({ id: key, ...work })
        } else {
            doneWorks.push({ id: key, ...work })
        }

        this.setState({
            toDoWorks,
            doneWorks,
            loading: false
        })
    }

    removeListeners = () => {
        this.state.worksRef.off()
    }

    render() {
        const { hasWork, loading, workDateId, toDoWorks, doneWorks } = this.state
        return (
            <>
                {loading && (<Spinner></Spinner >)}
                {
                    hasWork && (
                        <Grid>
                            <Grid.Column width="8">
                                <ToDoPane key={`t${toDoWorks.length}`} toDoWorks={toDoWorks} workDateId={workDateId}></ToDoPane>
                            </Grid.Column>

                            <Grid.Column width="8">
                                <DonePane key={`t${doneWorks.length}`} doneWorks={doneWorks} workDateId={workDateId}></DonePane>
                            </Grid.Column>
                        </Grid>
                    )
                }

                {
                    !hasWork && (
                        <EmptyContentMessage workDate={this.props.wordDate}></EmptyContentMessage>
                    )
                }

            </>

        );
    }
}

export default ContentPane