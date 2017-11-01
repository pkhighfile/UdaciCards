import React from 'react'
import { View } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

import { setLocalNotification } from './utils/helpers'
import { purple } from './utils/Color'
import { UdaciStatusBar, MainNavigator } from  './utils/appTabs'


export default class App extends React.Component {

  componentDidMount =() => {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
        <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}
