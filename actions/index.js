import {GET_DECKS, ADD_DECK, ADD_CARD} from './actionTypes'

export function getDecks(decks) {
  return {type: GET_DECKS, decks}
}

export function addDeck(deck) {
  return {type: ADD_DECK, deck}
}

export function addCard(card) {
  return {type: ADD_CARD, card}
}