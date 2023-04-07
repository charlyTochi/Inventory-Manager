import {render} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import ViewItem from '../src/pages/ViewItem';
import {ListItemStackParamList} from '../src/models/navigationTypes';
import {RouteProp} from '@react-navigation/native';
import React from 'react';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

describe('ViewItem screen', () => {
  const mockNavigation = {
    navigate: jest.fn(),
    goBack: jest.fn(),
    push: jest.fn(),
    replace: jest.fn(),
    setOptions: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
    reset: jest.fn(),
    pop: jest.fn(),
    popToTop: jest.fn(),
    dispatch: jest.fn(),
  };

  const mockRoute: RouteProp<ListItemStackParamList, 'ViewItem'> = {
    key: 'ViewItem',
    name: 'ViewItem',
    params: {id: '1'},
  };

  it('should match the snapshot', () => {
    const {toJSON} = render(
      <NavigationContainer>
        <ViewItem navigation={mockNavigation as any} route={mockRoute} />
      </NavigationContainer>,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
