import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView  } from 'react-native';
import { connect } from 'react-redux';
import { addCard } from '../actions';
import { NavigationActions } from 'react-navigation';
import { addCardToDeck, getListDecks } from '../utils/api'

class AddCard extends Component { 
  state = {
      question: '',
      answer: '',
    }
  
  async _addQuestion() {
    const { question, answer } = this.state

    const deck = this.props.navigation.state.params.name
     
    this.props.addCard({
      deck, question, answer
    }) 

    /* Save to local store as optional
    addCardToDeck(deck, question, answer) */

    /*this.setState({ question: '', answer: '' })*/
     
    this.props.navigation.navigate('DeckList')
  }
  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.labelText}>
          Question
        </Text>
        <TextInput
        placeholder =" Write your question!"
          style={styles.textInput}
          onChangeText={(question) => this.setState({question})}
          value={this.state.question}
        />
        <Text style={[styles.labelText, { marginTop: 10 }]}>
          Answer
        </Text>
        <TextInput
         placeholder ="Write your answer!"
          style={[styles.textInput]}
          onChangeText={(answer) => this.setState({answer})}
          value={this.state.answer}
        />
        <TouchableOpacity style={[styles.mainBtn, { marginTop: 10 }]} onPress={() => {this._addQuestion()}}>
          <Text style={{color: '#f7f7f7'}}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  mainBtn: {
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 40,
    backgroundColor: '#333333',
  },
  textInput: {
    height: 40,
    width: 280,
    borderColor: '#333333',
    borderWidth: 1,
    borderRadius: 3,
  },
  labelText: {
    fontSize: 26,
    fontWeight: '700',
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    addCard: (card) => dispatch(addCard(card))
  }
}

export default connect(null, mapDispatchToProps)(AddCard)
