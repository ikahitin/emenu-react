import React, { useState, createContext } from 'react'

export const CartContext = createContext(null)

export default function CartProvider({ children }) {
    const [items, setItems] = useState([])
    function addToCart(item) {
        setItems(prevState => [...prevState, item])
    }
    function toggleInputTools(itemId, display) {
        if (document.getElementById(itemId)){
            document.getElementById(itemId).style.display = display;
            document.getElementById('minus' + itemId).style.display = display;
        }
    }
    function removeFromCart(item, ctxItems) {

        const found = ctxItems.find(_item => _item.product_id === item.product_id)

        if (found) {
            toggleInputTools(item.product_id, 'block')
            const foundCtx = items.find(_item => _item.product_id === item.product_id)
            const index = items.indexOf(foundCtx)
            found.quantity = found.quantity - 1
            if (index > -1) {
                items.splice(index, 1);
            }
            document.getElementById(item.product_id).value = found.quantity
            setItems(prevState => [...prevState])
            if (found.quantity === 0) {
                toggleInputTools(item.product_id, 'none')
            }
        }
        
    }

    function itemsWithQuantities(items) {
        return items.reduce((acc, item) => {
            const found = acc.find(_item => _item.product_id === item.product_id)
            toggleInputTools(item.product_id, 'block')
            if (found) {
                found.quantity = found.quantity + 1
            } else {
                acc.push({
                    quantity: 1,
                    ...item
                })

            }
            return acc
        }, [])
    }

    return (
        <CartContext.Provider
            value={{
                items: itemsWithQuantities(items),
                addToCart, removeFromCart
            }}
        >
            {children}
        </CartContext.Provider>
    )
}