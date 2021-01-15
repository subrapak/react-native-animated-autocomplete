# react-native-animated-autocomplete

A customisable animated modal based autocomplete

<img src="example_usage.gif" width="200"/>

## Installation

If you use npm:

```sh
npm install react-native-animated-autocomplete

```

If you use yarn:

```
yarn add react-native-animated-autocomplete
```

## Usage

```js
import * as React from 'react';

import { View } from 'react-native';
import AnimatedAutocomplete from 'react-native-animated-autocomplete';

export default function App() {
  const [formvalue, setFormValue] = useState('default value');
  return (
    <View>
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
```

## Props

| Prop (**required**)| Type                | Description                                                                  |
| ------------------ | ------------------- | ---------------------------------------------------------------------------- |
| **data**           | string[]            | The list of data to render in the autocomplete                               |
| **value**          | string              | The current value in the autocomplete. A default value can be set using this |
| **onSelectItem**   | (valstring) => void | The function to run when an item is selected                                 |
| mainInputViewStyle | ViewStyle           | Styles to add for the input view                                             |
| mainInputTextStyle | TextStyle           | Styles to add for the input text                                             |
| closeIcon?         | JSX.Element         | A custom icon for the close button                                           |
| searchIcon?        | JSX.Element         | A custom icon for the search icon                                            |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
