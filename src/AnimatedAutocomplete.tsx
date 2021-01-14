import React, { createRef, FunctionComponent, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {
  State,
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, { Easing, Value } from 'react-native-reanimated';
import { AnimatedModal } from './AnimatedModal';

type Props = {
  mainInputViewStyle?: ViewStyle;
  mainInputTextStyle?: TextStyle;
  data: string[];
  defaultText?: string;
  closeIcon?: JSX.Element;
  searchIcon?: JSX.Element;
};

export const AnimatedAutocomplete: FunctionComponent<Props> = ({
  mainInputViewStyle,
  mainInputTextStyle,
  data,
  defaultText,
  closeIcon,
  searchIcon,
}: Props) => {
  const { height } = Dimensions.get('window');

  const modalHeight = new Value<number>(0);
  const modalTranslateY = new Value<number>(height);
  const mainTextOpacity = new Value<number>(1);
  const [mainText, setMainText] = useState<string>(defaultText ?? '');
  const searchBarRef = createRef<TextInput>();

  const handleTapStateChange = (event: TapGestureHandlerGestureEvent) => {
    if (event.nativeEvent.state === State.BEGAN) {
      Animated.timing(mainTextOpacity, {
        toValue: 0.2,
        duration: 50,
        easing: Easing.ease,
      }).start();
    } else {
      Animated.timing(mainTextOpacity, {
        toValue: 1,
        duration: 50,
        easing: Easing.ease,
      }).start();
    }
    Animated.timing(modalTranslateY, {
      toValue: 0,
      duration: 300,
      easing: Easing.sin,
    }).start(() => searchBarRef.current && searchBarRef.current.focus());
    Animated.timing(modalHeight, {
      toValue: height,
      duration: 300,
      easing: Easing.sin,
    }).start();
  };

  return (
    <View style={styles.mainViewStyle}>
      <TapGestureHandler
        onHandlerStateChange={handleTapStateChange}
        numberOfTaps={1}
      >
        <Animated.View
          style={[
            styles.animatedViewStyle,
            mainInputViewStyle,
            { opacity: mainTextOpacity },
          ]}
        >
          <Text style={[styles.mainText, mainInputTextStyle]}>{mainText}</Text>
        </Animated.View>
      </TapGestureHandler>
      <AnimatedModal
        animatedHeight={modalHeight}
        translateY={modalTranslateY}
        datalist={data}
        autocompleteText={mainText}
        setAutocompleteText={setMainText}
        closeIcon={closeIcon}
        searchIcon={searchIcon}
        searchRef={searchBarRef}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  mainText: {
    fontSize: 25,
  },
  animatedViewStyle: {
    flexDirection: 'row',
    borderRadius: 10,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowRadius: 5,
    shadowOpacity: 0.5,
    backgroundColor: 'white',
    padding: 10,
    width: 200,
    height: 50,
  },
  mainViewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
