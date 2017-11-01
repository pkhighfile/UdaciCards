import {AsyncStorage} from 'react-native'
export const DECKS_STORAGE_KEY = 'UdaciCards:Decks'

export function getListDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
}

export function addCardToDeck({deckName, question, answer}) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [deckName]: {
      title: deckName,
      questions: [
        ...this.props[deckName].questions, {
          question: question,
          answer: answer
        }
      ]
    }
  }))
}

export function saveDeckTitle(deckName) {
  return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify({
    [deckName]: {
      title: deckName,
      questions: []

    }
  }))
}
