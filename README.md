# senderrand-shared-components

WIP: intented collection of similar components used across out applications

## Installation

```sh
npm install senderrand-shared-components
```

Content
========================
* [Header](#header-component-usage)
* [Header2](#header2-component-usage)
* [Footer](#footer-component-usage)
* [Success Modal 1](#success-modal-1)
* [Success Modal 2](#success-modal-2)
* [TextBox Component](#textbox-component)
* [VoiceNote Component](#voicenote-component)
* [ImageBox Component](#imagebox-component)
* [VideoBox Component](#videobox-component)
* [FooterOptions Component](#footeroptions-component)
* [LocationBox Component](#locationbox-component)
* [FleetFooter](#fleetfooter-component)
* [FleetBox](#fleetbox-component)
* [StatusBox](#statusbox-component)
* [NewRunner](#newrunner-component)
* [InvoiceBox](#invoicebox-component)
* [TrackBox](#trackbox-component)
* [SwipeUp](#swipeup-component)
* [LoadingModal](#LoadingModal)
* [InvoiceModal](#InvoiceModal)
* [ReasonSwipe Component](#reasonswipe-component)
* [LocationSwipe Component](#locationswipe-component)
* [Exported Libraries](#exported-libraries)

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
   lang={'ar'}
   detail={'Typing..'}
   title={'SendErrand'}
   family={family}
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
| `family` | `object` | `true` | An object that contains the font family used for the text elements in the header component. An example is shown above. |
| `lang` | `string` | `false` | The language that should be used for the default text in the component. Defaults to `en`. |


## Header2 Component Usage

```typescript
import { Header2 } from 'senderrand-shared-components';
import { Entypo, MaterialIcons } from '@expo/vector-icons';

const family = {
  light: 'Light',
  regular: 'Regular',
  medium: 'Medium',
  bold: 'Bold',
  italic: 'RegularItalic',
};

const Example = () => (
  <Header2
    lang={'en'}
    entypo={Entypo}
    title={'Earnings'}
    family={family}
    back={() => props.navigation.goBack()}
    options={['One', 'Two']}
    materialIcons={MaterialIcons}
  />
)
```

## Features
- Styled Header with title, detail & options

## Tech

The Header2 component uses a number of open source projects to work properly:

- `styled-components` - For styling.
- `expo-constant` - To get status bar height

## props

Below are the listed props that can be passed to the header2 component

| Property | Type | Required | Description |
| ------ | ------ | ------ | ------ |
| `containerStyle` | `Style` | `false` | The style passed to the header container |
| `title` | `string` | `false` | The text string to be displayed in the title |
| `left` | `React.Component` | `false` | A component displayed on the left part of the header. |
| `right` | `React.Component` | `false` | A component displayed on the right part of the header. |
| `back` | `function` | `false` | A function called when back button is pressed. When passed the back button displays. |
| `options` | `array` | `false` | An string array of options passed to the header menu options |
| `entypo` | `@expo/vector-icons` | `true` | It takes in Entypo component to represent the menu icon |
| `optionTxtStyle` | `Style` | `false` | The style passed to the option text component |
| `onPressOption` | `Function` | `false` | This function call when each menu option is tapped. It returns the index of the tapped option as parameter |
| `family` | `object` | `true` | An object that contains the font family used for the text elements in the header component. An example is shown above. |
| `lang` | `string` | `false` | The language that should be used for the default text in the component. Defaults to `en`. |


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
   family={family}
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
| `onSelectDefaultOption` | `function` | `false` | The function returns the index of the selected option as parameter. |
| `ionicons` | `@expo/vector-icons` | `true` | It takes in Ionicons component to display icons in the footer component |
| `family` | `object` | `true` | An object that contains the font family used for the text elements in the footer component. An example is shown above. |
| `multiline` | `boolean` | `false` | The multiline props for the footer text input. |
| `placeholder` | `string` | `false` | The placeholder props for the footer text input. |
| `keyboardType` | `string` | `false` | The keyboardType props for the footer text input. |
| `antDesign` | `@expo/vector-icons` | `true` | It takes in AntDesign component to display icons in the footer component |
| `loading` | `boolean` | `false` | To disable all footer functionalities and display the loading component. |
| `materialCommunityIcons` | `@expo/vector-icons` | `true` | It takes in MaterialCommunityIcons component to display icons in the footer component |
| `sheetOneTitle` | `string` | `false` | The title of the first action sheet, defaults to `Options`.  |
| `sheetTwoTitle` | `string` | `false` | The title of the second action sheet, defaults to `Options`.  |
| `onChangeText` | `function` | `false` |  Handles text input change, returns text string as parameter.  |
| `lang` | `string` | `false` | The language that should be used for the default text in the component. Defaults to `en`. |


## Success Modal 1

```typescript
import { SuccessModal } from 'senderrand-shared-components';
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
    <SuccessModal
      family={family}
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
| `family` | `object` | `true` | An object containing the app font family, example above |
| `title` | `string` | `false` | The text string to be displayed as title ex: 'Congrats' |
| `content` | `string` | `false` | The details string displayed below the title |
| `close` | `function` | `false` | A function called after the button is pressed |
| `btnTitle` | `string` | `false` | The title of the button displayed |

## Success Modal 2

```typescript
import { SuccessModal2 } from 'senderrand-shared-components';
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
      family={family}
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
| `family` | `object` | `true` | An object containing the app font family, example above |
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
          family={family}
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
| `family` | `object` | `true` | An object containing the app font family, example above |
| `onSelectOption` | `function` | `false` | The function returns the index of the selected option as parameter. |
| `sender` | `boolean` | `true` | The boolean that denotes the sender of the message |
| `reply` | `object` | `false` | A message object passed to display the message replied to |
| `toReply` | `function` | `true` | The function that calls when the reply component in the chat box in tapped. |
| `text` | `string` | `false` | The text message displayed in the text box. |
| `date` | `Date` | `false` | A date object to be displayed in the text box. |
| `status` | `number` | `false` | The status of the current message 0 = sending(not send), 1 = sent, 2 = received, 3 = read. |
| `optionTitle` | `string` | `false` | The title of the displayed options, defaults to `Options` |
| `lang` | `string` | `false` | The language that should be used for the default text in the component. Defaults to `en`. |

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
| `ionicons` | `@expo/vector-icons` | `true` | It takes in Ionicons component to display icons in the component |
| `entypo` | `@expo/vector-icons` | `true` | It takes in Entypo component to display icons in the component |
| `family` | `object` | `true` | An object containing the app font family, example above |
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
| `family` | `object` | `true` | An object containing the app font family, example above |
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
        <VideoBox
          lang={'en'}
          ionicons={Ionicons}
          status={item.status}
          date={item.date}
          video={item.file && item.file.uri}
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
| `family` | `object` | `true` | An object containing the app font family, example above |
| `sender` | `boolean` | `true` | The boolean that denotes the sender of the message |
| `date` | `Date` | `false` | A date object to be displayed in the text box. |
| `status` | `number` | `false` | The status of the current message 0 = sending(not send), 1 = sent, 2 = received, 3 = read. |

## FooterOptions Component

```typescript
import { FooterOptions } from 'senderrand-shared-components';

const family = {
  light: 'Light',
  regular: 'Regular',
  medium: 'Medium',
  bold: 'Bold',
  italic: 'RegularItalic',
};

const Example = () => {

  return (
    <FooterOptions
      family={family}
      press={(index: number) => console.log(index)}
      options={['Purchase', 'Pick Up']}
    />
  )
}
```

## Features
- A UI component that display an array of buttons

## props

Below are the listed props that can be passed to the FooterOptions

| Property | Type | Required | Description |
| ------ | ------ | ------ | ------ |
| `options` | `array` | `true` | The string array representing each button to be displayed. Each button displays the string passed. |
| `family` | `object` | `true` | An object containing the app font family, example above |
| `press` | `function` | `true` | The function called when a button is pressed, with the index of the particular button pressed. |

## LocationBox Component

```typescript
import { LocationBox } from 'senderrand-shared-components';
import { Ionicons, Entypo, MaterialIcons } from '@expo/vector-icons';
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
        <LocationBox
          lang={'en'}
          family={family}
          ionicons={Ionicons}
          entypo={Entypo}
          materialIcons={MaterialIcons}
          status={item.status} // 0: not sent, 1: sent, 2: received, 3:read
          text={item.data && item.data.address && item.data.address}
          date={item.date}
          sender={true}
          options={['Option 1', 'Option 2']}
          onSelectOption={() => {}}
          location_type={item.data && item.data.location_type}
        />
      )}
    />
  )
}
```

## Features
- A component to display selected location in a chat text box

## props

Below are the listed props that can be passed to the LocationBox

| Property | Type | Required | Description |
| ------ | ------ | ------ | ------ |
| `options` | `array` | `false` | Options displayed on long press of the chat text box. |
| `cancetTxt` | `string` | `false` | The string to replace the cancel text. Defaults to `Cancel` |
| `ionicons` | `@expo/vector-icons` | `true` | It takes in ionicons component to display icons in the component |
| `entypo` | `@expo/vector-icons` | `true` | It takes in entypo component to display icons in the component |
| `materialIcons` | `@expo/vector-icons` | `true` | It takes in materialIcons component to display icons in the component |
| `family` | `object` | `true` | An object containing the app font family, example above |
| `onSelectOption` | `function` | `false` | The function returns the index of the selected option as parameter. |
| `sender` | `boolean` | `true` | The boolean that denotes the sender of the message |
| `reply` | `object` | `false` | A message object passed to display the message replied to |
| `toReply` | `function` | `true` | The function that calls when the reply component in the chat box in tapped. |
| `text` | `string` | `false` | The text message displayed in the text box. |
| `date` | `Date` | `false` | A date object to be displayed in the text box. |
| `status` | `number` | `false` | The status of the current message 0 = sending(not send), 1 = sent, 2 = received, 3 = read. |
| `optionTitle` | `string` | `false` | The title of the displayed options, defaults to `Options` |
| `lang` | `string` | `false` | The language that should be used for the default text in the component. Defaults to `en`. |
| `location_type` | `string` | `false` | If it has `store` as it's value, it uses a store icon, otherwise it uses a location pin icon. |

## FleetFooter Component

```typescript
import { FleetFooter } from 'senderrand-shared-components';

const family = {
  light: 'Light',
  regular: 'Regular',
  medium: 'Medium',
  bold: 'Bold',
  italic: 'RegularItalic',
};

const Example = () => {

  return (
    <FleetFooter select={(index: number) => {}} />
  )
}
```

## Features
- A UI component that display the fleet options to selection

## props

Below are the listed props that can be passed to the FleetFooter

| Property | Type | Required | Description |
| ------ | ------ | ------ | ------ |
| `select` | `function` | `true` | The function called when a fleet is selected, returning the index of the selected fleet as parameter. |

## FleetBox Component

```typescript
import { FleetBox } from 'senderrand-shared-components';
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
        <FleetBox
          lang={'en'}
          date={item.date}
          index={1}
          sender={true}
          family={family}
          options={['Edit', 'Delete']}
          onSelectOption={() => {}}
        />
      )}
    />
  )
}
```

## Features
- A component to displays the selected fleet

## props

Below are the listed props that can be passed to the FleetBox

| Property | Type | Required | Description |
| ------ | ------ | ------ | ------ |
| `index` | `number` | `true` | The index of the selected fleet. |
| `options` | `array` | `false` | Options displayed on long press of the chat text box. |
| `cancetTxt` | `string` | `false` | The string to replace the cancel text. Defaults to `Cancel` |
| `family` | `object` | `true` | An object containing the app font family, example above |
| `onSelectOption` | `function` | `false` | The function returns the index of the selected option as parameter. |
| `sender` | `boolean` | `true` | The boolean that denotes the sender of the message |
| `date` | `Date` | `false` | A date object to be displayed in the FleetBox. |
| `status` | `number` | `false` | The status of the current message 0 = sending(not send), 1 = sent, 2 = received, 3 = read. |
| `optionTitle` | `string` | `false` | The title of the displayed options, defaults to `Options` |
| `lang` | `string` | `false` | The language that should be used for the default text in the component. Defaults to `en`. |

## StatusBox Component

```typescript
import { StatusBox } from 'senderrand-shared-components';
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
        <StatusBox
          family={family}
          text={item.text}
          color={item.data && item.data.color && item.data.color}
          loading={false}
        />
      )}
    />
  )
}
```

## Features
- A component to displays the errand status within the chat

## props

Below are the listed props that can be passed to the StatusBox

| Property | Type | Required | Description |
| ------ | ------ | ------ | ------ |
| `family` | `object` | `true` | An object containing the app font family, example above |
| `text` | `string` | `false` | The text to be displayed. |
| `color` | `string` | `false` | The text color |
| `loading` | `boolean` | `false` | Displays loading spinner when set to true. |

## NewRunner Component

```typescript
import { NewRunner } from 'senderrand-shared-components';
import { AntDesign } from '@expo/vector-icons';
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
        <NewRunner
          lang={'ar'}
          antDesign={AntDesign}
          family={family}
          text={'Runner YINKA joined the chat'}
          name={'Runner Yinka'}
          runs={'90+ Runs'}
          rate={4}
          image={
            'https://media.istockphoto.com/photos/portrait-of-a-girl-picture-id938709362?s=612x612'
          }
        />
      )}
    />
  )
}
```

## Features
- A component to displays the newly added runner

## props

Below are the listed props that can be passed to the NewRunner

| Property | Type | Required | Description |
| ------ | ------ | ------ | ------ |
| `family` | `object` | `true` | An object containing the app font family, example above |
| `text` | `string` | `false` | The status text to be displayed. |
| `name` | `string` | `false` | The name of the runner. |
| `lang` | `string` | `false` | The language that should be used for the default text in the component. Defaults to `en`. |
| `runs` | `string` | `false` | The amount of runs text. |
| `rate` | `number` | `false` | The runners rating ranges from 0 - 5. |
| `image` | `string` | `false` | Displays the image url passed as the runners photo. |
| `antDesign` | `@expo/vector-icons` | `true` | It takes in antDesign component to display icons in the component |


## InvoiceBox Component

```typescript
import { InvoiceBox } from 'senderrand-shared-components';
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
        <InvoiceBox
          lang={'ar'}
          txt1={item.text}
          txt2={item.text}
          txt3={item.text}
          date={item.date}
          family={family}
          invoiceID={item.id}
          price={'100 AED'}
        />
      )}
    />
  )
}
```

## Features
- An invoice UI component

## props

Below are the listed props that can be passed to the InvoiceBox

| Property | Type | Required | Description |
| ------ | ------ | ------ | ------ |
| `family` | `object` | `true` | An object containing the app font family, example above |
| `txt1` | `string` | `false` | Defaults to `Invoice`. |
| `txt2` | `string` | `false` | Defaults to `Grand Total:`. |
| `txt2` | `string` | `false` | Defaults to `View Invoice`. |
| `press` | `function` | `false` | The function called when the component is pressed. |
| `lang` | `string` | `false` | The language that should be used for the default text in the component. Defaults to `en`. |
| `invoiceID` | `string` | `false` | Displays the invoice ID passed to it. |
| `price` | `string` | `false` | Displays the string passed as price. |
| `date` | `Date` | `false` | A date object to be displayed in the InvoiceBox. |


## TrackBox Component

```typescript
import { TrackBox } from 'senderrand-shared-components';
import { Feather } from '@expo/vector-icons';
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
        <TrackBox
          lang={'en'}
          feather={Feather}
          text={item.text}
          date={item.date}
          family={family}
          region={item.data && item.data.region && item.data.region}
          position={item.data && item.data.position && item.data.position}
        />
      )}
    />
  )
}
```

## Features
- An location tracking UI component

## props

Below are the listed props that can be passed to the TrackBox

| Property | Type | Required | Description |
| ------ | ------ | ------ | ------ |
| `family` | `object` | `true` | An object containing the app font family, example above |
| `text` | `string` | `false` | Defaults to `Track Delivery`. |
| `press` | `function` | `false` | The function called when the component is pressed. |
| `lang` | `string` | `false` | The language that should be used for the default text in the component. Defaults to `en`. |
| `date` | `Date` | `false` | A date object to be displayed in the InvoiceBox. |
| `region` | `object` | `true` | An object containing longitude and latitude. |
| `position` | `object` | `true` | An object containing longitude and latitude. |
| `Feather` | `@expo/vector-icons` | `true` | It takes in Feather component to display icons in the component |


## SwipeUp Component

```typescript
import { SwipeUp } from 'senderrand-shared-components';

const Example = () => (
  <SwipeUp>
    // ... children
  </SwipeUp>
);

```

## Features
- An component for swiping up and down

## props

Below are the listed props that can be passed to the SwipeUp

| Property | Type | Required | Description |
| ------ | ------ | ------ | ------ |
| `containerHeight` | `number` | `false` | The default height of the swipe box. |
| `close` | `funciton` | `false` | Set swipe visibility to false when called. |
| `disableSwipe` | `boolean` | `false` | To disable the swipe up and down if it's not required. |
| `containerStyle` | `style` | `false` | Style passed to the container. |
| `avoid` | `boolean` | `false` | Add `avoid` prop if keyboard is present in the swipe children. |

## LoadingModal

```typescript
import { LoadingModal } from 'senderrand-shared-components';
import { useState } from 'react';

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
    <LoadingModal
      visible={loading}
      family={family}
      text={'Processing Payment..'}
    />
  )
}
```

## Features
- A modal to display loading UI

## props

Below are the listed props that can be passed to the loading component

| Property | Type | Required | Description |
| ------ | ------ | ------ | ------ |
| `text` | `string` | `false` | The value to the text displayed in the loader. |
| `visible` | `boolean` | `true` | Set the visibility of the modal to true or false |
| `family` | `object` | `true` | An object containing the app font family, example above |
| `close` | `function` | `false` | Toggle visibility to close modal when user taps the modal. |


## InvoiceModal

```typescript
import { InvoiceModal } from 'senderrand-shared-components';
import { useState } from 'react';

const family = {
  light: 'Light',
  regular: 'Regular',
  medium: 'Medium',
  bold: 'Bold',
  italic: 'RegularItalic',
};

const Example = () => {
  let [visible, setVisible] = useState(true)

  let invoice = [
    {
      item: 'Brake pads for Honda accord 2009 Front and Rear',
      quantity: 1,
      price: 200,
    },
    {
      item: 'Brake discs for Honda accord 2009. Front and Rear',
      quantity: 2,
      price: 400,
    },
    {
      item: 'Brake Oil',
      quantity: 2,
      price: 20,
    },
    {
      item: 'Errand cost',
      quantity: 1,
      price: 100,
    },
  ];

  let totals = [
    { title: 'SUBTOTAL', value: '720 NGN' },
    { title: 'DISCOUNT', value: '110 NGN', discount: '3%' },
    { title: 'TAX', value: '10 NGN' },
  ];

  return (
    <InvoiceModal
      lang={'en'}
      currency={'NGN'}
      visible={visible}
      family={family}
      totalItems={totals}
      items={invoice}
      nameKey={'item'}
      qtyKey={'quantity'}
      rateKey={'price'}
      grandTotal={'610 NGN'}
      txt2={"Runner's Name: YINKA"}
      txt3={'#12345673'}
      close={() => setInvoice(false)}
      press={(index: number) => console.log(index)}
    />
  )
}
```

## Features
- A modal to display invoice UI

## props

Below are the listed props that can be passed to the invoice component

| Property | Type | Required | Description |
| ------ | ------ | ------ | ------ |
| `lang` | `string` | `false` | The language that should be used for the default text in the component. Defaults to `en`. |
| `currency` | `string` | `true` | The currency to be displayed in the invoice. |
| `visible` | `boolean` | `true` | Set the visibility of the modal to true or false |
| `family` | `object` | `true` | An object containing the app font family, example above |
| `close` | `function` | `false` | Toggle visibility to close modal when user taps the modal. |
| `totalItems` | `array` | `true` | An array including the subtotal, discount, tax, etc. |
| `titles` | `array` | `false` | An array of string titles, defaults to `['DESCRIPTION', 'RATE', 'QTY', 'SUBTOTAL']`. |
| `txt1` | `string` | `false` | Defaults to `You’ve received an invoice`. |
| `txt2` | `string` | `false` | Defaults to `Runner`. |
| `txt3` | `string` | `false` | Invoice ID should be passed here. Empty if nothing is passed. |
| `nameKey` | `string` | `false` | The key of the item name within the invoice object. |
| `qtyKey` | `string` | `false` | The key of the quantity name within the invoice object. |
| `rateKey` | `string` | `false` | The key of the price within the invoice object. |
| `grandTotal` | `string` | `false` | The invoice total. |
| `grandTotalTxt` | `string` | `false` | Defaults to `GRAND TOTAL`. |
| `press` | `function` | `false` | When the press prop is passed, the accept and decline CTA button displays. It returns the index of the button pressed as parameter `1 for accept, 2 for decline`. |
| `acceptTxt` | `string` | `false` | Defaults to `Accept`. |
| `declineTxt` | `string` | `false` | Defaults to `Decline`. |

## ReasonSwipe Component

```typescript
import { ReasonSwipe } from 'senderrand-shared-components';
import { Ionicons } from '@expo/vector-icons';

let reasons = [
  { reason: 'Runner took too long to respond' },
  { reason: 'Wrong pickup location' },
  { reason: 'I don’t need the service anymore' },
  { reason: 'Have to attend to an Emergency' },
];

const Example = () => (
  <ReasonSwipe
    lang={'en'}
    ionicons={Ionicons}
    family={family}
    data={reasons}
    textKey={'reason'}
    onSend={(item) => console.log(item)}
    onSelect={(item) => console.log(item)}
  />
);

```

## Features
- A component for displaying the array of reasons

## props

Below are the listed props that can be passed to the ReasonSwipe

| Property | Type | Required | Description |
| ------ | ------ | ------ | ------ |
| `lang` | `string` | `false` | The language that should be used for the default text in the component. Defaults to `en`. |
| `data` | `array` | `true` | An array or reasons passed to the component, example above. |
| `onSelect` | `funciton` | `true` | The function called when a reason is selected returning she selected reason as parameter. |
| `textKey` | `string` | `true` | The key to the reason string in the object. |
| `othersTxt` | `string` | `false` | Defaults to `Others:`. |
| `onSend` | `function` | `true` | The function returns the custom reason entered in the input field. |
| `family` | `object` | `true` | An object containing the app font family, example above |
| `ionicons` | `@expo/vector-icons` | `true` | It takes in Ionicons component to display icons in the component |

## LocationSwipe Component

```typescript
import { LocationSwipe } from 'senderrand-shared-components';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

let locations = [
  {
    distance: '1.3km',
    timing: 'Deira',
    address: 'Dubai Deira International Market',
  },
  {
    distance: '400m',
    timing: '10am - 10:30pm',
    status: 1,
    address: 'Auto Pro, Silicon Oasis, Dubai',
  },
  {
    distance: '2km',
    timing: '10am - 2:30pm',
    status: 2,
    address: 'Zoom Enoc, Silicon Oasis, Dubai',
  },
];

const Example = () => (
  <LocationSwipe
    lang={'en'}
    family={family}
    data={locations}
    ionicons={Ionicons}
    materialIcons={MaterialIcons}
    onSelect={(item) => console.log(item)}
  />
);

```

## Features
- A component displaying locations

## props

Below are the listed props that can be passed to the LocationSwipe

| Property | Type | Required | Description |
| ------ | ------ | ------ | ------ |
| `lang` | `string` | `false` | The language that should be used for the default text in the component. Defaults to `en`. |
| `data` | `array` | `true` | An array or locations passed to the component, example above. |
| `onSelect` | `funciton` | `true` | The function called when a location is selected returning she selected location as parameter. |
| `chooseTxt` | `string` | `false` | Defaults to `Choose from Map`. |
| `savedTxt` | `string` | `false` | Defaults to `Saved Locations`. |
| `onPressSaved` | `function` | `true` | The function called when saved location is tapped. |
| `onPressChoose` | `function` | `true` | The function called when choose from map is tapped. |
| `family` | `object` | `true` | An object containing the app font family, example above |
| `ionicons` | `@expo/vector-icons` | `true` | It takes in Ionicons component to display icons in the component |
| `materialIcons` | `@expo/vector-icons` | `true` | It takes in MaterialIcons component to display icons in the component |

## Exported Libraries

* react-native-webview
* react-native-remote-svg
* expo-asset
* expo-av
* expo-constants
* expo-document-picker
* expo-file-system
* expo-font
* expo-image-manipulator
* expo-image-picker
* moment
* react-native-actionsheet
* react-native-animatable
* react-native-maps
* react-native-size-matters
* react-native-sliders
* react-native-svg
* react-native-zigzag-lines
* react-swipeable-views-native
* styled-components
## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
