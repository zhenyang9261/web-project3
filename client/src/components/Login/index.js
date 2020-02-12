import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import Nav from "../Nav";
import { Container } from "../Grid";

class LoginForm extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            redirectTo: null
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.getUser = this.getUser.bind(this)
    }

    updateUser(userObject) {
        this.setState(userObject)
    }
    getUser() {
        axios.get('/user/').then(response => {
            console.log('Get user response: ')
            console.log(response.data)
            if (response.data.user) {
                console.log('Get User: There is a user saved in the server session: ')

                this.setState({
                    loggedIn: true,
                    username: response.data.user.username
                })
            } else {
                console.log('Get user: no user');
                this.setState({
                    loggedIn: false,
                    username: null
                })
            }
        })
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        console.log('handleSubmit')

        axios
            .post('api/user/login', {
                username: this.state.username,
                password: this.state.password
            })
            .then(response => {
                console.log('login response: ')
                console.log(response.data.userid)
                if (response.status === 200) {
                    console.log("Login Retrieved");
                    // update App.js state
                    this.props.updateUser({
                        loggedIn: true,
                        username: response.data.username
                    })
                    // update the state to redirect to home
                    this.setState({
                        redirectTo: '/personaljournal/' + response.data.userid
                    })
                }
            }).catch(error => {
                console.log('login error: ');
                alert("Incorrect Login");
                console.log(error);

            })
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <div>
                    <Container fluid>
                        {/* <Nav>
                            <div className="collapse navbar-collapse" id="navbarNav">
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item active">
                                        <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Login</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/Signup">Signup</a>
                                    </li>
                                </ul>
                            </div>
                        </Nav> */}
                        <div className="card">
                            <div className="card-header">
                                Login </div>
                            <div className="card-body">
                                <h4 className="card-title">Login</h4>
                                <p className="card-text"></p>
                                <form className="form-horizontal">
                                    <div className="form-group">
                                        <div className="col-1 col-ml-auto">
                                            <label className="form-label" htmlFor="username">Username</label>
                                        </div>
                                        <div className="col-3 col-mr-auto">
                                            <input className="form-input"
                                                type="text"
                                                id="username"
                                                name="username"
                                                placeholder="Username"
                                                value={this.state.username}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-1 col-ml-auto">
                                            <label className="form-label" htmlFor="password">Password: </label>
                                        </div>
                                        <div className="col-3 col-mr-auto">
                                            <input className="form-input"
                                                placeholder="password"
                                                type="password"
                                                name="password"
                                                value={this.state.password}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group ">
                                        <div className="col-7"></div>
                                        <button
                                            className="btn btn-primary col-1 col-mr-auto"

                                            onClick={this.handleSubmit}
                                            type="submit">Login</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {/* <h4>Login</h4>
                        <form className="form-horizontal">
                            <div className="form-group">
                                <div className="col-1 col-ml-auto">
                                    <label className="form-label" htmlFor="username">Username</label>
                                </div>
                                <div className="col-3 col-mr-auto">
                                    <input className="form-input"
                                        type="text"
                                        id="username"
                                        name="username"
                                        placeholder="Username"
                                        value={this.state.username}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-1 col-ml-auto">
                                    <label className="form-label" htmlFor="password">Password: </label>
                                </div>
                                <div className="col-3 col-mr-auto">
                                    <input className="form-input"
                                        placeholder="password"
                                        type="password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                            <div className="form-group ">
                                <div className="col-7"></div>
                                <button
                                    className="btn btn-primary col-1 col-mr-auto"

                                    onClick={this.handleSubmit}
                                    type="submit">Login</button>
                            </div>
                        </form> */}
                    </Container >
                </div>
            )
        }
    }
}

export default LoginForm