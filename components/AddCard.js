import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavigationActions} from 'react-navigation'

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView
} from 'react-native'

import {addCard} from '../actions'
import {addCardToDeck, getListDecks} from '../utils/api'
import {styles} from '../utils/styles'
import {lightcreem} from '../utils/Color'

class AddCard extends Component {
  state = {
    question: '',
    answer: ''
  }

  async _addQuestion() {
    const {question, answer} = this.state

    const {QL, deck, count} = this.props.navigation.state.params
    if (question.length > 0 && answer.length > 0) {
      this
        .props
        .addCard({deck, question, answer})

      /* Save to local store as optional
    addCardToDeck(deck, question, answer) */
      let AQ = [
        {
          question: question,
          answer: answer
        }
      ]
      let Counter = count + 1
      let JL = QL.concat(AQ)

      this.props.navigation.navigate('DeckView', {name:deck, count:Counter, questions:JL})

    }
  }

  render() {

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.CardKeyBoard}>
        <Text style={styles.labelText}>
          Question
        </Text>
        <TextInput
          placeholder=" Write your question!"
          style={styles.textInput}
          onChangeText={(question) => this.setState({question})}
          value={this.state.question}/>
        <Text style={[styles.labelText]}>
          Answer
        </Text>
        <TextInput
          placeholder="Write your answer!"
          style={[styles.textInput]}
          onChangeText={(answer) => this.setState({answer})}
          value={this.state.answer}/>
        <TouchableOpacity
          style={[styles.BtnSubmit]}
          onPress={() => {
          this._addQuestion()
        }}>
          <Text style={{
            color: lightcreem
          }}>Submit</Text>
        </TouchableOpacity>

      </KeyboardAvoidingView>
    )
  }
}

export default connect(null, {addCard})(AddCard)
