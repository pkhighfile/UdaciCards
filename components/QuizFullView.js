import React, {Component} from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import {SimpleLineIcons} from '@expo/vector-icons'
import {NavigationActions} from 'react-navigation'

import {setLocalNotification, clearLocalNotification} from '../utils/helpers'
import {orange, red, grayTw} from '../utils/Color'
import {styles} from '../utils/styles'

export default class QuizFullView extends Component {

  componentDidMount = () => {
    clearLocalNotification().then(setLocalNotification);
  }

  toHome = () => {
    this
      .props
      .navigation
      .dispatch(NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'Home'})]
      }))
  }

  BacktoDeck = (name, QL, totalNumber) => {   
    this
      .props
      .navigation
      .navigate('DeckView', {
        name: name,
        count: totalNumber,
        questions: QL
      })
  }

  ResetQuiz = (QL, name, totalNumber) => {
    this
      .props
      .navigation
      .navigate('QuizView', {QL, questions: QL, name, totalNumber: totalNumber, score: 0})
  }

  render() {
    
    const {QL, name, score, totalNumber} = this.props.navigation.state.params   

     

    const questions = QL
    let message,
      sColor
    if (score > 0) {
      message = 'Congratulations !'
      sColor = orange
    } else {
      message = ':( Please try again !'
      sColor = red
    }
    return (
      <View style={ styles.scoreMContainer }>
        <View style={styles.scoreHeadcontainer}>
          <SimpleLineIcons name="trophy" size={38} color={grayTw}/>
          <Text
            style={[
            styles.message, {
              color: sColor
            }
          ]}>
            {message}
          </Text>
        </View>
        <View style={[styles.scoreContainer, styles.container]}>
          <Text style={styles.finalScore}>
            Final Score
          </Text>
          <View style={styles.scoreViw}>
            <Text style={styles.scoreTxt}>
              {score}
              / {totalNumber}
            </Text>
          </View>
        </View>
        <View style={[styles.btnContainer, styles.container]}>

          <TouchableOpacity
            style={[styles.secondaryBtn]}
            onPress={() => this.ResetQuiz(QL, name, totalNumber)}>
            <Text style={{
              color: grayTw
            }}>Reset Quiz</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.secondaryBtn]}
            onPress={() => this.BacktoDeck(name, QL, totalNumber )}>
            <Text style={{
              color: orange
            }}>Back to Deck</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.secondaryBtn]} onPress={() => this.toHome()}>
            <Text style={{
              color: red
            }}>Back to Home</Text>
          </TouchableOpacity>

        </View>
      </View>
    )
  }
}
