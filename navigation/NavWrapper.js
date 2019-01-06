import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';

import React, { Component } from 'react';
import { ActivityIndicator, Button, StyleSheet, View } from 'react-native';
import { graphql, withApollo } from 'react-apollo';
import gql from 'graphql-tag';

import HomeScreen from '../screens/HomeScreen';
import Login from '../components/user/Login';


const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const Navigator = createStackNavigator({
  HomeScreen: {
    screen: withApollo(HomeScreen)
  }
});

// const bottomNav = createBottomTabNavigator({
//   Navigator
// });

const userQuery = gql`
  query userQuery {
    user {
      id
      email
    }
  }
`;
// posts(orderBy: createdAt_ASC) {
//   id
//   title
// }


const NavWrapper = ({ loading, user }) => {
  if (loading) return <ActivityIndicator size="large" />;
  if (!user) return <Login />;
  return <Navigator screenProps={{ user }} />;
};


export default graphql(userQuery, {
  props: ({ data }) => ({ ...data })
})(NavWrapper);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  newPost: {
    backgroundColor: '#00FF00'
  }
});


// import HomeScreen from '../screens/HomeScreen';
// import LinksScreen from '../screens/LinksScreen';
// import SettingsScreen from '../screens/SettingsScreen';
// import CreateAccount from '../screens/CreateAccount';

// const HomeStack = createStackNavigator({
//   Home: HomeScreen,
// });

// HomeStack.navigationOptions = {
//   tabBarLabel: 'Home',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={
//         Platform.OS === 'ios'
//           ? `ios-information-circle${focused ? '' : '-outline'}`
//           : 'md-information-circle'
//       }
//     />
//   ),
// };
