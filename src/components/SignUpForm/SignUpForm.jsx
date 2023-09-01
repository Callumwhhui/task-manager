import { Component } from "react";
import {signUp} from '../../utilities/users-service'
import {Link} from 'react-router-dom'

export default class SignUpForm extends Component {
    state = {
        name: "",
        email: "", 
        password:"",
        confirm: "",
        error: "",
    };

    handleChange = (evt) => {
        this.setState({
          [evt.target.name]: evt.target.value,
          error: ''
        });
      };

    handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const formData = {...this.state};
            delete formData.error;
            delete formData.confirm;

            const user = await signUp(formData);
            this.props.setUser(user);
        } catch {
            this.setState({error: 'Sign Up Failed - Try Again'})
        }
    }

    render() {
        const disable = this.state.password !== this.state.confirm;
        return (
          <div>
            <div className="form-container">
              <h3>Sign up</h3>
              <form autoComplete="off" onSubmit={this.handleSubmit}>
                <input className="form-input" type="text" name="name" placeholder="Username" value={this.state.name} onChange={this.handleChange} required />
                <input className="form-input" type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required />
                <input className="form-input" type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required />
                <input className="form-input" type="password" name="confirm" placeholder="Confirm Password" value={this.state.confirm} onChange={this.handleChange} required />
                <button type="submit" disabled={disable}>SIGN UP</button>
              </form>
            </div>
            <p className="error-message">&nbsp;{this.state.error}</p>
          </div>
        );
      }
      
}