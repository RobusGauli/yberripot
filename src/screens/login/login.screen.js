import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ViewContainer } from '../../components/ViewContainer';

class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  onLoginPress() {
    alert('hi this is pressed');
  }
  render() {
    return (
      <ViewContainer>
        <View style={styles.titleContainer}>
          <Text style={styles.loginText}><Icon name='ios-cafe' size={40} color='#DFB820'/> LOGIN</Text>
        </View>

        <View style={styles.inputsContainer}>
          <View style={{alignItems: 'center', marginBottom: 10}}>
            <Text style={{backgroundColor: 'rgba(0, 0, 0, 0)', color: '#DFB820', fontSize: 15, fontWeight: 'bold'}}> Please login to yberri </Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput style={{height: 50, width: '80%', color: 'white', fontSize: 20}} 
              placeholder={'username'} 
              placeholderTextColor='rgba(255, 255, 255, 0.6)'
              underlineColorAndroid='rgba(0, 0, 0, 0)'
            />
            <Icon name='md-flame' size={30} color='#DFB820'/>
          </View>
          <View style={{marginTop: 10}} />
          <View style={styles.inputContainer}> 
            <TextInput placeholder={'password'} 
              style={{height: 50, width : '80%', color: 'white', fontSize: 20}} 
              secureTextEntry 
              placeholderTextColor='rgba(255, 255, 255, 0.6)'
              underlineColorAndroid='rgba(0, 0, 0, 0)'
            />
            <Icon name='md-lock' size={30} color='#DFB820'/>
          </View>
          <TouchableOpacity style={[styles.inputContainer, {backgroundColor: '#dfb820', justifyContent: 'center' , paddingLeft: 0, marginTop: 15, paddingRight: 0 }]}
            onPress={this.onLoginPress}
          >
            <Text style={{fontSize: 25, fontFamily: 'Avenir-Black',}}> Login </Text>
          </TouchableOpacity>        
        </View>
        
        
      </ViewContainer>
    );
  }
}

const shadow = {
  shadowOffset: { width: 5, height: 5 },
  shadowColor: 'rgba(0, 0, 0, 0.01)',
  shadowOpacity: 1,
};

const styles = StyleSheet.create({
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '30%',
  },
  loginText: {
    fontSize: 50,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    color: 'white',
    fontFamily: 'Avenir-Black',
  },
  inputsContainer: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    borderColor: 'white',
    backgroundColor: '#7947FF',
    borderRadius: 20,
    height: 50,
    paddingLeft: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: 20,
    ...shadow,

  }
});
export {
  LoginScreen,
};

