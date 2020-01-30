import {Dimensions} from 'react-native';
import SafeArea from 'react-native-safe-area';

export const screenHeight = Math.round(Dimensions.get('window').height);
export const screenWidth = Math.round(Dimensions.get('window').width);
export let notchHeight = 0;

export function calcPerc(percentage) {
  return screenHeight * (percentage / 100);
}

(async () => {
  await SafeArea.getSafeAreaInsetsForRootView().then(result => {
    notchHeight = result.safeAreaInsets.top;
  });
})();
