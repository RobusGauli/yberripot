import React , { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Platform, 
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { font, colors as nativeColors } from '../../utils';

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

class ItemCategory extends Component {
  constructor() {
    super();
    this.state = {
      showItems: false,
      anyItemSelected: false,
      totalItems: 0,
    };
    this.itemQuantity = {};
    
  }

  _onPress = () => {
    const { index, onCategoryPress, activeIndex } = this.props;
    onCategoryPress(index);
    
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (activeIndex === index) {
      // this.setState({
      //   showItems: !this.state.showItems,
      // });
    }
    
  }

  onItemPress = (value, itemName) => {
    this.itemQuantity[itemName] = value;
    const { onCategoryChange, name, index } = this.props;
    onCategoryChange(name, index)(this.itemQuantity);
    this.setState({
      anyItemSelected: Object.values(this.itemQuantity).map(val => val >= 1).includes(true),
      totalItems: Object.values(this.itemQuantity).reduce((acc, val) => val + acc, 0),
    });
  }

  render() {
    const { totalItems } = this.state;
    const {
      name,
      items,
      index,
      activeIndex,
      iconName,
    } = this.props;
    const itemsView = items.map((item, i) => <Item onItemPress={this.onItemPress} name={item} key={i} quantity={ this.itemQuantity[item] || 0 }/>);

    return (
      <View>
        <TouchableOpacity style={[styles.container, { backgroundColor: this.state.anyItemSelected ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0)'}]} onPress={this._onPress}>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ marginLeft: 10, width: 55, height: 55, alignItems: 'center' , justifyContent: 'center', backgroundColor: '#dfb820', borderRadius: 50}}>
              <Text style={{ fontSize: 26, fontFamily: 'Avenir-black' ,backgroundColor: 'rgba(0, 0, 0, 0)'}}>{index}</Text>
            </View>
            <View style={{marginLeft: 30}} />
            <TouchableOpacity style={{ flexDirection: 'row'}} >
              <Text style={{ color: 'white', fontFamily: 'Avenir-black', fontSize: 22 }}>{`${name}`}</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginRight: 10 }}>
            <Text style={{ color: 'rgba(255, 255, 255, 0.5)', fontFamily: 'Avenir-black', fontSize: 28 }} > {`${totalItems && totalItems} `} </Text>
          </View>
        </TouchableOpacity>
        {/* {activeIndex.isopen && activeIndex.index === index ? itemsView : null} */}
        {itemsView}
      </View>
    );
  }
}

class Item extends React.Component {

  constructor() {
    super();
    this.state = {
      quantity: 0,
    };
  }
  
  componentWillMount = () => {
    const { quantity } = this.props;
    this.setState({
      quantity,
    });
  }

  _onPress = (value) => {
    const { onItemPress, name, iconName } = this.props;
    //call the props
    

    switch (value) {
      case 'LEFT':
        if (this.state.quantity > 0) {
          this.setState({
            quantity: this.state.quantity - 1,
          });
          onItemPress(this.state.quantity - 1, name);
        }
        
        break;
      case 'RIGHT':
        if (this.state.quantity < 1000) {
          this.setState({
            quantity: this.state.quantity + 1,
          });
          onItemPress(this.state.quantity + 1, name);
        }
        break;
      default:
        break;
    }
  }

  render() {
    const {
      name,
    } = this.props;
    const {
      quantity,
    } = this.state;
    return (
      <View style={styles.itemContainer}>
        <Text style={{ fontSize: 22, fontFamily: font, color: nativeColors.yellow, fontWeight: '700' }}>{name}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity style={{ padding: 20 }} onPress={() => this._onPress('LEFT')}>
            <Icon name='chevron-circle-down' size={20} color={this.state.quantity <= 0 ? '#BDBDBD' : colors.primary} />
          </TouchableOpacity>
          <Text style={{ fontSize: 22, fontFamily: font , color: nativeColors.yellow}}>
            { quantity }
          </Text>
          <TouchableOpacity style={{padding: 20}} onPress={() => this._onPress('RIGHT')}>
            <Icon name='chevron-circle-up' size={20} color={colors.primary}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    backgroundColor: 'rgba(255, 255, 255, 0)',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.1,
    borderColor: '#26C6DA',
    
  },
  itemContainer: {
    height: 40,
    justifyContent: 'space-between',
    
    backgroundColor: 'rgba(255, 255, 255, 0)',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 10,
    marginTop: 3,
    marginBottom: 3,
    borderRadius: 20,
    shadowOffset: { width: 3, height: 3 },
    shadowColor: 'black',
    shadowOpacity: 0.1,
  },
});

export {
  ItemCategory,
};