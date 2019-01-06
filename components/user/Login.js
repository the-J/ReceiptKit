import React, { Component, Fragment } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import { withApollo } from 'react-apollo';

import CreateUser from './CreateUser';
import LoginUser from './LoginUser';

class Login extends Component {
   state = {
      register: true,
      loading: false,
      errors: []
   };

   loading = bool => this.setState({ loading: bool });

   setErrors = errors => this.setState({ errors });

   render() {
      const { register, loading, errors } = this.state;

      return (
         <Fragment>
            {loading
               ? (
                  <View style={styles.loader}>
                     <ActivityIndicator size="large" />
                  </View>
               ) : (
                  <View style={styles.container}>
                     <Text style={styles.header}>{register ? 'Register' : 'Login'}</Text>

                     {register
                        ? <CreateUser
                           {...this.props}
                           errors={errors}
                           setErrors={errors => this.setErrors(errors)}
                           loading={bool => this.loading(bool)}
                        />
                        : <LoginUser
                           {...this.props}
                           errors={errors}
                           setErrors={errors => this.setErrors(errors)}
                           loading={bool => this.loading(bool)}
                        />
                     }

                     <View style={styles.verticalLine} />

                     <View style={styles.button}>
                        <Button
                           loading={loading}
                           title={register ? 'Login' : 'Register'}
                           onPress={() => this.setState({ register: !register })}
                        />
                     </View>
                  </View>
               )
            }
         </Fragment>
      );
   }
}

const styles = StyleSheet.create({
   loader: {
      flex: 1,
      justifyContent: 'center'
   },
   container: {
      justifyContent: 'center',
      width: '100%',
      padding: '5%',
      marginTop: 20
   },
   header: {
      color: 'grey'
   },
   verticalLine: {
      borderBottomColor: 'lightgrey',
      borderBottomWidth: 1,
      marginLeft: '5%',
      width: '90%'
   },
   button: {
      width: '90%',
      margin: '5%'
   }
});

export default withApollo(Login);
