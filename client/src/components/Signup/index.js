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
		console.log('sign-up handleSubmit, username: ')
		console.log("This is here: " + this.state.username)
		event.preventDefault()

		//request to server to add a new username/password
		axios.post('api/user/', {
			username: this.state.username,
			password: this.state.password
		})
			.then(response => {
				console.log(response)
				if (!response.data.errmsg) {
					console.log('successful signup')
					console.log('this works')
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
						{/* <Nav>
							<div className="collapse navbar-collapse" id="navbarNav">
								<ul className="navbar-nav ml-auto">
									<li className="nav-item active">
										<a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
									</li>
									<li className="nav-item">
										<a className="nav-link" href="/Login">Login</a>
									</li>
									<li className="nav-item">
										<a className="nav-link" href="#">Signup</a>
									</li>
								</ul>
							</div>
						</Nav> */}
						<div className="SignupForm">
							<h4>Sign up</h4>
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
										type="submit"
									>Sign up</button>
								</div>
							</form>
						</div>
					</Container >
				</div>
			)
		}
	}
}

export default Signup
