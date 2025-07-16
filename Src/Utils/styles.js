import {StyleSheet, Platform} from 'react-native';
import colors from './colors';
import fonts from './fonts';
import metrics from './metrics';
import RenderHtml, {defaultSystemFonts} from 'react-native-render-html';
const systemFonts = [...defaultSystemFonts, fonts.Rubik_Regular];

const styles = StyleSheet.create({
  html_fontCenter: {
    body: {
      color: colors.black,
      lineHeight: 24,
      fontWeight: 'bold',
      width: '100%',
      //   textAlign: 'center',
    },
  },
});

export default styles;
