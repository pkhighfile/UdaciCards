import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {styles} from '../utils/styles'

export default class DeckCard extends Component {
  render() {
    const {name, count, questions, navigation} = this.props;

    return (
      <TouchableOpacity
        style={styles.DcardContainer}
        onPress={() => navigation.navigate('DeckView', {name, count, questions})}>
        <Text style={styles.titleSec}>{name}</Text>
        <Text style={styles.count}>{`${count} cards`}</Text>
      </TouchableOpacity>
    )
  }
}
