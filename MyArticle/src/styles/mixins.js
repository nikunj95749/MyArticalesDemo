import { Dimensions, PixelRatio } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const WINDOW_WIDTH = Dimensions.get('window').width;
export const WINDOW_HEIGHT = Dimensions.get('window').height;
export const IMAGE_ASPECT_RATIO = 16 / 9;
const GUIDELINE_BASE_WIDTH = 375;
const INCREASE_FONT_SIZE_BY_PERCENTAGE = 1.15; // 15%

export const scaleSize = size => (WINDOW_WIDTH / GUIDELINE_BASE_WIDTH) * size;

export const responsiveScale = fontSize =>
  RFValue(fontSize * INCREASE_FONT_SIZE_BY_PERCENTAGE, WINDOW_WIDTH);

export const scaleFont = size =>
  size * INCREASE_FONT_SIZE_BY_PERCENTAGE * PixelRatio.getFontScale();

function dimensions(top, right = top, bottom = top, left = right, property) {
  const styles = {};

  styles[`${property}Top`] = top;
  styles[`${property}Right`] = right;
  styles[`${property}Bottom`] = bottom;
  styles[`${property}Left`] = left;

  return styles;
}

export function margin(top, right, bottom, left) {
  return dimensions(top, right, bottom, left, 'margin');
}

export function padding(top, right, bottom, left) {
  return dimensions(top, right, bottom, left, 'padding');
}

export function boxShadow(
  offset = { height: 2, width: 2 },
  opacity = 0.2,
  radius = 8,
  color,
) {
  return {
    shadowOffset: offset,
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: radius,
    shadowColor: color,
  };
}

export function centerVertical(blockHeight) {
  return WINDOW_HEIGHT / 2 - blockHeight / 2;
}
