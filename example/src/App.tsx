import * as React from 'react';
import { useState } from 'react';

import { StyleSheet, View } from 'react-native';
import AnimatedAutocomplete from 'react-native-animated-autocomplete';

export default function App() {
  const [formvalue, setFormValue] = useState('default value');
  return (
    <View style={styles.container}>
      <AnimatedAutocomplete
        data={Array.from(Array(50).keys()).map(
          (item: number) => `Custom ${item}`
        )}
        value={formvalue}
        onSelectItem={(val: string) => setFormValue(val)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
