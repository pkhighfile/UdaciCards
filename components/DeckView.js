import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default class DeckView extends Component {
  
  render() {
    const navigation = this.props.navigation;
    const { name, count, questions } = this.props.navigation.state.params;
    return (
      <View style={{flex: 1}}>
        <View style={styles.DeckHeader}>
          
          <Text style={[styles.title]}>{name}</Text>
          <Text style={styles.count}>{`${count} cards`}</Text>
        </View>
        <View style={styles.DeckBtns}>
          {count !== 0 &&
            <TouchableOpacity style={styles.BtnSubmit} onPress={() => navigation.navigate('QuizView', { questions, totalNumber: count, score: 0 })}>
              <Text style={{color: '#f7f7f7'}}>Start Quiz</Text>
            </TouchableOpacity>
          }
          <TouchableOpacity style={[styles.secondaryBtn]} onPress={() => navigation.navigate('AddCard', { name })}>
            <Text style={{color: '#333333'}}>Add Card</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Count: {fontSize: 20, color: '#333333'},
  DeckHeader: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  DeckBtns: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 27,
    fontWeight: '600',
    color: '#333333',
    marginTop: 10,
  },
  BtnSubmit: {
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 40,
    backgroundColor: '#333333',
  },
  secondaryBtn: {
    borderRadius: 4,
    paddingVertical: 11,
    paddingHorizontal: 39,
    borderWidth: 1,
    borderColor: '#333333',
    marginTop: 10,
  },
});
