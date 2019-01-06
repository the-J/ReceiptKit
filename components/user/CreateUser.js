import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';

import UserForm from './UserForm';

import { signIn } from '../../utils/util-login';

class CreateUser extends Component {
   createUser = async ({ email, password }) => {
      try {
         this.props.loading(true);

         const user = await this.props.createUser({
            variables: { email, password }
         });

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
            type="Register"
            onSubmit={this.createUser}
            errors={this.props.errors}
         />
      );
   }
}

const createUser = gql`
  mutation createUser($email: String!, $password: String!) {
    createUser(
      authProvider: { email: { email: $email, password: $password } }
    ) {
      id
    }
  }
`;

const signinUser = gql`
  mutation signinUser($email: String!, $password: String!) {
    signinUser(email: { email: $email, password: $password }) {
      token
    }
  }
`;

export default compose(
   graphql(signinUser, { name: 'signinUser' }),
   graphql(createUser, { name: 'createUser' })
)(CreateUser);
