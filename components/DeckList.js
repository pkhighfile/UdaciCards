import React, {Component} from 'react';
import {View, Text, TouchableOpacity, ScrollView, AsyncStorage} from 'react-native';
import DeckCard from './DeckCard';
import {connect} from 'react-redux';
import {getDecks} from '../actions';
import {getListDecks} from '../utils/api'

class DeckList extends Component {

  render() {
    const {decks} = this.props;
    return (
      <ScrollView style={{
        flex: 1
      }}>
        {Object
          .keys(decks)
          .map((deck) => <DeckCard
            key={decks[deck].title}
            name={decks[deck].title}
            count={decks[deck].questions.length}
            questions={decks[deck].questions}
            navigation={this.props.navigation}/>)}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({decks: state})

export default connect(mapStateToProps)(DeckList)
