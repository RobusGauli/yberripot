import LinearGradient from 'react-native-linear-gradient';
import React from 'react';

const ViewContainer = ({ style, children }) => (
  <LinearGradient colors={['#0F213C', '#193154']} style={[{ flex: 1 }, style]}>
    {children}
  </LinearGradient>
);

export {
  ViewContainer,
};
