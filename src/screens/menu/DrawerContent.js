import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Interactable from 'react-native-interactable';
import { colors, font } from '../../utils';

const BillTitle = () => (
  <View style={styles.billTitleContainer}>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
    <Text style={[styles.billTitleText, {fontSize: 15 }]}>Item</Text>
    </View>
    
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
    <Text style={[styles.billTitleText, {fontSize: 15 }]}>Qty.</Text>
    </View>
    
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-start', }}>
    <Text style={[styles.billTitleText, {fontSize: 15 }]}>Total</Text>
    </View>
    
  </View>
);

const BillItem = ({item, quantity, total, onDeletePress}) => (
  <View>
    <View style={{position: 'absolute', justifyContent: 'center', bottom: 0,  width: '100%', alignItems: 'flex-end'}}>
      <TouchableOpacity style={{backgroundColor: 'rgba(255, 0, 0, 0.5)', paddingLeft: 20, paddingRight: 20, paddingTop: 5, paddingBottom :5}}
        onPress={onDeletePress}
      >
      <Icon name='times' size={30} color={'rgba(244, 255, 255, 0.6)'}/>
      </TouchableOpacity>
    </View>
    
  <Interactable.View 
    style={[styles.billTitleContainer, {backgroundColor: colors.yellow, borderBottomWidth: 0.2}]}
    horizontalOnly
    snapPoints={[{x: 0}, {x: -100}]}
    boundaries={{left: -70, right: 50, bounce: 0.1}}
  >

    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
    <Text style={[styles.billTitleText, {fontSize: 15 }]}>{item || 'N/A'}</Text>
    </View>
    
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
    <Text style={[styles.billTitleText, {fontSize: 15 }]}>{quantity || 'N/A'}</Text>
    </View>
    
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-start', }}>
    <Text style={[styles.billTitleText, {fontSize: 15 }]}>{total || 'N/A'}</Text>
    
    </View>

    
  </Interactable.View>
  
  </View>
);
export default class DrawerContent extends React.Component {

  
  componentWillMount = () => {
   //
  }
  onDeletePress = (i) => {
    this.setState({
      data: Object.entries(this.state.data).filter((val, index) => val[1] > 0 && index !== i)
    });
  }

  render() {
    //onDeletePress as a props;
    const { data } = this.props;
    const itemViews = Object.entries(data).filter(val => val[1] > 0).map((val, index) => <BillItem item={val[0]} quantity={val[1]} key={index} index={index} onDeletePress={() => this.props.onDeletePress(index)}/>);
    return (
      <ScrollView style={styles.container}>
          <View>
            <Text style={{fontSize: 35, fontFamily: font, paddingLeft: 20 }}>
              New Order
            </Text>
            <Text style={{fontSize: 15, fontFamily: font, paddingLeft: 20, color: 'rgba(0, 0, 0, 0.6)', marginBottom: 25 }}>
              Table 35
            </Text>
            
          </View>
        
          <BillTitle />
          {itemViews}
        
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.yellow,
    paddingTop: 35,
    
  },
  billTitleContainer: {
    
    height: 50,
    paddingTop: 18,
    paddingLeft: 18,
    paddingRight: 10,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',

  },
  billTitleText: {
    fontSize: 24,
    color: 'black',
    flex: 1,
    fontFamily: font,
    
  },
});
