# react-native-animated-autocomplete

A customisable animated modal based autocomplete

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
  return (
    <View>
      <AnimatedAutocomplete
        data={Array.from(Array(50).keys()).map(
          (item: number) => `Custom ${item}`
        )}
      />
    </View>
  );
}
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
