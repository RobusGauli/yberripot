import React , { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Platform,
  TextInput,
  LayoutAnimation,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Header } from '../../components/Header';
import { ViewContainer } from '../../components/ViewContainer';
import { ItemCategories } from './ItemCategories';
import { MenuInfoDialog } from './MenuInfoDialog';
import { colors as nativeColors, back, font } from '../../utils/index';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Drawer from 'react-native-drawer';
import DrawerContent from './DrawerContent';

const shadow = {
  shadowOffset: { width: 5, height: 5 },
  shadowColor: 'rgba(0, 0, 0, 0.3)',
  shadowOpacity: 1,
};

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

const DATA = [
  {
    name: 'Veg',
    items: ['Momo', 'Chowmein', 'Helink'],
  },
  {
    name: 'BreakFast',
    items: ['Sanswhi', 'Butter', 'Curry'],
  },
  {
    name: 'Holla',
    items: ['Makai', 'Pizza', 'Pizzerai'],
  },
  {
    name: 'Veg',
    items: ['Momo', 'Chowmein', 'Helink'],
  },
  {
    name: 'BreakFast',
    items: ['Sanswhi', 'Butter', 'Curry'],
  },
  {
    name: 'Holla',
    items: ['Makai', 'Pizza', 'Pizzerai'],
  },
  {
    name: 'Veg',
    items: ['Momo', 'Chowmein', 'Helink'],
  },
  {
    name: 'BreakFast',
    items: ['Sanswhi', 'Butter', 'Curry'],
  },
  {
    name: 'Holla',
    items: ['Makai', 'Pizza', 'Pizzerai'],
  },
  {
    name: 'Veg',
    items: ['Momo', 'Chowmein', 'Helink'],
  },
  {
    name: 'BreakFast',
    items: ['Sanswhi', 'Butter', 'Curry'],
  },
  {
    name: 'Holla',
    items: ['Makai', 'Pizza', 'Pizzerai'],
  },
];

//create a object withe item as a key and the value being its category
const objectFromArrayWithKey = (key, array) =>  
  array.reduce((acc, val) =>
    ({ ...acc, [val] : key }), {});

const searchableData = DATA.reduce((acc, val) =>
  ({ ...acc, ...objectFromArrayWithKey(val.name, val.items)}), {});

console.log(searchableData);
class MenuScreen extends Component {

  static navigationOptions = {
    title: 'Food Category',
    headerRight: <Icon name={'shopping-cart'} size={30} style={{ marginRight: 20, padding: 20, }} />,
  }

  static counter = (obj) => {
    return Object.values(obj).reduce((acc, val) => acc + val, 0);
  }

  constructor() {
    super();
    this.state = {
      totalCount: 0,
      dialogVisible: false,
      dataToDialog: {},
      data: DATA,
      openDrawer: false,

    };
    this.categoriesData = {};
  }

  onCategoryChange = name => (data) => {
    this.categoriesData[name] = data;
    this.setState({
      totalCount: Object.values(this.categoriesData).reduce((acc, val) => acc + MenuScreen.counter(val), 0),
    });
  };

  _onPress = () => {
    const navigateAction = NavigationActions.navigate({
      routeName: 'BillScreen',
    });
    this.props.navigation.dispatch(navigateAction);
  }

  _onFabLongPress = () => {
    this.setState({
      dialogVisible: true,
      dataToDialog: Object.values(this.categoriesData).reduce((acc, val) => ({ ...acc, ...val }), {}),
    });
  }
  _onDialogClosePress = () => {
    this.setState({
      dialogVisible: false,
    })
  }

  onBackPress = () => {
    //alert('as');
    back(this);
  }

  onRightIconPress = () => {
    alert('hi right icon pressed')
  }

