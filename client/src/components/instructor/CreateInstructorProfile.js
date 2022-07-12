import React, { Component } from "react"
import TextFieldGroup from "../common/TextFieldGroup"

export default class CreateInstructorProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      phone: "",
      errors: {},
    }
  }

  onSubmit = (e) => {
    e.preventDefault()
    // ! not implemented
  }

  render() {
    const { errors } = this.state
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Create Your Profile</h1>
            <small className="d-block pb-3">* = required fields</small>
            <form onSubmit={this.onSubmit}>
              <TextFieldGroup
                placeholder="Phone Number"
                name="phone"
                value={this.state.phone}
                onChange={this.onChange}
                error={errors.phone}
                info="Your phone number that will be shared with students"
              />

              {/* ! useful for later */}
              {/* <TextFieldGroup
                placeholder="* Skills"
                name="skills"
                value={this.state.skills}
                onChange={this.onChange}
                error={errors.skills}
                info="Please seperate the skills with a comma"
              /> */}

              {/* <TextAreaFieldGroup
                placeholder="Short Bio"
                name="bio"
                value={this.state.bio}
                onChange={this.onChange}
                error={errors.bio}
                info="Tell us about yourself"
              /> */}

              <input
                type="submit"
                value="Submit"
                className="btn btn-info  btn-block"
              />
            </form>
          </div>
        </div>
      </div>
    )
  }
}
