import React, { PureComponent } from "react";
import cart from '../../assets/emptyCart.svg';
import './Cart.css';
import { CurrencyConsumer } from "../../context/CurrencyContext";
import CartContext from "../../context/CartContext";
import { Link } from "react-router-dom";
import { getProductsByCategoryName } from "../../graphql/queries";
import CartItem from "../CartItem/CartItem";

export default class Cart extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
        }
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    static contextType = CartContext;

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside);
        getProductsByCategoryName("all")
        .then(response => {
            this.setState({ products: response.products });
        })

    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    }

    handleClickOutside = (e) => {
        const { closeCart } = this.context;

        if (this.wrapperRef && !this.wrapperRef.current.contains(e.target)) {
            closeCart();
        }
    }

    render() {
        const { cartItems, cartQuantity, isOpen, openCart, closeCart } = this.context;
        const { products } = this.state;

        return(
            <CurrencyConsumer>
                {currency => {
                    return (
                        <div ref={this.wrapperRef} className="cart">
                            <button className="cartIconButton"  onClick={isOpen ? closeCart : openCart}>
                                <div className={cartQuantity < 1 ? "hidden" : "counter"}>{cartQuantity}</div>
                                <img src={cart} alt="Cart Icon" />
                            </button>

                            <div className={isOpen ? "overlay" : "hidden"}>
                                {
                                    cartQuantity < 1 ?
                                    <div className="empty">Cart is empty</div>
                                    :
                                    <div className="shopping-bag">
                                        <h3><strong>My bag:</strong> {cartQuantity} {cartQuantity > 1 ? "items": "item"}</h3>
                                        {cartItems?.map(item => (
                                            <CartItem key={item.itemId} {...item} {...this.context} />
                                        ))}
                                    </div>
                                }

                                <div className="tally">
                                    <p className="total">Total</p>
                                    <p className="total-amount">
                                    {currency.currentCurrency}{
                                        cartItems?.reduce((total, cartItem) => {
                                            const item = products.find(i => i.id === cartItem.itemId);
                                            const price = item?.prices.find(price => price.currency.symbol === currency.currentCurrency && price.amount);
                                            return total + price?.amount * cartItem.quantity;
                                        }, 0).toFixed(2)
                                    }
                                    </p>
                                </div>

                                <div className="buttons">
                                    <Link to="/cart" className="viewBag">View Bag</Link>

                                    <button className="checkout">Checkout</button>
                                </div>
                            </div>
                        </div>
                    );
                }}
            </CurrencyConsumer>
        );
    }
}