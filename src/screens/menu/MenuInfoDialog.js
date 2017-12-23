import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const colors = {
  primary: '#4aa7f1',
  secondary: '#d6dae7',
  textPrimary: '#5d5f5e',
  textSecondary: '#4aa7f1',
  textLight: 'white',
  lightBackground: '#ebf1f8',
  backgroundColor: Platform.OS === 'ios' ? 'white' : '#ebf1f8',
  cardColor: Platform.OS === 'ios' ? 'white' : '#ebf1f8',
  lightBrown: '#F0F0F1',
};
/*
  props format data 
  {momo: 4, chowmis: 5, 'mams': 10}
*/

class MenuInfoDialog extends React.Component {
  constructor() {
    super();
    this.state = {
      _visible: true,
    };
  }
  onPress = () => {
    const { onClosePress } = this.props;
    onClosePress();
  }

  render() {
    const {
      visible,
      data,
    } = this.props;

    const itemViews = Object.entries(data).filter(val => val[1] > 0).map((val, index) => <Item name={val[0]} quantity={val[1]} key={index} />)
    const totalQuantity = Object.values(data).filter(val => /[\d]+/.exec(val) !== null).reduce((acc, val) => acc + parseInt(val, 10), 0);
    return (
       
        
        <Modal visible={visible} onDismiss={this.onDismiss} animationType='slide' transparent>
          <ScrollView style={styles.container}>
            <TouchableOpacity style={{ alignSelf: 'flex-end', marginRight: 20, }} onPress={this.onPress}>
              <Icon name='close' size={50} color={colors.textPrimary}/>
            </TouchableOpacity>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.title}> Food Order </Text>
            </View>
            <Item name='Food' quantity={'Qty.'} style={{backgroundColor: colors.primary, height: 70 }} textStyle={{ color: colors.textLight, fontSize: 20 }}/>
            {itemViews}
            <Item name={'Total Qty'} quantity={totalQuantity} style={{backgroundColor: colors.primary, height: 60, marginTop: 20 }} textStyle={{color: colors.textLight, fontSize: 20 }}/>
            <Item name={'Total Price'} quantity={'Rs.1003/.'} style={{backgroundColor: colors.primary, height: 60 }} textStyle={{color: colors.textLight, fontSize: 20 }}/>

          </ScrollView>
          </Modal>
    );
  }
}

MenuInfoDialog.defaultProps = {
  data: {},
  visible: false,
};


const Item = ({ name, quantity, style, textStyle }) => {
  return (
    <View style={[styles.itemContainer, style]}>
      <Text style={[styles.itemText, textStyle] }>
        {name}
      </Text>
      <Text style={[styles.itemText, textStyle]}>
        {quantity}
      </Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {

    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    flex: 1,
    paddingTop: 30,
    
  },
  itemContainer: {
    height: 50, 
    justifyContent: 'space-between',
    paddingLeft: 30,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 3,
    marginBottom: 3,    
    borderRadius: 20,
    shadowOffset:{  width: 3,  height: 3,  },
    shadowColor: 'black',
    shadowOpacity: 0.2,    
    paddingRight: 20

  },
  title: {
    fontSize: 30,
    fontFamily: Platform.OS === 'ios' ? 'ChalkboardSE-Regular' : 'Roboto',
    marginBottom: 20,
    color: colors.textPrimary,
    fontWeight: 'bold',
  },
  itemText: {
    fontSize: 20, 
    marginRight: 20,
    fontFamily: Platform.OS === 'ios' ? 'ChalkboardSE-Regular' : 'Roboto',
    color: colors.textPrimary,
  },
});


export {
  MenuInfoDialog,
};