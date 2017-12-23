import { StackNavigator } from 'react-navigation';
import { LoginScreen, TableScreen, MenuScreen } from './screens';

const Main = StackNavigator({
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {
      header: null,
    },
  },
  TableScreen: {
    screen: TableScreen,
    navigationOptions: {
      header: null,
    },
  },
  MenuScreen: {
    screen: MenuScreen,
    navigationOptions: {
      header: null,
    },
  },
}, { initialRouteName: 'TableScreen' });

export { Main };
