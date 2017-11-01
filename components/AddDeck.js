import React, {Component} from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView
} from 'react-native'
import {connect} from 'react-redux'
import {addDeck} from '../actions'
import {NavigationActions} from 'react-navigation'

import {saveDeckTitle} from '../utils/api'
import {styles} from '../utils/styles'
import {lightcreem, red} from '../utils/Color'

class AddDeck extends Component {

  state = {
    deckName: ''
  }

  async _addDeck() {

    const {deckName} = this.state

    this
      .props
      .addDeck(deckName)

    /* Save to local store as optional
    saveDeckTitle(deckName)  */

    this
      .props
      .navigation
      .navigate('DeckView', {
        name: deckName,
        count: 0,
        questions: []
      }
    )
  }

  render() {    

    return (     

      <KeyboardAvoidingView behavior='padding' style={[styles.CardKeyBoard]}>

        <View style={styles.header}>
          <Text style={styles.title}>What is the title of your new deck?</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            placeholder="Please Write your deck Name!"
            style={styles.textInput}
            onChangeText={(deckName) => this.setState({deckName})}
            value={this.state.deckName}/>
          <TouchableOpacity
            style={[styles.DBtnSubmit]}
            onPress={() => this._addDeck()}>
            <Text style={{
              color: lightcreem
            }}>Submit</Text>
          </TouchableOpacity>        
        </View>
      </KeyboardAvoidingView>

    )
  }
}

export default connect(null, {addDeck})(AddDeck)
