import Moment from 'moment';
import Languages from './language';
import { Appearance } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

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

  mediaPicker = async (type: string, options?: any) => {
    // Type options: 'camera', 'library', 'document'
    switch (type) {
      case 'camera':
        const { status } = await ImagePicker.getCameraPermissionsAsync();
        if (status === 'granted') return this.launchMedia(type, options);
        else {
          let res = await ImagePicker.requestCameraPermissionsAsync();
          if (res.status === 'granted') return this.launchMedia(type, options);
          else return { error: true, status: res.status, message };
        }
      case 'library':
        const res = await ImagePicker.getMediaLibraryPermissionsAsync();
        if (res.status === 'granted') return this.launchMedia(type, options);
        else {
          let res2 = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (res2.status === 'granted') return this.launchMedia(type, options);
          else return { error: true, status: res.status, message };
        }
      case 'document':
        return await DocumentPicker.getDocumentAsync(options);
      default:
        return { error: true, status: '', message: 'Invalid Option' };
    }
  };

  launchMedia = async (type: string, options?: any) => {
    let opt = options ? { ...options } : {};
    let img: any =
      type === 'camera'
        ? await ImagePicker.launchCameraAsync({ quality: 0.0, ...opt })
        : await ImagePicker.launchImageLibraryAsync({
            quality: 0.0,
            ...opt,
          });
    if (img.cancelled || img.type !== 'image') return img;
    else {
      let result = await manipulateAsync(
        img.uri,
        [{ resize: { width: img.width / 2, height: img.height / 2 } }],
        {
          compress: 0.0,
          format: SaveFormat.JPEG,
        }
      );
      return { ...img, ...result };
    }
  };

  formatFile = (file: any) => {
    let filename = file.uri.split('/').pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match
      ? `${getFileType(match[1])}/${match[1]}`
      : file.type
      ? file.type
      : 'file';
    return { uri: file.uri, name: filename, type };
  };

  getDate = (date: Date) => {
    if (new Date(date).toDateString() === new Date().toDateString()) {
      return `${Moment(new Date(date)).format('h:mm a')}`;
    } else return Moment(new Date(date)).calendar();
  };

  millisToTime = (millis: number, addition?: number) => {
    let minutes = Math.floor(millis / 60000);
    let seconds: number = Number(((millis % 60000) / 1000).toFixed(0));
    if (addition) seconds = parseInt(String(seconds), 10) + addition;
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  };

  t = (word: string, lang: string) => {
    let languageData = Languages[lang] || Languages.en;
    return languageData[word] ? languageData[word] : '';
  };

  t2 = (word: string, lang: string, options?: string[]) => {
    let languageData = Languages[lang] || Languages.en;
    if (languageData[word] && typeof languageData[word] === 'function') {
      return languageData[word](options);
    } else return '';
  };
}

let message =
  'Permission is required to be granted to access camera of photo library, go to settings to grant permission.';

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
  chatBoxTwo: '#0a78a1',
  chatBoxTwoDark: '#0a78a1',
};

let getFileType = (type: string) => {
  switch (type) {
    case 'pdf':
      return 'application';
    case 'doc':
      return 'application';
    case 'docx':
      return 'application';
    default:
      return 'image';
  }
};

export default new Helper();
