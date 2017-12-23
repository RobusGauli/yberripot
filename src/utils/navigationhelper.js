import { NavigationActions } from 'react-navigation';

const navigateTo = (context, routeName, params={}) => {
  const navigateAction = NavigationActions.navigate({
    routeName,
    params,
  });
  context.props.navigation.dispatch(navigateAction);
}

const back = (context) => {
  const backAction = NavigationActions.back();
  context.props.navigation.dispatch(backAction);
}

export {
  navigateTo,
  back,
};
