import React from 'react';
import './CreateNewPlaylist.css';
import $ from 'jquery';
import { REST } from '../settings';
import { Field, Formik, ErrorMessage, Form } from 'formik';

export default class CreateNewPlaylist extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }
  

  handleSubmit( values, { props = this.props, setSubmitting}) {
    fetch(`${REST}playlist`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: values.name,
        type: 'public',
        user: values.username,
        settings: {
          duplicates: values.duplicates
        }
      })
    }).then(data => {
      if (data.status === 201) {
        window.location.replace('/playlist')
      } else {
        alert('Adding playlist failed, reloading...')
        window.location.reload();
      }
    })
    setSubmitting(false);
    return;
  }

  validate(values) {
    let errors = {};

    if (!values.name || values.name === '') {
      errors.name = 'Name required';
    }
    if (!values.username || values.username === '') {
      errors.username = 'Username required';
    }

    return errors;
  }

  render() {
    return (
      <div className="CreateNewPlaylist">
        <h2>Create a new playlist</h2>
        <Formik
          initialValues={{
            name: '',
            username: '',
            duplicates: true
          }}
          validate={this.validate}
          onSubmit={this.handleSubmit}
        >
          {formProps => 
              <Form>
                <Field type="text" name="name" className="input is-info" placeholder="Playlist Name"/>
                <div className="errorContainer" id="errorName">
                  <ErrorMessage name="name" render={msg => <div className="error">{msg}</div>}/>
                </div>
                <Field type="text" name="username" className="input is-info" placeholder="Username"/>
                <div className="errorContainer" id="errorUsername">
                  <ErrorMessage name="username" render={msg => <div className="error">{msg}</div>}/>
                </div>
                <div id="duplicates">
                  Duplicates allowed? &nbsp;
                  <Field type="checkbox" name="duplicates" className="checkbox" />
                </div>
                <button type="submit" disabled={formProps.isSubmitting}>Submit</button>
              </Form>
          }
        </Formik>
      </div>
    )
  }
}