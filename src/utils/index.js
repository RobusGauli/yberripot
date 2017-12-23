import {
  Platform,
} from 'react-native';

export const colors = {
  yellow: '#dfb820',
  lightBlue: '#7947FF',
};
export const font = Platform.OS === 'ios' ? 'Avenir-black' : 'Roboto';
export * from './navigationhelper';