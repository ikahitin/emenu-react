import React, { useState, useEffect, useContext } from 'react'
import { CartContext } from "./context";

function totalPrice(items) {
    return items.reduce((acc, item) => acc + item.quantity * item.price, 0.0)
}

export default function Cart() {
    const ctx = useContext(CartContext)
    return (
        <div>
            <h1 className="maintext">Cart</h1>
            {ctx.items.map(item => (
                <div className="item-wrap" key={item.product_id}>
                    <div id={`ratio${item.product_id}`}>
                        <a className="anchor" id={item.category_name}></a>
                    </div>
                    <span className="ratio">0</span>
                    <span className="ratio bottom">0</span>
                    <div className="cartitem">
                        <div className="image cartimage">
                            <img src={`${item.image_path}`} alt={item.name}></img>
                        </div>
                        <div className="info cartinfo">
                            <div className="item-text">
                                <div className="title">{item.name}</div>
                            </div>
                            <div className="purchase" data-itemid={item.product_id}>
                                <div className="price">{item.quantity * item.price} $</div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <p className='total'>Total price: {totalPrice(ctx.items)}</p>
            <p className='checkout'><div className='chbutton'>Checkout</div></p>
            </div>

    )
}