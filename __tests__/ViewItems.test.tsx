import React from 'react';
import {render} from '@testing-library/react-native';
import ViewItem from '../src/pages/ViewItem';
import {ListItemStackParamList} from '../src/models/navigationTypes';
import {RouteProp} from '@react-navigation/native';

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
      <ViewItem navigation={mockNavigation as any} route={mockRoute} />,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
