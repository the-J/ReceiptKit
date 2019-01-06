import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Form, Input, Item, Label } from 'native-base';

export default class UserForm extends Component {
   state = {
      email: '',
      password: '',

      errorEmail: '',
      errorPass: ''
   };

   submitForm = () => {
      const { email, password } = this.state;

      if (!email) this.setState({ errorEmail: 'Email is required' });
      if (!password) this.setState({ errorPass: 'Password is required' });

      if (!email || !password) return;

      this.props.onSubmit({
         email,
         password
      });
   };

   onTextChange = e => {
      const key = Object.keys(e)[0];
      const value = Object.values(e)[0];

      if (key === 'email') {
         this.setState({
            email: value,
            errorEmail: ''
         });
      }

      if (key === 'password') {
         this.setState({
            password: value,
            errorPass: ''
         });
      }
   };

   render() {
      return (
         <Form style={styles.form}>
            {
               !!this.props.errors
                  ? <Text style={styles.error}>{this.props.errors[0]}</Text>
                  : null
            }

            <View style={styles.input}>
               <Item floatingLabel>
                  <Label>Email</Label>

                  <Input
                     keyboardType="email-address"
                     onChangeText={email => this.onTextChange({ email: email })}
                     value={this.state.email}
                  />
               </Item>
            </View>

            {this.state.errorEmail ? <Text style={styles.error}>{this.state.errorEmail}</Text> : null}

            <View style={styles.input}>
               <Item floatingLabel>
                  <Label>Password</Label>

                  <Input
                     secureTextEntry
                     onChangeText={password => this.onTextChange({ password: password })}
                     value={this.state.password}
                  />
               </Item>
            </View>

            {this.state.errorPass ? <Text style={styles.error}>{this.state.errorPass}</Text> : null}

            <View style={styles.button}>
               <Button
                  title={this.props.type}
                  onPress={this.submitForm}
               />
            </View>
         </Form>
      );
   }
}

const styles = StyleSheet.create({
   button: {
      width: '90%',
      margin: '5%'
   },
   error: {
      color: 'red'
   },
   border: {
      borderColor: 'black',
      borderWidth: 1
   },
   input: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingRight: '5%'
   }
});
