import React, {Component} from 'react'
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native'
import {white, red} from '../utils/Color'
import {styles} from '../utils/styles'

export default class QuizView extends Component {
  state = {
    isFlipped: true,
    spinValue: new Animated.Value(0)
  }
  componentDidUpdate = (prevProp, prevState) => {
    if (this.state.isFlipped !== prevState.isFlipped) {
      this
        .state
        .spinValue
        .addListener(({value}) => this._value = value)
      this._flippedCard()
    }
  }
  componentWillUnmount = () => {
    this
      .state
      .spinValue
      .removeAllListeners()
  }

  _flippedCard = () => {
    Animated
      .timing(this.state.spinValue, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear
    })
      .start()

  }

  _hideMe = () => {
    if (this.state.isFlipped) {
      this.setState({isFlipped: false})
    } else {
      this.setState({isFlipped: true})
    }
  }

  goToNextQuestion = (restQuestions, QL, name, score, totalNumber) => {
    if (restQuestions.length > 0) {
      this
        .props
        .navigation
        .navigate('QuizView', {
          QL,
          questions: restQuestions,
          totalNumber,
          score,
          name: name
        })
    } else {
      this
        .props
        .navigation
        .navigate('QuizFullView', {QL, name: name, score, totalNumber})
    }
  }

  render() {
    const {QL, questions, name, totalNumber, score} = this.props.navigation.state.params  
     

    const [currentQuestion, ...restQuestions] = questions
    const rotateX = this
        .state
        .spinValue
        .interpolate({
          inputRange: [
            0, 1
          ],
          outputRange: ['0deg', '360deg']
        })

      let hideView,
        hidetxt
      if (this.state.isFlipped) {
        hideView = currentQuestion.question
        hidetxt = 'View Answer'
      } else {
        hideView = currentQuestion.answer
        hidetxt = 'View Question'
      }
      return (
        <View style={{
          flex: 1
        }}>
          <View style={styles.headerContainer}>
            <Text style={{
              fontSize: 16
            }}>
              {totalNumber - restQuestions.length}/{totalNumber}
            </Text>
          </View>
          <View style={styles.cardContainer}>
            <Animated.View
              style={[
              styles.flipCard, {
                transform: [
                  {
                    rotateY: rotateX
                  }
                ]
              }
            ]}>
              <Text style={styles.flipText}>
                {hideView}
              </Text>
            </Animated.View>
            <TouchableOpacity style={styles.btnViewAns} onPress={() => this._hideMe()}>
              <Text style={{
                color: red
              }}>{hidetxt}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.formContainer}>
            <TouchableOpacity
              style={styles.BtnCorrect}
              onPress={() => this.goToNextQuestion(restQuestions, QL, name, score + 1, totalNumber)}>
              <Text style={{
                color: white
              }}>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.BtnInCorrect}
              onPress={() => this.goToNextQuestion(restQuestions, QL, name, score, totalNumber)}>
              <Text style={{
                color: white
              }}>Incorrect</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }
