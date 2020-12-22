import React, { useRef, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header'
import { CartContext } from "../cart/context";
import { Link } from 'react-router-dom';


export default function Store() {
    const cartCtx = useContext(CartContext);
    const [isLoading, setLoading] = useState(true);
    const [products, setProducts] = useState();
    function totalPrice() {
        if (document.getElementsByClassName('quantity').length !== 0) {
            cartCtx.items.forEach(element =>
                document.getElementById(element.product_id).value = element.quantity);
        }
        return cartCtx.items.reduce((acc, item) => acc + item.quantity * item.price, 0.0)
    }
    useEffect(() => {
        if (cartCtx.items.length > 0) {
            for (var i = 0, len = cartCtx.items.length; i < len; i++) {
                document.getElementById(cartCtx.items[i].id).style.display = 'block'
                document.getElementById('minus' + cartCtx.items[i].id).style.display = 'block'
                document.getElementById(cartCtx.items[i].id).value = cartCtx.items[i].quantity
            }
        }
        axios.get("http://127.0.0.1:8000/api/menu/").then(response => {
            setProducts(response.data);
            setLoading(false);
        });
    }, []);
    if (isLoading) {
        return <div className="App">Loading...</div>;
    }
    return (
        <div className='content'>
            <div className="top-spacer" />
            <Header/>
            <div className="order-info">
                <Link to="/cart">
                    <div className="order-block">
                        <div className="totalsum">{totalPrice(cartCtx.items)} $</div>
                        <div className="makeorder"><img src="/images/Bag.svg" alt="bag"></img>Order</div>
                    </div>
                </Link>
            </div>
            {products.map(category => (
                <div className="section" key={category.id} id={category.name}>
                    <h1 className='topic'>{category.name}</h1>
                    {category.products.map(item => (
                        <div className="item-wrap" key={item.product_id}>
                            <div id={`ratio${item.product_id}`}>
                                <a className="anchor" id={item.category_name}></a>
                            </div>
                            <span className="ratio">0</span>
                            <span className="ratio bottom">0</span>
                            <div className="item">
                                <div className="image">
                                    <img src={`${item.image_path}`} alt={item.name}></img>
                                </div>
                                <div className="info">
                                    <div className="item-text">
                                        <div className="title">{item.name}</div>
                                        <div className="description">{item.description}</div>
                                    </div>
                                    <div className="purchase" data-itemid={item.product_id}>
                                        <div className="price">{item.price} $</div>
                                        <div className="inputs">
                                            <form method="post">
                                                <input type="button" value="-" id={`minus${item.product_id}`} className="minus hide" onClick={() => cartCtx.removeFromCart(item, cartCtx.items)}></input>
                                                <input id={item.product_id} type="text" className="quantity" defaultValue="0"></input>
                                                <input type="button" value="+" id={`plus${item.product_id}`} className="plus" onClick={() => cartCtx.addToCart(item)}></input>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
            <div className="bottom-spacer" />
        </div>
    );
}
