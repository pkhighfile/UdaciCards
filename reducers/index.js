import {GET_DECKS, ADD_DECK, ADD_CARD} from '../actions/actionTypes'

const initialState = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      }, {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that func' +
          'tion was declared.'
      }
    ]
  }
}

function decks(state = initialState, action) {
  switch (action.type) {
    case GET_DECKS:
      return {
        ...state,
        ...action.decks
      }
    case ADD_DECK:
      const createDeck = {
        [action.deck]: {
          title: action.deck,
          questions: []
        }
      }
      return {
        ...state,
        ...createDeck
      }
    case ADD_CARD:
      const {deck, question, answer} = action.card
      return {
        ...state,
        [deck]: {
          ...state[deck],
          questions: [
            ...state[deck].questions, {
              question,
              answer
            }
          ]
        }
      }
    default:
      return state
  }
}

export default decks
