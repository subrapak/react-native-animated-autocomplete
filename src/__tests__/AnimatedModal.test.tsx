import { AnimatedModal } from '../AnimatedModal';
import { render } from '@testing-library/react-native';
import { Value } from 'react-native-reanimated';
import React, { createRef, useState } from 'react';
import type { TextInput } from 'react-native';

const mockModalHeight = new Value<number>(0);
const mockModalTranslateY = new Value<number>(848);
const mockData = ['mock1', 'mock2'];
const mockSearchBarRef = createRef<TextInput>();
jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock')
);
describe('Testing the Animated Modal component', () => {
  it('should render the animated modal component properly', () => {
    const animatedModal = render(
      <AnimatedModal
        animatedHeight={mockModalHeight}
        translateY={mockModalTranslateY}
        datalist={mockData}
        autocompleteText={'mockMainText'}
        setAutocompleteText={() => jest.fn()}
        searchRef={mockSearchBarRef}
      />
    );
    expect(animatedModal).toMatchSnapshot();
  });
});
