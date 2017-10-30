import React, { Component } from 'react'
import { Animated, Easing, StyleSheet,Text,View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { white } from '../utils/Color'

export default class QuizView extends Component {
 state = {        
        isFlipped: true,
        spinValue: new Animated.Value(0)
    }
    componentDidUpdate(prevProp, prevState) {
      if (this.state.isFlipped !== prevState.isFlipped) {
          this._flippedCard();
      }
  }

_flippedCard() 
{
  Animated.timing(
    this.state.spinValue,
  {
    toValue: 1,
    duration: 3000,
    easing: Easing.linear
  }
).start()

  }  

_hideMe()
{
  if(this.state.isFlipped){
    this.setState({isFlipped: false})
  }
  else
  {
   this.setState({isFlipped: true})
  }
}
  
  goToNextQuestion(restQuestions, score, totalNumber) {
    if (restQuestions.length > 0) {
      this.props.navigation.navigate('QuizView', { questions: restQuestions, totalNumber, score });
    } else {
      this.props.navigation.navigate('QuizFullView', { score, totalNumber });
    }
  }

  render() {
    const { questions, totalNumber, score } = this.props.navigation.state.params;
    const [currentQuestion, ...restQuestions] = questions;
    const rotateX = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })

    let hideView, hidetxt
    if(this.state.isFlipped){
      hideView = currentQuestion.question 
      hidetxt = 'View Answer'     
    }
    else
    {
      hideView = currentQuestion.answer
      hidetxt = 'View Question'
    }
    return (
      <View style={{flex: 1}}>
        <View style={styles.headerContainer}>
          <Text style={{fontSize: 16}}>
            {totalNumber - restQuestions.length}/{totalNumber}
          </Text>
        </View>
        <View style={styles.cardContainer}>
        <Animated.View style={[styles.flipCard,{transform: [{rotateY: rotateX}]}]} >
         <Text style={styles.flipText}>
           { hideView }        
          </Text>
          </Animated.View>
          <TouchableOpacity style={styles.btnViewAns} onPress={()=> this._hideMe()}>
            <Text style={{color: '#b71845'}}>{hidetxt}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.formContainer}>
          <TouchableOpacity style={styles.BtnCorrect} onPress={() => this.goToNextQuestion(restQuestions, score + 1, totalNumber)}>
            <Text style={{color: white}}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.BtnInCorrect} onPress={() => this.goToNextQuestion(restQuestions, score, totalNumber)}>
            <Text style={{color: white}}>Incorrect</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
 
  headerContainer: {
    flex: 1,
    paddingTop: 10,
    paddingLeft: 10,
  },
  cardContainer: {
    flex: 4,
    alignItems: 'center',
  },
  formContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  BtnCorrect: {
    width: 155,
    marginTop: 10,
    borderRadius: 4,
    paddingVertical: 12,   
    backgroundColor: '#009900', 
    alignItems: 'center',    
  },
  BtnInCorrect: {
    width: 155,
    marginTop: 10,
    borderRadius: 4,
    paddingVertical: 12, 
    backgroundColor: '#b71845',   
    alignItems: 'center',   
  },
  btnViewAns: {
    width: 155,
    marginTop: 10,
    borderRadius: 4,
    paddingVertical: 11,
    borderWidth: 1,
    borderColor: '#333333',
    alignItems: 'center',
  },
 
  flipCard: {
    width: 300,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    backfaceVisibility: 'hidden',
  },
 
  flipText: {
    fontSize: 12,
    color: '#000',
    fontWeight: 'bold',
  }
});
