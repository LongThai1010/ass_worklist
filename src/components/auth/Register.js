import React, { Component } from 'react'
import { Grid, Header, Icon, Segment, Form, Button, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import firebase from '../../firebase'
import md5 from 'md5'


class Register extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        loading: false,
        errors: [],
        userRef: firebase.database().ref('users')
    }
    handleChange = (event) => {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        if (this.isFormValid()) {
            const { username, email, password, errors } = this.state
            this.setState({ errors: [], loading: true });
            firebase.auth()
                .createUserWithEmailAndPassword(email, password)
                .then((createdUser) => {
                    console.log(createdUser);

                    createdUser.user.updateProfile({
                        displayName: username,
                        photoURL: `http://garvatar.co/avatar/${md5(createdUser.user.email)}?d=identicon`
                    })
                        .then(() => {
                            this.saveUser(createdUser).then(() => {
                                console.log('user saved');
                                this.setState({ loading: false })

                                this.props.history.push('/login')
                            })
                        })
                }).catch(err => {
                    console.log(err);
                    this.setState({ errors: [...errors, err], loading: false })
                })
        }
    }
    saveUser = (createdUser) => {
        return this.state.userRef.child(createdUser.user.uid).set({
            name: createdUser.user.displayName,
            avatar: createdUser.user.photoURL
        })
    }

    isFormValid = () => {
        let errors = []
        let error;
        const { username, email, password, passwordConfirmation } = this.state;
        if (!username.length || !email.length || !password.length || !passwordConfirmation.length) {
            error = { message: 'Vui long nhap cac truong nay' };
            this.setState({ errors: errors.concat(error) });
            return false;
        } else if (password.length < 6 || passwordConfirmation.length < 6 || password !== passwordConfirmation) {
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
        const { username, password, email, passwordConfirmation, loading } = this.state

        return (
            <Grid textAlign='center' verticalAlign='middle' className='app'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' icon color='violet'>
                        {<Icon name='puzzle piece' color='violet'></Icon>}

                        <h3>Đăng kí tài khoản</h3>
                    </Header>
                    <Form size='large' onSubmit={this.handleSubmit}>
                        <Segment stacked>
                            <Form.Input fluid name='username' value={username} icon='user' iconPosition='left' placeholder='User name' type='username' onChange={this.handleChange} className={this.handleInputError(this.state.errors, 'username')}></Form.Input>
                            <Form.Input fluid name='email' value={email} icon='mail' iconPosition='left' placeholder='Email address' type='email' onChange={this.handleChange} className={this.handleInputError(this.state.errors, 'email')}></Form.Input>
                            <Form.Input fluid name='password' value={password} icon='lock' iconPosition='left' placeholder='password' type='password' onChange={this.handleChange} className={this.handleInputError(this.state.errors, 'password')}></Form.Input>
                            <Form.Input fluid name='passwordConfirmation' value={passwordConfirmation} icon='repeat' iconPosition='left' placeholder='Password confirmation' type='password' onChange={this.handleChange} className={this.handleInputError(this.state.errors, 'passwordConfirmation')}></Form.Input>

                            <Button className={loading ? 'loading' : ''} color='violet' fluid size='large'> submit</Button>
                        </Segment>
                    </Form>
                    {this.state.errors.length > 0 && (<Message error>
                        <h3>Error message</h3>
                        {this.displayErrors(this.state.errors)}
                    </Message>)}
                    <Message>
                        You have an account? <Link to='/login'>Login</Link>
                    </Message>

                </Grid.Column>
            </Grid>
        )
    }
}

export default Register
