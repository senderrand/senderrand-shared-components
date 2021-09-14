# senderrand-shared-components

WIP: intented collection of similar components used across out applications

## Installation

```sh
npm install senderrand-shared-components
```

## Usage

```js
import SenderrandSharedComponents from "senderrand-shared-components";

// ...

const result = await SenderrandSharedComponents.multiply(3, 7);
```

## Header Component Usage

```typescript
import { Header } from 'senderrand-shared-components';

let styles = {
  optionTxtStyle: { fontFamily: 'Regular' },
  titleStyle: { fontFamily: 'Regular' },
  detailStyle: { fontFamily: 'RegularItalic' },
};

const Example = () => (
 <Header
   detail={'Typing..'}
   title={'SendErrand'}
   titleStyle={styles.titleStyle}
   detailStyle={styles.detailStyle}
   optionTxtStyle={styles.optionTxtStyle}
   rightIcon={
    <Entypo
      name={'dots-three-vertical'}
      color={'#ddd'}
    />
   }
   options={['History', 'Locations', 'Profile', 'FAQs']}
/>
)
```

## Features
- Styled Header with logo, title, detail & options

## Tech

The Header component uses a number of open source projects to work properly:

- `styled-components` - For styling.
- `expo-constant` - To get status bar height

## props

Below are the listed props that can be passed to the header component

| Property | Type | Required | Description |
| ------ | ------ | ------ | ------ |
| `containerStyle` | `Style` | `false` | The style passed to the header container |
| `image` | `string` | `false` | The image url passed to the header logo, defaults to senderrand logo |
| `title` | `string` | `false` | The text string to be displayed in the title |
| `titleStyle` | `Style` | `false` | The style passed to the header title |
| `detail` | `string` | `false` | The text string to be displayed in the detail below the title |
| `detailStyle` | `Style` | `false` | The style passed to the header detail |
| `options` | `array` | `false` | An string array of options passed to the header menu options |
| `rightIcon` | `React.Component` | `false` | It takes in a component to represent the menu icon |
| `optionTxtStyle` | `Style` | `false` | The style passed to the option text component |
| `onPressOption` | `Function` | `false` | This function call when each menu option is tapped. It returns the index of the tapped option as parameter |


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
