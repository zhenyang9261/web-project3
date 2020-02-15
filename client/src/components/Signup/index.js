import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import Nav from "../Nav";
import { Container } from "../Grid";

class Signup extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
			confirmPassword: '',
			redirectTo: null
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}
	handleSubmit(event) {
		
		event.preventDefault()

		//request to server to add a new username/password
		axios.post('api/user/', {
			username: this.state.username,
			password: this.state.password
		})
			.then(response => {
				console.log(response)
				if (!response.data.errmsg) {
					
					this.setState({ //redirect to login page
						redirectTo: '/Login'
					})
				} else {
					console.log('username already taken')
				}
			}).catch(error => {
				console.log('signup error: ')
				console.log(error)

			})
	}


	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		} else {
			return (
                <div>
                    <Container fluid>
                      
                        <div className="card">
                            <div className="card-header">
                                Login </div>
                            <div className="card-body">
                                <h4 className="card-title">Signup</h4>
                                <p className="card-text"></p>
								<form className="form-horizontal">
								<div className="form-group">
									<div className="col-1 col-ml-auto">
										<label className="form-label" htmlFor="username">Username: </label>
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
										type="submit"
									>Sign up</button>
								</div>
							</form>
						</div>
						</div>
					</Container >
				</div>
			)
		}
	}
}

export default Signup
