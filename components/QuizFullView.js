import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation';
import { setLocalNotification, clearLocalNotification } from '../utils/helpers';

export default class QuizFullView extends Component {
  
  componentDidMount() {     
    clearLocalNotification().then(setLocalNotification);
  }
  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' })
      ]
    }));
  }
  render() {
    const { score, totalNumber } = this.props.navigation.state.params;
    let message 
    if(score > 0){
      message = 'Congratulations !'
    } else{
      message = ':( Please try again !'
    }
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={[styles.headerContainer, styles.container]}>
          <SimpleLineIcons
            name="trophy"
            size={38}
            color="#333333"
          />
          <Text style={styles.message}>
           {message}
          </Text>
        </View>
        <View style={[styles.scoreContainer, styles.container]}>
          <Text style={{fontSize: 14, color: '#333333'}}>
            Final Score
          </Text>
          <View style={styles.scoreViw}>
            <Text style={styles.scoreTxt}>
              {score} / {totalNumber}
            </Text>
          </View>
        </View>
        <View style={[styles.btnContainer, styles.container]}>
          <TouchableOpacity style={[styles.secondaryBtn, { marginTop: 10 }]} onPress={() => this.toHome()}>
            <Text style={{color: '#333333'}}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scoreViw:{
    backgroundColor: 'rgba(51, 51, 51, 0.9)',
     borderRadius: 3, 
     marginTop: 6,
  },
  scoreTxt:{
    color: '#ffd659',
    paddingVertical: 6, 
    paddingHorizontal: 40, 
    fontWeight: '700', 
    fontSize: 18,
  },
  message:{
    fontSize: 28, 
    fontWeight: '700', 
    color: '#ffc859',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flex: 3,
  },
  scoreContainer: {
    flex: 2,
  },
  btnContainer: {
    flex: 2,
  },
  secondaryBtn: {
    width: 155,
    borderRadius: 4,
    paddingVertical: 11,
    borderWidth: 1,
    borderColor: '#333333',
    alignItems: 'center',
  },
});
