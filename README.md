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
import { Entypo } from '@expo/vector-icons';

const family = {
  light: 'Light',
  regular: 'Regular',
  medium: 'Medium',
  bold: 'Bold',
  italic: 'RegularItalic',
};

const Example = () => (
 <Header
   detail={'Typing..'}
   title={'SendErrand'}
   fontFamily={family}
   entypo={Entypo}
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
| `entypo` | `@expo/vector-icons` | `true` | It takes in Entypo component to represent the menu icon |
| `optionTxtStyle` | `Style` | `false` | The style passed to the option text component |
| `onPressOption` | `Function` | `false` | This function call when each menu option is tapped. It returns the index of the tapped option as parameter |
| `fontFamily` | `object` | `true` | An object that contains the font family used for the text elements in the header component. An example is shown above. |


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
   send={send}
   fontFamily={family}
   ionicons={Ionicons}
   antDesign={AntDesign}
   materialCommunityIcons={MaterialCommunityIcons}
   onSelectOption={(index: number) => console.log(index)}
   onError={(message: string) => Alert.alert('Failed', message)}
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
| `ionicons` | `@expo/vector-icons` | `true` | It takes in Ionicons component to display icons in the footer component |
| `fontFamily` | `object` | `true` | An object that contains the font family used for the text elements in the footer component. An example is shown above. |
| `multiline` | `boolean` | `false` | The multiline props for the footer text input. |
| `placeholder` | `string` | `false` | The placeholder props for the footer text input. |
| `keyboardType` | `string` | `false` | The keyboardType props for the footer text input. |
| `antDesign` | `@expo/vector-icons` | `true` | It takes in AntDesign component to display icons in the footer component |
| `loading` | `boolean` | `false` | To disable all footer functionalities and display the loading component. |
| `materialCommunityIcons` | `@expo/vector-icons` | `true` | It takes in MaterialCommunityIcons component to display icons in the footer component |
| `sheetOneTitle` | `string` | `false` | The title of the first action sheet, defaults to `Options`.  |
| `sheetTwoTitle` | `string` | `false` | The title of the second action sheet, defaults to `Options`.  |
| `onChangeText` | `function` | `false` |  Handles text input change, returns text string as parameter.  |


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
      entypo={Entypo}
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
| `entypo` | `@expo/vector-icons` | `true` | It takes in Entypo component to display icons in the component |
| `fontFamily` | `object` | `true` | An object containing the app font family, example above |
| `title` | `string` | `false` | The text string to be displayed as title ex: 'Congrats' |
| `content` | `string` | `false` | The details string displayed below the title |
| `close` | `function` | `false` | A function called after the button is pressed |
| `btnTitle` | `string` | `false` | The title of the button displayed |

## Success Modal 2

```typescript
import { Header } from 'senderrand-shared-components';
import { useState } from 'react';
import { Entypo } from '@expo/vector-icons';

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
    <SuccessModal2
      entypo={Entypo}
      fontFamily={family}
      visible={visible}
      text={'Verified Successfully'}
      press={() => setVisible(false)}
      btnTitle={'Continue'}
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
| `blue` | `boolean` | `false` | Pass blue to display the blue version, defaults to green |
| `visible` | `boolean` | `true` | Set the visibility of the modal to true or false |
| `entypo` | `@expo/vector-icons` | `true` | It takes in Entypo component to display icons in the component |
| `fontFamily` | `object` | `true` | An object containing the app font family, example above |
| `text` | `string` | `false` | The text string to be displayed as title ex: 'Verified Successfully' |
| `press` | `function` | `false` | A function called after the button is pressed |
| `btnTitle` | `string` | `false` | The title of the button displayed |


## TextBox Component

```typescript
import { TextBox } from 'senderrand-shared-components';
import { Ionicons } from '@expo/vector-icons';
import { FlatList } from 'react-native';

const family = {
  light: 'Light',
  regular: 'Regular',
  medium: 'Medium',
  bold: 'Bold',
  italic: 'RegularItalic',
};

const Example = () => {

  return (
    <FlatList
      data={[]}
      renderItem={(item: any) => (
        <TextBox
          fontFamily={family}
          ionicons={Ionicons}
          reply={item.reply}
          status={item.status} // 0: not sent, 1: sent, 2: received, 3:read
          text={item.text}
          date={item.date}
          sender={item.sender.id === 1}
          toReply={() => scrollToMsg(item.reply)}
          onSelectOption={() => {}}
        />
      )}
    />
  )
}
```

## Features
- A chat text box component

## props

Below are the listed props that can be passed to the TextBox

| Property | Type | Required | Description |
| ------ | ------ | ------ | ------ |
| `options` | `array` | `false` | Options displayed on long press of the chat text box. |
| `cancetTxt` | `string` | `false` | The string to replace the cancel text. Defaults to `Cancel` |
| `ionicons` | `@expo/vector-icons` | `true` | It takes in ionicons component to display icons in the component |
| `fontFamily` | `object` | `true` | An object containing the app font family, example above |
| `onSelectOption` | `function` | `false` | The function returns the index of the selected option as parameter. |
| `sender` | `boolean` | `true` | The boolean that denotes the sender of the message |
| `reply` | `object` | `false` | A message object passed to display the message replied to |
| `toReply` | `function` | `true` | The function that calls when the reply component in the chat box in tapped. |
| `text` | `string` | `false` | The text message displayed in the text box. |
| `date` | `Date` | `false` | A date object to be displayed in the text box. |
| `status` | `number` | `false` | The status of the current message 0 = sending(not send), 1 = sent, 2 = received, 3 = read. |
| `optionTitle` | `string` | `false` | The title of the displayed options, defaults to `Options` |

## VoiceNote Component

```typescript
import { VoiceNote } from 'senderrand-shared-components';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { FlatList } from 'react-native';

const family = {
  light: 'Light',
  regular: 'Regular',
  medium: 'Medium',
  bold: 'Bold',
  italic: 'RegularItalic',
};

const Example = () => {

  return (
    <FlatList
      data={[]}
      renderItem={(item: any) => (
        <VoiceNote
          image={'http//jpg'}
          entypo={Entypo}
          ionicons={Ionicons}
          status={item.status}
          date={item.date}
          audio={item.file && item.file.uri}
          sender={item.sender.id === 1}
          onSelectOption={() => {}}
        />
      )}
    />
  )
}
```

## Features
- A chat voice note component

## props

Below are the listed props that can be passed to the VoiceNote

| Property | Type | Required | Description |
| ------ | ------ | ------ | ------ |
| `options` | `array` | `false` | Options displayed on long press of the chat text box. |
| `cancetTxt` | `string` | `false` | The string to replace the cancel text. Defaults to `Cancel` |
| `audio` | `string` | `true` | The audio url. |
| `ionicons` | `@expo/vector-icons` | `true` | It takes in ionicons component to display icons in the component |
| `entypo` | `@expo/vector-icons` | `true` | It takes in Entypo component to display icons in the component |
| `fontFamily` | `object` | `true` | An object containing the app font family, example above |
| `onSelectOption` | `function` | `false` | The function returns the index of the selected option as parameter. |
| `sender` | `boolean` | `true` | The boolean that denotes the sender of the message |
| `date` | `Date` | `false` | A date object to be displayed in the text box. |
| `status` | `number` | `false` | The status of the current message 0 = sending(not send), 1 = sent, 2 = received, 3 = read. |
| `optionTitle` | `string` | `false` | The title of the displayed options, defaults to 'Options' |
| `image` | `string` | `false` | The image of the voice note sender. |


## ImageBox Component

```typescript
import { ImageBox } from 'senderrand-shared-components';
import { Ionicons } from '@expo/vector-icons';
import { FlatList } from 'react-native';

const family = {
  light: 'Light',
  regular: 'Regular',
  medium: 'Medium',
  bold: 'Bold',
  italic: 'RegularItalic',
};

const Example = () => {

  return (
    <FlatList
      data={[]}
      renderItem={(item: any) => (
        <VoiceNote
          image={'http//jpg'}
          entypo={Entypo}
          ionicons={Ionicons}
          status={item.status}
          date={item.date}
          audio={item.file && item.file.uri}
          sender={item.sender.id === 1}
          onSelectOption={() => {}}
        />
      )}
    />
  )
}
```

## Features
- A chat image box component

## props

Below are the listed props that can be passed to the ImageBox

| Property | Type | Required | Description |
| ------ | ------ | ------ | ------ |
| `image` | `string` | `false` | The image url to be displayed. |
| `options` | `array` | `false` | Options displayed on long press of the chat text box. |
| `cancetTxt` | `string` | `false` | The string to replace the cancel text. Defaults to `Cancel` |
| `ionicons` | `@expo/vector-icons` | `true` | It takes in ionicons component to display icons in the component |
| `fontFamily` | `object` | `true` | An object containing the app font family, example above |
| `onSelectOption` | `function` | `false` | The function returns the index of the selected option as parameter. |
| `sender` | `boolean` | `true` | The boolean that denotes the sender of the message |
| `date` | `Date` | `false` | A date object to be displayed in the text box. |
| `status` | `number` | `false` | The status of the current message 0 = sending(not send), 1 = sent, 2 = received, 3 = read. |
| `optionTitle` | `string` | `false` | The title of the displayed options, defaults to 'Options' |


## VideoBox Component

```typescript
import { ImageBox } from 'senderrand-shared-components';
import { Ionicons } from '@expo/vector-icons';
import { FlatList } from 'react-native';

const family = {
  light: 'Light',
  regular: 'Regular',
  medium: 'Medium',
  bold: 'Bold',
  italic: 'RegularItalic',
};

const Example = () => {

  return (
    <FlatList
      data={[]}
      renderItem={(item: any) => (
        <VoiceNote
          image={'http//jpg'}
          entypo={Entypo}
          ionicons={Ionicons}
          status={item.status}
          date={item.date}
          audio={item.file && item.file.uri}
          sender={item.sender.id === 1}
          onSelectOption={() => {}}
        />
      )}
    />
  )
}
```

## Features
- A chat video box component

## props

Below are the listed props that can be passed to the VideoBox

| Property | Type | Required | Description |
| ------ | ------ | ------ | ------ |
| `video` | `string` | `false` | The video url. |
| `ionicons` | `@expo/vector-icons` | `true` | It takes in ionicons component to display icons in the component |
| `fontFamily` | `object` | `true` | An object containing the app font family, example above |
| `sender` | `boolean` | `true` | The boolean that denotes the sender of the message |
| `date` | `Date` | `false` | A date object to be displayed in the text box. |
| `status` | `number` | `false` | The status of the current message 0 = sending(not send), 1 = sent, 2 = received, 3 = read. |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
