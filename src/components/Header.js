import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../utils/index';

const Header = ({ onPress, title, rightIcon, onRightIconPress }) => (
  <View style={{ height: 100, backgroundColor: colors.lightBlue, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingRight: 20, paddingLeft: 10 }} >
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <TouchableOpacity onPress={onPress}>
        <Icon name='chevron-left' size={50} color={colors.yellow}/>
      </TouchableOpacity>
      <View style={{marginLeft: 15}} />
      <Text style={{fontSize: 40, color: 'white', backgroundColor: 'rgba(0, 0, 0, 0)', fontFamily: 'Avenir-black'}}>{title}</Text>
    </View>
    <TouchableOpacity onPress={onRightIconPress}>
      <Icon name= {rightIcon || 'ellipsis-v'} size={55} color={'white'} />
    </TouchableOpacity>
</View>
);

export { Header };
