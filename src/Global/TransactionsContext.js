import React, { createContext } from 'react'
import { auth, db } from '../Config/Config'

export const TransactionsContext = createContext();

export class TransactionsContextProvider extends React.Component {

  state = {
    transactions: []
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        let collection_NAME = `Buyer-info ${user.uid}`;
        db.collection(collection_NAME).onSnapshot(snapshot => {
          // console.log(snapshot.docs);
          this.setState({
            transactions: snapshot.docs
          })
          console.log("updated transactions");
        })
      }
      else {
        console.log("not yet");
      }
    })
  }
  render() {

    return (
      <TransactionsContext.Provider value={{ transactions: [...this.state.transactions] }}>
        {this.props.children}
      </TransactionsContext.Provider>
    )
  }
}