  onChangeText = (text) => {
    //get the list of the category with the food and filter through the data
    const desiredData = Object.entries(searchableData)
      .filter(([food, category]) =>
        food.startsWith(text) || category.startsWith(text))
      .map(val => val[1]);
    const newData = DATA.filter((val) => desiredData.indexOf(val.name) !== -1);
    //LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    this.setState({
      data: newData,
    });
  }
  render() {
    const {
      totalCount,
      dialogVisible,
      dataToDialog,
    } = this.state;
    return (
      <Drawer
        type="static"
        content={<DrawerContent />}
        openDrawerOffset={100}
        
        styles={{backgroundColor: 'red'}}
        open={this.state.openDrawer}
        side={'right'}
        ref={(ref) => this.drawer = ref}
        tweenHandler={Drawer.tweenPresets.parallax}
      >
      <ViewContainer style={styles.container}>
        {/* <TouchableOpacity onPress={this._onPress} style={{marginTop: 100}}>
          <Text>
            Done
          </Text>
        </TouchableOpacity> */}
        <View style={styles.hiddenContainer}>
          
          <Icon name='glass' size={200} color='rgba(255, 255, 255, 0.01)'/>
        </View>
        <ParallaxScrollView
          backgroundColor = '#10233E'
          parallaxHeaderHeight={250}
          contentBackgroundColor='rgba(0, 0, 0, 0)'
          //fadeOutForeground
          backgroundSpeed={5}
          renderBackground={() => (
            <View style={{height: 250, backgroundColor: 'rgba(0, 0, 0, 0)', justifyContent: 'center', alignItems: 'center'}}>
              <Icon name='rocket' size={100} color='rgba(0, 0, 0, 0.03)'/>
            </View>
          )}
          
          renderStickyHeader={() =>
          (
          <View style={{height: 100, backgroundColor: '#7947FF', alignItems: 'center',  ...shadow, flexDirection: 'row', justifyContent: 'space-between', paddingRight: 20 }} >
            
            <Text style={{fontSize: 40, color: 'white', backgroundColor: 'rgba(0, 0, 0, 0)', fontFamily: 'Avenir-black'}}> Order </Text>
            <Icon name='ellipsis-v' size={35} color={'white'} />
          </View>
          )}
          stickyHeaderHeight={0}
          renderForeground={() =>
          (<View style={{ backgroundColor: 'rgba(0, 0, 0, 0) ', justifyContent: 'center', paddingTop: 40, paddingLeft: 20}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingRight: 20}}>
              <TouchableOpacity onPress={this.onBackPress}>
                <Icon name='chevron-left' size={50} color={nativeColors.yellow} />
              </TouchableOpacity>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={this._onFabLongPress}>
                  <Icon name='bell' size={40} color={totalCount >= 1 ? nativeColors.yellow : 'rgba(0, 0, 0, 0.2)'}  />
                </TouchableOpacity>
                <View style={{marginLeft: 30}} />
                <TouchableOpacity onPress={() => this.drawer.open()}>
                  <Icon name='th-large' size={40} color={nativeColors.yellow} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{marginTop: 25}} />
            <Text style={{fontSize: 50, color: 'white', backgroundColor: 'rgba(0, 0, 0, 0)', fontFamily: font }}>Order </Text>
            <SearchBar onChangeText={this.onChangeText}/>
          </View>)
          }
          >
            <ItemCategories itemCategories={this.state.data} onCategoryChange={this.onCategoryChange} />
        </ParallaxScrollView>
        
        <MenuInfoDialog visible={dialogVisible} onClosePress={this._onDialogClosePress} data={dataToDialog}/>
        
      </ViewContainer>
      </Drawer>
    );
  }
}


const SearchBar = ({ ...attributes }) => (
  <View style={{
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginRight: 20,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 30,
    flexDirection : 'row'
  }}>
    <TextInput placeholder={'search...'} {...attributes} placeholderTextColor={nativeColors.lightBlue} style={{height: 50, width: '100%', fontSize: 30, color: 'white', fontFamily: font}} />
    <Icon name='search' size={30} color={nativeColors.yellow} />
  </View>
)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  fabContainer: {
    width: 90,
    height: 90,
    borderRadius: 50,
    backgroundColor: nativeColors.lightBlue,
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginBottom: 20,
    marginRight: 20,
    shadowOffset: { width: 6, height: 6 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hiddenContainer: {
    position: 'absolute',
    height: '100%',
    width: 400,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  
});

export {
  MenuScreen,
};
