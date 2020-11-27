import React, {useState, useEffect, useContext} from 'react'
import { CartContext } from "./context";

function totalPrice(items) {
    return items.reduce((acc, item) => acc + item.quantity * item.price, 0.0)
}

export default function Cart() {
    const ctx = useContext(CartContext)
    return (
        <div>
            <h1>!!!!!!!!</h1>
            {ctx.items.map(item => (
            <div key={item.product_id}>
                <img src={`/images/${item.image}`} width={100} alt='item.name'></img>
                <p>{item.name}</p>
                <p>{item.price} $</p>
                <p>{item.quantity}</p>
            </div>
        ))}
        <p>Total price: {totalPrice(ctx.items)}</p></div>
    )
}