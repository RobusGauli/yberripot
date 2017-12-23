import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import { colors, font } from '../../utils';

export default class DrawerContent extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          Hi this is atext from t DrawerContent
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.yellow,
  }
});
