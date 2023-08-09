import React from 'react'
import { Message } from 'semantic-ui-react'

const EmptyContentMessage = (props) => {
    return (
        <Message>
            <Message.Header>No works in the day '{props.workDate}'</Message.Header>
        </Message>
    )
}

export default EmptyContentMessage