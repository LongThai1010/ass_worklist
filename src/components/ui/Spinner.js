import { Dimmer, Loader } from "semantic-ui-react";

function Spinner() {
    return (
        <Dimmer active>
            <Loader size='huge' content="Loading..."></Loader>
        </Dimmer>
    );
}

export default Spinner;