import { Appearance } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import * as DocumentPicker from 'expo-document-picker'

class Helper {
  public lang: string;
  public token: string | undefined | null;
  public toastError = {};

  constructor() {
    this.lang = 'en';
  }

  getColor = () => {
    let dark = Appearance.getColorScheme() === 'dark';
    return {
      primary: dark ? colors.primaryDark : colors.primary,
      primaryView: dark ? colors.primaryDark : colors.primary,
      plane: dark ? colors.planeDark : colors.plane,
      primaryTxt: dark ? colors.primaryTextDark : colors.primaryText,
      secondaryTxt: dark ? colors.secondaryTxtDark : colors.secondaryTxt,
      background: dark ? colors.backgroundDark : colors.background,
      chatBoxOne: dark ? colors.chatBoxOneDark : colors.chatBoxOne,
      chatBoxTwo: dark ? colors.chatBoxTwoDark : colors.chatBoxTwo,
    };
  };

  // mediaPicker = async (type: string, options?: any) => {
  //   // Type options: 'camera', 'library', 'document'
  //   switch (type) {
  //     case 'camera':
  //       const { status } = await ImagePicker.getCameraPermissionsAsync();
  //       if (status === 'granted') return this.launchMedia(type, options);
  //       else {
  //         let res = await ImagePicker.requestCameraPermissionsAsync();
  //         if (res.status === 'granted') return this.launchMedia(type, options);
  //         else return { error: true, status: res.status };
  //       }
  //     case 'library':
  //       const res = await ImagePicker.getMediaLibraryPermissionsAsync();
  //       if (res.status === 'granted') return this.launchMedia('library');
  //       else {
  //         let res2 = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //         if (res2.status === 'granted') return this.launchMedia('library');
  //         else return { error: true, status: res.status };
  //       }
  //     case 'document':
  //       return await DocumentPicker.getDocumentAsync(options);
  //   }
  // };

  // launchMedia = async (type: string, options?: any) => {
  //   return type === 'camera'
  //     ? await ImagePicker.launchCameraAsync({ quality: 0, ...options })
  //     : await ImagePicker.launchImageLibraryAsync({ quality: 0, ...options });
  // };
  //
  // formatFile = (file: any) => {
  //   let filename = file.uri.split('/').pop();
  //   let match = /\.(\w+)$/.exec(filename);
  //   let type = match
  //     ? `${file.type ? file.type : ''}${match[1]}`
  //     : file.type
  //     ? file.type
  //     : 'file';
  //   return { uri: file.uri, name: filename, type };
  // };
}

export const colors = {
  primary: '#3BAFDA',
  primaryDark: '#0a78a1',
  plane: '#fff',
  planeDark: 'rgb(23,23,23)',
  primaryText: '#3C4656',
  primaryTextDark: '#fff',
  secondaryTxt: '#77869E',
  secondaryTxtDark: 'rgba(255,255,255,0.8)',
  background: '#F2F5F7',
  backgroundDark: 'rgb(2,2,2)',
  chatBoxOne: '#E4E8EB',
  chatBoxOneDark: '#3c3b3d',
  chatBoxTwo: '#69C2E3',
  chatBoxTwoDark: '#0a78a1',
};

export default new Helper();
