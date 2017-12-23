import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Interactable from 'react-native-interactable';

const colors = {
  primary: '#4aa7f1',
  secondary: '#d6dae7',
  textPrimary: 'white',
  textSecondary: '#4aa7f1',
  textLight: 'white',
  lightBackground: '#ebf1f8',
  backgroundColor: Platform.OS === 'ios' ? 'white' : '#ebf1f8',
  cardColor: Platform.OS === 'ios' ? 'white' : '#ebf1f8',
  lightBrown: '#F0F0F1',
};

const shadow = {

  shadowOffset: { width: 10, height: 10 },
  shadowColor: 'rgba(0, 0, 0, 0.5)',
  shadowOpacity: 0.1,
  shadowRadius: 5, 
  
};


const font = {
  larger: Platform.OS === 'ios' ? 30 : 25,
  large: Platform.OS === 'ios' ? 20 : 16,
  regular: Platform.OS === 'ios' ? 18 : 14,
  small: 12,
  family: Platform.OS == 'ios' ? 'ChalkboardSE-Regular' : 'Roboto',
};

const animate = () => {
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
};

const BillTitle = () => (
  <View style={styles.billTitleContainer}>
    <View style={{flex: 1.2, justifyContent: 'center', alignItems: 'flex-start'}}>
    <Text style={[styles.billTitleText, {fontSize: 15, flex: 1}]}>Item</Text>
    </View>
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-start', }}>
    <Text style={[styles.billTitleText, {fontSize: 15, flex: 1}]}>UnitPrice</Text>
    </View>
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-start', }}>
    <Text style={[styles.billTitleText, {fontSize: 15, flex: 1}]}>Quantity</Text>
    </View>
    
    <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'flex-start', }}>
    <Text style={[styles.billTitleText, {fontSize: 15, flex: 1}]}>Total</Text>
    </View>
    
  </View>
);

const BillItem = ({ name, quantity, totalPrice, unitPrice }) => (
  <View style={styles.itemContainer}>
        <View style={{flex: 1.2, justifyContent: 'center', alignItems: 'flex-start'}}>
        <Text style={[styles.billTitleText, {fontSize: 15, flex: 1}]}>{name}</Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-start', }}>
        <Text style={[styles.billTitleText, {fontSize: 15, flex: 1}]}>{unitPrice}</Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-start', }}>
        <Text style={[styles.billTitleText, {fontSize: 15, flex: 1}]}>{totalPrice}</Text>
        </View>
        
        <View style={{flex: 0.3, justifyContent: 'center', alignItems: 'flex-start', }}>
        <Text style={[styles.billTitleText, {fontSize: 15, flex: 1}]}>{quantity}</Text>
        </View>
        
        
      </View>
)
class Table extends React.Component {

  constructor() {
    super();
    this.state = {
      showPrice: false,
      showBill: false,
    };
    this.onDownPress = this.onDownPress.bind(this);
  }

  onDownPress() {
    animate();
    this.setState({ showBill: !this.state.showBill });
  }
  
