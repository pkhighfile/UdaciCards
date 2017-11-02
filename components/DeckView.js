import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {NavigationActions} from 'react-navigation'
import {styles} from '../utils/styles'
import {lightcreem, grayTw, red} from '../utils/Color'

export default class DeckView extends Component {

  toHome = () => {
    this
      .props
      .navigation
      .dispatch(NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'Home'})]
      }))
  }

  render() {

    const navigation = this.props.navigation
    const {name, count, questions} = this.props.navigation.state.params
    return (
      <View style={styles.flexone }>
        <View style={styles.DeckHeader}>

          <Text style={[styles.titleTopTen]}>{name}</Text>
          <Text style={styles.Count}>{`${count} cards`}</Text>
        </View>
        <View style={styles.DeckBtns}>
          {count !== 0 && <TouchableOpacity
            style={styles.BtnSubmit}
            onPress={() => navigation.navigate('QuizView', {
            QL: questions,
            questions,
            name: name,
            totalNumber: count,
            score: 0
          })}>
            <Text style={{
              color: lightcreem
            }}>Start Quiz</Text>
          </TouchableOpacity>
         }
          <TouchableOpacity
            style={[styles.secondaryBtn]}
            onPress={() => navigation.navigate('AddCard', {
            QL: questions,
            deck: name,
            count: count           
            })}>
            <Text style={{
              color: grayTw
            }}>Add Card</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.secondaryBtn]}
            onPress={() => navigation.navigate('Home', {name})}>
            <Text style={{
              color: red
            }}>Back To Home</Text>
          </TouchableOpacity>

        </View>
      </View>

    )
  }
}
