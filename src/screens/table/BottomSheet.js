import React from 'react';
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const OptionText = ({name, onPress, index }) => (
  <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
    <Text style={[styles.text, {color: index % 2 === 0 ? '#7947FF' : 'white'}]}> {name} </Text>
  </TouchableOpacity>
);
class BottomSheet extends React.Component {
  render() {
    const {
      options,
      onPress,
      hide,
      onClosePress,
    } = this.props;
    const optionView = options.map((name, index) =>
      (<View key={index}>
        <OptionText name={name} key={index} onPress={() => onPress(name)} index={index} />
        {(index !== options.length - 1) && 
          <View>
          <View style={{height: 0.2, backgroundColor: 'rgba(255, 255, 255, 0.4)', }} />
          </View>
        }  
      </View>),
    );
    return (
      <Modal
        transparent
        animationType={'slide'}
        visible={!hide}
         >
         <View style={{backgroundColor: 'rgba(0, 0, 0, 00)', flex: 1,  alignItems: 'stretch', justifyContent: 'flex-end'}}>
          <View style={{backgroundColor: 'rgba(0, 0, 0, 0.8)'}}>
          <TouchableOpacity style={{alignItems: 'flex-end', paddingTop: 10, paddingRight: 20}} onPress={onClosePress}>
           <Icon name='close' size={40} color='#dfb820' style={{paddingLeft: 30}}/>
          </TouchableOpacity>
           <View style={{justifyContent: 'center', alignItems: 'center'}}>
           {optionView}
           </View>
          </View>
          </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'Avenir-black',
  },
  buttonContainer: {
    height: 60,
  }
});

export default BottomSheet;