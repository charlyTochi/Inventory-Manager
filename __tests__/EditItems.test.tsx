import React from 'react';
import {render} from '@testing-library/react-native';
import EditItem from '../src/pages/EditItem';
import {ListItemStackParamList} from '../src/models/navigationTypes';
import {RouteProp} from '@react-navigation/native';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

describe('EditItem screen', () => {
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

  const mockRoute: RouteProp<ListItemStackParamList, 'EditItem'> = {
    key: 'EditItem',
    name: 'EditItem',
    params: {id: '1'},
  };

  it('should match the snapshot', () => {
    const {toJSON} = render(
      <EditItem navigation={mockNavigation as any} route={mockRoute} />,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