  renderBill(orderData) {
    if (!orderData) {
      return (
        <View>
          <Text> No Bill FOund </Text>
        </View>
      );
    }
    const billItemView = Object.entries(orderData).map(([name, data], index) =>
      <BillItem name={name}
        quantity={data.quantity}
        unitPrice={data.unitPrice}
        totalPrice={parseInt(data.quantity, 10) * parseFloat(data.unitPrice)}
        key={index}
      />,
    );

    return (

      <View style={styles.billContainer}>
        
        <BillTitle />
        <ScrollView>
        {billItemView}
        </ScrollView>
        
      </View>
    );
  }
  render() {
    const {
      showPrice,
    } = this.state;

    const {
      tableName,
      isBusy,
      totalOrders,
      fullFilledOrders,
      aboutTheCustomer,
      tableBusyPeriod,
      orderData,
      removeLastBlock,
      onPress,
    } = this.props;
    return (
      
      <View>
      <TouchableOpacity 
        style={[styles.container, { backgroundColor: isBusy ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 0)', ...shadow }]} 
        onPress={onPress && (() => onPress(tableName, { isBusy, totalOrders, fullFilledOrders, aboutTheCustomer, tableBusyPeriod, tableName, orderData }))}
      >

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{ marginLeft: 10, width: 55, height: 55, alignItems: 'center' , justifyContent: 'center', backgroundColor: '#dfb820', borderRadius: 50}}>
            <Text style={{ fontSize: 26, fontFamily: 'Avenir-black' ,backgroundColor: 'rgba(0, 0, 0, 0)'}}>{tableName}</Text>
        </View>
        <TouchableOpacity style={{paddingLeft: 25, flexDirection: 'row'}} onPress={onPress}>
          <View >
            <Text style={{ color: 'white', fontFamily: 'Avenir-black', fontSize: 19 }}>{`${totalOrders} Orders, ${aboutTheCustomer}`}</Text>
            <Text style={{ color: 'rgba(255, 255, 255, 0.5)', fontFamily: 'Avenir-black', fontSize: 13 }} > {`${tableBusyPeriod} `} </Text>
          </View>
        </TouchableOpacity>
        </View>
        <TouchableOpacity style={{padding: 10}} onPress={this.onDownPress}>
          <Icon name={this.state.showBill ? 'chevron-up' : 'chevron-down'}size={25} color='white'/>
        </TouchableOpacity>
        
      </TouchableOpacity>
      {this.state.showBill && this.renderBill(orderData)}
     </View>
    );
  }
}
Table.propTypes = {
  tableName: PropTypes.any,
  isBusy: PropTypes.bool.isRequired,
  totalOrders: PropTypes.number.isRequired,
  fullFilledOrders: PropTypes.string.isRequired,
  aboutTheCustomer: PropTypes.string.isRequired,
  tableBusyPeriod: PropTypes.string.isRequired,
  orderData: PropTypes.object,
  onPress: PropTypes.func,
  removeLastBlock: PropTypes.bool,
};

Table.defaultProps = {
  tableName: '1',
  isBusy: false,
  totalOrders: '0',
  fullFilledOrders: '0',
  aboutTheCustomer: 'Unknown Customer',
  tableBusyPeriod: '0 HOURS 0 MINUTE',
  removeLastBlock: false,
};

const MiniBox = ({ name, value }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',  }}>
      <Text style={{ fontSize: 14, fontWeight: '500', color: colors.textPrimary }}>{name}</Text>
      <View style={{ marginTop: 5 }} />
      <Text style={{ fontWeight: 'bold', color: colors.textPrimary }}>{value}</Text>
    </View>
  );
};

MiniBox.propTypes = {
  name: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const styles = StyleSheet.create({
  container: {
    minHeight: 90,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.1,
    borderColor: '#26C6DA',
  
    paddingRight: 20,
  },
  aboutCustomerText: {
    backgroundColor: colors.primary,
    color: 'white',
    paddingLeft: 5, 
    paddingRight: 5,
    paddingTop: 4,
    paddingBottom: 4,
  },
  busyText: {
    backgroundColor: 'black',
    color: 'white',
    fontWeight: 'bold',
    padding: 5,
  },
  timeText: {
    fontSize: font.small,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  tableText: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.primary,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  innerViewContainer: {
    minHeight: 90,
    backgroundColor: 'red',
    flex: 1,
    position: 'absolute',
  },
  billContainer: {
    height: 300,
    justifyContent: 'center',
    
  },
  billTitleContainer: {
    alignItems: 'flex-end',
    height: 50,
    justifyContent: 'flex-end',
    paddingTop: 18,
    paddingLeft: 18,
    paddingRight: 10,
    flexDirection: 'row',
    backgroundColor: 'rgba(223, 184, 32, 0.05)',

  },
  billTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
    
  },
  itemContainer: {
    height: 50,
    justifyContent: 'flex-end',
    padding: 15,
    flexDirection: 'row',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 1,
    marginBottom: 3,
    borderBottomWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    
  },
});

export { Table };
