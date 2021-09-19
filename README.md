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


## Footer Component Usage

```typescript
import { Footer } from 'senderrand-shared-components';

let fontFamily = {
  light: 'Light',
  regular: 'Regular',
  medium: 'Medium',
  bold: 'Bold',
  italic: 'RegularItalic',
};

const Example = () => (
 <Footer
   fontFamily={fontFamily}
   onError={(message) => Alert.alert('Failed', message)}
   clipIcon={<MaterialCommunityIcons name={'paperclip'} />}
   sendIcon={<MaterialCommunityIcons name={'send'} />}
   onSelectOption={(index) => console.log(index)}
   audioIcon={<Ionicons name={'mic-outline'} />}
   leftIcon={
     <Ionicons
       name={'location-outline'}
       color={scheme === 'dark' ? '#fff' : '#6A6A6A'}
     />
   }
   recordIcon={
     <Ionicons
       name={'mic-outline'}
       color={scheme === 'dark' ? '#fff' : '#3C4656'}
     />
   }
 />
);
```

## Features
- Camera.
- Image Picker.
- Audio Recorder.
- Text Input

## Tech

The Header component uses a number of open source projects to work properly:

- `expo-av` - For Audio Recording.
- `expo-image-picker` - To take picture from camera or select from library.
- `react-native-actionsheet` - To display Footer options.
- `expo-file-system` - To get the URI of the recorded audio.

## props

Below are the listed props that can be passed to the header component

| Property | Type | Required | Description |
| ------ | ------ | ------ | ------ |
| `defaultOptions` | `array` | `false` | This array is passed to the footer options to display. Defaults to `['Camera', 'Photo Library']`  |
| `cancetTxt` | `string` | `false` | The string to replace the cancel text. Defaults to `Cancel` |
| `options` | `array` | `false` | Additional options passed to the footer to display. |
| `reply` | `object` | `false` | A message object passed to the footer to display when replying a message. |
| `send` | `function` | `false` | A functions that returns the message object as a parameter. |
| `onError` | `function` | `false` | A function that returns error message as a parameter. |
| `onSelectOption` | `function` | `false` | The function returns the index of the selected option as parameter. |
| `leftIcon` | `React.Component` | `false` | The icon displayed on the left hand side of the input text. |
| `fontFamily` | `object` | `true` | An object that contains the font family used for the text elements in the footer component. An example is shown above. |
| `multiline` | `boolean` | `false` | The multiline props for the footer text input. |
| `placeholder` | `string` | `false` | The placeholder props for the footer text input. |
| `keyboardType` | `string` | `false` | The keyboardType props for the footer text input. |
| `clipIcon` | `React.Component` | `false` | The attach file icon.  |
| `loading` | `boolean` | `false` | To disable all footer functionalities and display the loading component. |
| `audioIcon` | `React.Component` | `false` | The microphone icon to represent audio record.  |
| `sendIcon` | `React.Component` | `false` | The paper plane icon to represent send button.  |
| `sheetOneTitle` | `string` | `false` | The title of the first action sheet, defaults to `Options`.  |
| `sheetTwoTitle` | `string` | `false` | The title of the second action sheet, defaults to `Options`.  |
| `recordIcon` | `React.Component` | `false` |  The microphone icon to represent audio record.  |


## Success Modal 1

```typescript
import { Header } from 'senderrand-shared-components';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

const family = {
  light: 'Light',
  regular: 'Regular',
  medium: 'Medium',
  bold: 'Bold',
  italic: 'RegularItalic',
};

const Example = () => {
  let [visible, setVisible] = useState(true)

  return (
    <SuccessModal
      fontFamily={family}
      visible={visible}
      title={'Congratulations'}
      close={() => setVisible(false)}
      btnTitle={'Close Modal'}
      checkIcon={<Ionicons name={'check'} />}
      content={'We are exited to have you join our team!'}
    />
  )
}
```

## Features
- A styled success modal to be displayed after successful action

## props

Below are the listed props that can be passed to the header component

| Property | Type | Required | Description |
| ------ | ------ | ------ | ------ |
| `animationType` | `string` | `false` | Default animationType options for react native modal. Defaults to `slide` |
| `visible` | `boolean` | `true` | Set the visibility of the modal to true or false |
| `checkIcon` | `React.Component` | `true` | An icon to represent a check mark |
| `fontFamily` | `object` | `true` | An object containing the app font family, example above |
| `title` | `string` | `false` | The text string to be displayed as title ex: 'Congrats' |
| `content` | `string` | `false` | The details string displayed below the title |
| `close` | `function` | `false` | A function called after the button is pressed |
| `btnTitle` | `string` | `false` | The title of the button displayed |


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
