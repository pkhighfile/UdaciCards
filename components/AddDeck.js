import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView  } from 'react-native';
import { connect } from 'react-redux';
import { addDeck } from '../actions';
import { NavigationActions } from 'react-navigation';
import { saveDeckTitle } from '../utils/api'

class AddDeck extends Component {
  state = {
    deckName: '',
  }

  async _addDeck() {
    const { deckName } = this.state

    this.props.addDeck(deckName)

  /* Save to local store as optional */
    saveDeckTitle(deckName)

   /* this.setState({deckName: ''});   */

    this.props.navigation.navigate('DeckList');
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={{flex: 1}}>
        <View style={styles.header}>
          <Text style={styles.title}>What is the title of your new deck?</Text>
        </View>
        <View style={styles.form}>
          <TextInput
            placeholder ="Please Write your deck Name!"
            style={styles.textInput}
            onChangeText={(deckName) => this.setState({deckName})}
            value={this.state.deckName}
          />
          <TouchableOpacity style={[styles.mainBtn, { marginTop: 5 }]} onPress={() => this._addDeck()}>
            <Text style={{color: '#f7f7f7'}}>Submit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    flex: 2,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    color: '#333333',
    fontWeight: '500',
    textAlign: 'center',
  },
  textInput: {
    height: 40,
    width: 280,
    borderColor: '#333333',
    borderWidth: 1,
    borderRadius: 3,
  },
  mainBtn: {
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 40,
    backgroundColor: '#333333',
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    addDeck: (deck) => dispatch(addDeck(deck))
  }
}

export default connect(null, mapDispatchToProps)(AddDeck)
