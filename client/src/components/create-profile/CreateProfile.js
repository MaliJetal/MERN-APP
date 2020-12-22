import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: '',
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      githubusername: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e){
    e.preventDefault();
    console.log("Submit");
  };
  onChange(e){
    this.setState({[e.target.name] : e.target.value});
  };

  render() {
    const {errors, displaySocialInputs} = this.state;

    let socialInputs;

    if(displaySocialInputs){
      socialInputs= (
        <div>
          <InputGroup 
            placeholder = "Twitter Profile URL"
            name = "twitter"
            icon = "fab fa-twitter"
            value = {this.state.twitter}
            onChange = {this.onChange}
            error = {errors.twitter}
          /> 
          <InputGroup 
            placeholder = "Facebook Profile URL"
            name = "facebook"
            icon = "fab fa-twitter"
            value = {this.state.facebook}
            onChange = {this.onChange}
            error = {errors.facebook}
          /> 
          <InputGroup 
            placeholder = "LinkedIn Profile URL"
            name = "linkedin"
            icon = "fab fa-twitter"
            value = {this.state.linkedin}
            onChange = {this.onChange}
            error = {errors.linkedin}
          /> 
          <InputGroup 
            placeholder = "Youtube Profile URL"
            name = "youtube"
            icon = "fab fa-youtube"
            value = {this.state.youtube}
            onChange = {this.onChange}
            error = {errors.youtube}
          /> 
          <InputGroup 
            placeholder = "Instagram Profile URL"
            name = "instagram"
            icon = "fab fa-instagram"
            value = {this.state.instagram}
            onChange = {this.onChange}
            error = {errors.instagram}
          /> 
        </div>
      )
    }

    return (
      <div className="create-profile">
        <div className="conatiner">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Tour Profile.</h1>
              <p className="lead text-center">
                Let's get some lead information to make your profile stand out
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL. Your full name, company name,
                  nickname"
                />
                <SelectListGroup
                  placeholder="* Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  error={errors.status}
                  info="Could be your own website or a company one."
                />
                <TextFieldGroup
                  placeholder="* Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Could be your own company or one you work for."
                />
                <TextFieldGroup
                  placeholder="* Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Could be your own website or a company one."
                />
                <TextFieldGroup
                  placeholder="* Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="City or city & state suggested (e.g. Boston, MA)"
                />
                <TextFieldGroup
                placeholder="* Skills"
                name="skills"
                value={this.state.skills}
                onChange={this.onChange}
                error={errors.skills}
                info="Please use comma seperated values(eg.
                  HTML,CSS,JavaScript"
                />
                <TextAreaFieldGroup
                placeholder="* Short Bio"
                name="bio"
                value={this.state.bio}
                onChange={this.onChange}
                error={errors.bio}
                info="Tell us little about yourself."
                />

                <div className= "mb-3">
                  <button onClick={() => {
                    this.setState(prevState => ({
                      displaySocialInputs : !prevState.displaySocialInputs
                    }))
                  }} className="btn btn-light">
                    Add Social Network
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                <input type="Submit" value="Submit" className= "btn btn-info btn-block m-4"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
})
export default connect(mapStateToProps)(CreateProfile);