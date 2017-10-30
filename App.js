import React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform  } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Constants } from 'expo';
import { Foundation, FontAwesome, Ionicons } from '@expo/vector-icons';
import DeckList from './components/DeckList';
import AddDeck from './components/AddDeck';
import DeckView from './components/DeckView';
import QuizView from './components/QuizView';
import AddCard from './components/AddCard';
import QuizFullView from './components/QuizFullView';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { setLocalNotification } from './utils/helpers';
import { purple, white } from './utils/Color'

function UdaciStatusBar ({backgroundColor, ...props}) {
    return (
     <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
       <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
    )
  }

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-list-outline' size={30} color={tintColor} />
    },
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  },
}, 
{
 navigationOptions: {
  header: null
},
tabBarOptions: {
  activeTintColor: Platform.OS === 'ios' ? purple : white,
   style: {
   height: 56,
  backgroundColor: Platform.OS === 'ios' ? white : purple,
  shadowColor: 'rgba(0, 0, 0, 0.24)',
  shadowOffset: {  width: 0,  height: 3  },
   shadowRadius: 6,
  shadowOpacity: 1
   }
   }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null,
    },
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: {
           headerTintColor: white, 
           title: 'Deck',         
           headerStyle: {
             backgroundColor: purple,
           }
        }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: white,
      title: 'Add Card',
      headerStyle: {
        backgroundColor: purple,
      }
   }
  },
  QuizView: {
    screen: QuizView,
    navigationOptions: {
      headerTintColor: white,
      title: 'Quiz',
      headerStyle: {
        backgroundColor: purple,
      }
   }
  },
  QuizFullView: {
    screen: QuizFullView,
    navigationOptions: {
      headerTintColor: white,
      title: 'Quiz & Answer',
      headerStyle: {
        backgroundColor: purple,
      }
   }
  },
});

export default class App extends React.Component {
  componentDidMount() {
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
