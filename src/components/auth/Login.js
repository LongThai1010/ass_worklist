/* eslint-disable react-hooks/rules-of-hooks */
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Grid, Header, Icon, Message, Segment } from 'semantic-ui-react';
import './Login.css';
import firebase from '../../firebase'

class Login extends Component {
    state = {
        email: '',
        password: '',
        loading: false,
        errors: [],
    }
    handleChange = (event) => {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.isFormValid()) {
            const { email, password, errors } = this.state
            this.setState({ errors: [], loading: true });
            firebase.auth()
                .signInWithEmailAndPassword(email, password)
                .then((signedInUser) => {
                    console.log(signedInUser);
                    this.setState({ loading: false });

                    this.props.history.push('/')



                }).catch(err => {
                    console.log(err);
                    this.setState({ errors: [...errors, err], loading: false })
                })
        }
    }

    isFormValid = () => {

        let errors = []
        let error;
        const { email, password } = this.state;
        if (!email.length || !password.length) {
            error = { message: 'Vui long nhap cac truong nay' };
            this.setState({ errors: errors.concat(error) });
            return false;
        } else if (password.length < 6) {
            error = { message: 'sai password' };
            this.setState({ errors: errors.concat(error) });
            return false;
        }
        return true;

    }

    displayErrors = (errors) => errors.map((error, i) => (
        <p key={i}> {error.message}</p>
    ));
    handleInputError = (errors, inputName) => {
        return errors.some(error => error.message.includes(inputName)) ? 'error' : '';
    }

    render() {
        const { email, password, loading, errors } = this.state;
        return (
            <Grid textAlign='center' verticalAlign='middle' className='app'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' icon color='violet'>
                        <Icon name='code branch' color='violet'></Icon>
                        Login to WorkList
                    </Header>
                    <Form size='large' onSubmit={this.handleSubmit}>
                        <Segment>
                            <Form.Input type='email' fluid name='email' icon='mail' iconPosition='left'
                                placeholder='Email Address' value={email} onChange={this.handleChange}
                                className={this.handleInputError(errors, 'email')}
                            >
                            </Form.Input>

                            <Form.Input type='password' fluid name='password' icon='lock' iconPosition='left'
                                placeholder='Password' value={password} onChange={this.handleChange}
                                className={this.handleInputError(errors, 'password')}
                            >
                            </Form.Input>
                            <Button color='violet' fluid size='large' className={loading ? "loading" : ""}>Login</Button>
                        </Segment>
                    </Form>

                    {errors.length > 0 && (<Message error>
                        <h3>Error message</h3>
                        {this.displayErrors(errors)}
                    </Message>)}
                    <Message >
                        Don't have an account? <Link to="/register">Register</Link>
                    </Message>


                </Grid.Column>
            </Grid >
        );
    }
}

export default Login;


