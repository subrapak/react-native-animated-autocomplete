import React, { Dispatch, FunctionComponent, useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { Easing, Value } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

type Props = {
  translateY: Animated.Value<number>;
  animatedHeight: Animated.Value<number>;
  datalist: string[];
  autocompleteText: string;
  setAutocompleteText: Dispatch<React.SetStateAction<string>>;
};

export const AnimatedModal: FunctionComponent<Props> = ({
  translateY,
  animatedHeight,
  datalist,
  autocompleteText,
  setAutocompleteText,
}: Props) => {
  const listMaxHeight = new Value<number>(height * 0.8);

  const closeModal = (item?: string) => {
    Animated.timing(translateY, {
      toValue: height,
      duration: 300,
      easing: Easing.ease,
    }).start(() => {
      item && setAutocompleteText(item);
      setSearchBarText('');
      setFilterData(originalData);
      Keyboard.dismiss();
    });
    Animated.timing(animatedHeight, {
      toValue: 0,
      duration: 500,
      easing: Easing.ease,
    }).start();
  };
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _keyboardDidShow = () => {
    Animated.timing(listMaxHeight, {
      toValue: height * 0.5,
      duration: 500,
      easing: Easing.ease,
    }).start();
  };

  const _keyboardDidHide = () => {
    Animated.timing(listMaxHeight, {
      toValue: height * 0.8,
      duration: 300,
      easing: Easing.ease,
    }).start();
  };

  const renderItem = ({ item }: { item: string }) => {
    return (
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={() => closeModal(item)}
      >
        <Text style={styles.renderText}>{item}</Text>
      </TouchableOpacity>
    );
  };

  const [originalData] = useState<string[]>(datalist);
  const [filterData, setFilterData] = useState<string[]>(datalist);
  const [searchBarText, setSearchBarText] = useState<string>(autocompleteText);
  const handleChangeSearchBarText = (text: string) => {
    setSearchBarText(text);

    text.length
      ? setFilterData(originalData.filter((item) => item.includes(text)))
      : setFilterData(originalData);
  };
  return (
    <Animated.View
      style={{
        ...styles.animatedModal,
        height: animatedHeight,
        transform: [{ translateY: translateY }],
      }}
    >
      <View style={styles.mainContent}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.textInput}
            value={searchBarText}
            onChangeText={handleChangeSearchBarText}
            autoCorrect={false}
          />
        </View>
        <Animated.View style={[styles.animatedView, { height: listMaxHeight }]}>
          <FlatList
            data={filterData}
            renderItem={renderItem}
            keyExtractor={(item: string) => item}
          />
        </Animated.View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    // height: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 10,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowRadius: 5,
    shadowOpacity: 0.5,
    backgroundColor: 'white',
    padding: 10,
  },
  renderText: { fontSize: 18, color: 'grey' },
  animatedView: {
    overflow: 'hidden',
    paddingVertical: 5,
  },
  iconStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  mainContent: {
    width: '100%',
    height: '100%',
    padding: 10,
  },
  textInput: {
    width: 350,
    height: '100%',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    fontSize: 25,
    padding: 0,
  },
  touchableOpacity: {
    width: '100%',
    backgroundColor: '#f2f2f2',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    padding: 15,
  },
  animatedModal: {
    position: 'absolute',
    top: 0,
    height: height,
    width: width,
    marginHorizontal: 'auto',
    display: 'flex',
    borderRadius: 25,
    paddingVertical: 50,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    alignItems: 'center',
  },
});
