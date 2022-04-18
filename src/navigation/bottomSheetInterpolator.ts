import {StackCardInterpolationProps, CardStyleInterpolators} from '@react-navigation/stack';

export const bottomSheetInterpolator = (props: StackCardInterpolationProps) => {
  const {current: {progress}} = props;
  const {cardStyle} = CardStyleInterpolators.forVerticalIOS(props)
  return {
    cardStyle,
    overlayStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.5],
        extrapolate: 'clamp',
      }),
    },
  };          
}