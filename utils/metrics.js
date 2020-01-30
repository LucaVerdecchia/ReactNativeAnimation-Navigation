import {Dimensions} from 'react-native';

export const screenHeight = Math.round(Dimensions.get('window').height);
export const screenWidth = Math.round(Dimensions.get('window').width);

export function calcPerc(percentage) {
  return screenHeight * (percentage / 100);
}
