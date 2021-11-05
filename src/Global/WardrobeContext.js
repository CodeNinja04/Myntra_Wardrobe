import userEvent from '@testing-library/user-event';
import React, { createContext } from 'react'
import { db } from '../Config/Config'

export const WardrobeContext = createContext();

export class WardrobeContextProvider extends React.Component {

    state = {
        tops: [],
        bottoms: [],
        shoes: [],
        jackets: []

    }

    componentDidMount() {

        const prevTops = this.state.tops;
        const prevBottoms = this.state.bottoms;
        const prevShoes = this.state.shoes;
        const prevJackets = this.state.jackets;
        db.collection('Wardrobe - '+user.id).onSnapshot(snapshot => {
            let changes = snapshot.docChanges();
            changes.forEach(change => {
                if (change.type === 'added') {
                    prevProducts.push({
                        ProductID: change.doc.id,
                        ProductName: change.doc.data().ProductName,
                        ProductPrice: change.doc.data().ProductPrice,
                        ProductImg: change.doc.data().ProductImg
                    })
                }
                this.setState({
                    products: prevProducts
                })
            })
        })

    }
    render() {
        return (
            <ProductsContext.Provider value={{ products: [...this.state.products] }}>
                {this.props.children}
            </ProductsContext.Provider>
        )
    }
}

