import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Interactable from 'react-native-interactable';
import { ViewContainer } from '../../components';
import { Table } from './Table';
import Data from './mock';
import BottomSheet from './BottomSheet';
import { navigateTo } from '../../utils';


const shadow = {
  shadowOffset: { width: 5, height: 5 },
  shadowColor: 'rgba(0, 0, 0, 0.3)',
  shadowOpacity: 1,
};

class TableScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      hideMenu: true,
    }
  }
  _onBottomSheetPress = (name) => {
    this.setState({ hideMenu: true });
    navigateTo(this, 'MenuScreen', { name });
  }

  onClosePress = () => {
    this.setState({hideMenu: true});
  }

  onTablePress = () => {
    this.setState({hideMenu: false})
  }
  render() {
    const tableViews = Object.values(Data)
      .map((table, key) => (
        <Table tableName={table.id} 
          aboutTheCustomer={table.aboutTheCustomer}
          tableBusyPeriod={table.tableBusyPeriod}
          totalOrders={table.totalOrders}
          isBusy={table.isBusy}
          orderData={table.orderData}
          key={key}
          onPress={this.onTablePress}
        />
      ));
    return (
      <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0)'}}>
        
        <ViewContainer style={{flex: 1}} >
        <View style={styles.hiddenContainer}>
          
          <Icon name='smile-o' size={200} color='rgba(255, 255, 255, 0.01)'/>
        </View>
        <Interactable.View
          verticalOnly
          snapPoints={[{ y: 0 }, { y: 300 }]}
          boundaries={{ top: -200 }}
          style={{flex: 1}}
        >
        
        <ParallaxScrollView
          backgroundColor = '#10233E'
          parallaxHeaderHeight={250}
          contentBackgroundColor='rgba(0, 0, 0, 0)'
          fadeOutForeground
          backgroundSpeed={5}
          renderStickyHeader={() =>
          (
          <View style={{height: 100, backgroundColor: '#7947FF', alignItems: 'center',  ...shadow, flexDirection: 'row', justifyContent: 'space-between', paddingRight: 20 }} >
            <Text style={{fontSize: 40, color: 'white', backgroundColor: 'rgba(0, 0, 0, 0)', fontFamily: 'Avenir-black'}}> Tables </Text>
            <Icon name='ellipsis-v' size={35} color={'white'} />
          </View>
          )}
          stickyHeaderHeight={100}
          renderForeground={() =>
          (<View style={{ backgroundColor: 'rgba(0, 0, 0, 0) ', justifyContent: 'center', paddingTop: 50}}>
            <Header />
            <View style={{marginTop: 50}} />
            <TitleSearch />
            <View style={{ flexDirection: 'row', backgroundColor: 'rgba(0, 0, 0, 0)', paddingLeft: 20 }}>
              <TouchableOpacity style={{ borderBottomWidth: 0.1, borderBottomColor: 'white' }}>
              <Text style={[styles.buttonText, { color: '#7947FF' }]}> Occupied </Text>
              </TouchableOpacity>
              <View style={{ marginLeft: 20 }} />
              <TouchableOpacity >
              <Text style={[styles.buttonText, {}]}> Free </Text>
              </TouchableOpacity>
            </View>
          </View>)
          }
          >
            {tableViews}
        </ParallaxScrollView>
        </Interactable.View>
        </ViewContainer>
        <BottomSheet options={['Take Order', 'Print Bill']} onPress={this._onBottomSheetPress} hide={this.state.hideMenu} onClosePress={this.onClosePress}/>
      </View>
    );
  }
}


const Header = () => (
  <View style={{backgroundColor: 'rgba(0, 0, 0, 0)', height: '15%', flexDirection: 'row', alignItems: 'center', paddingLeft: 20, }}>
    <TouchableOpacity>
      <Icon name='power-off' size={50} color={'#dfb820'}/>
    </TouchableOpacity>
  </View>
);

const TitleSearch = () => (
  <View style={{flexDirection: 'row',  height: 60, backgroundColor: 'rgba(0, 0, 0,0)', alignItems: 'center', justifyContent: 'space-between', paddingRight: 20,}}>
    <Text style={{fontSize: 50, color: 'white', backgroundColor: 'rgba(0, 0, 0, 0)', fontFamily: 'Avenir-black'}}> Tables </Text>
    <View style={{backgroundColor: '#7947FF' , justifyContent: 'center', alignItems: 'center', height: 50, width: 50, borderRadius: 50, ...shadow }}>
      <TouchableOpacity>
        <Icon name='search' size={20} color='white'  style={{backgroundColor: 'rgba(0, 0, 0, 0)'}}/>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 22,
    fontFamily: 'Avenir-black',
    color: 'white',
  },
  hiddenContainer: {
    position: 'absolute',
    height: '100%',
    width: 400,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { TableScreen };
