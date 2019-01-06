import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import UserForm from './UserForm';

import { signIn } from '../../utils/util-login';

class LoginUser extends Component {
   loginUser = async ({ email, password }) => {
      try {
         this.props.loading(true);

         const signin = await this.props.signinUser({
            variables: { email, password }
         });

         signIn(signin.data.signinUser.token);
         this.props.client.resetStore();

      } catch (res) {
         this.props.loading(false);

         const errors = res.graphQLErrors.map(error => error.message);
         this.props.setErrors(errors);
      }
   };

   render() {
      return (
         <UserForm
            type="Login"
            onSubmit={this.loginUser}
            errors={this.props.errors}
         />
      );
   }
}

const signinUser = gql`
  mutation signinUser($email: String!, $password: String!) {
    signinUser(email: { email: $email, password: $password }) {
      token
    }
  }
`;

export default graphql(signinUser, { name: 'signinUser' })(LoginUser);
