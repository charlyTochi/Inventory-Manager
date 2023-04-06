import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ListItems from './src/pages/ListItems';
import CreateItem from './src/pages/CreateItem';
import ViewItem from './src/pages/ViewItem';
import EditItem from './src/pages/EditItem';
import Login from './src/pages/auth/Login';
import {ListItemStackParamList} from './src/models/navigationTypes';
import {AuthProvider} from './src/contexts/AuthContext';
import UserAccountProvider, {
  UserAccountContext,
} from './src/contexts/UserAccountContext';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';

const Stack = createNativeStackNavigator<ListItemStackParamList>();

const App = () => {
  const {logout, loginUserToken} = useContext(UserAccountContext) ?? {};

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={!loginUserToken ? 'Splash' : 'ListItems'}>
        {!loginUserToken ? (
          <Stack.Screen name="Login" component={Login} />
        ) : (
          <React.Fragment>
            <Stack.Screen
              name="ListItems"
              component={ListItems}
              options={{
                // eslint-disable-next-line react/no-unstable-nested-components
                headerRight: () => (
                  <TouchableOpacity onPress={() => logout()}>
                    <Image
                      source={require('./src/assets/images/logout.png')}
                      style={styles.searchIcon}
                    />
                  </TouchableOpacity>
                ),
                title: 'Inventory Items',
              }}
            />
            <Stack.Screen
              name="CreateItem"
              component={CreateItem}
              options={{title: 'Create Item'}}
            />
            <Stack.Screen
              name="ViewItem"
              component={ViewItem}
              options={{title: 'View Item'}}
            />
            <Stack.Screen
              name="EditItem"
              component={EditItem}
              options={{title: 'Edit Item'}}
            />
          </React.Fragment>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default () => (
  <AuthProvider>
    <UserAccountProvider>
      <App />
    </UserAccountProvider>
  </AuthProvider>
);

const styles = StyleSheet.create({
  searchIcon: {
    width: 22,
    height: 22,
    marginRight: 10,
  },
});
