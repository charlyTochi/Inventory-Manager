import mockmockmockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import {render} from '@testing-library/react-native';
import ListItems from '../src/pages/ListItems';
import {ListItemStackParamList} from '../src/models/navigationTypes';
import {RouteProp} from '@react-navigation/native';
import React from 'react';
jest.mock(
  '@react-native-async-storage/async-storage',
  () => mockmockmockAsyncStorage,
);
describe('ListItems screen', () => {
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

  const mockRoute: RouteProp<ListItemStackParamList, 'ListItems'> = {
    key: 'ListItems',
    name: 'ListItems',
    params: undefined,
  };

  it('should match the snapshot', () => {
    const {toJSON} = render(
      <ListItems navigation={mockNavigation as any} route={mockRoute} />,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
