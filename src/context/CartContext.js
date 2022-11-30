import React, { PureComponent } from "react";

const CartContext = React.createContext();
export const CartConsumer = CartContext.Consumer;

export class CartProvider extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            cartItems: [],
            isOpen: false,
        };
        // this.setCartItems = this.setCartItems.bind(this);
    }

    componentDidMount() {
        this.setState({ cartItems: JSON.parse(localStorage.getItem('cartItems')) });
    }

    componentDidUpdate() {
        localStorage.setItem('cartItems', JSON.stringify(this.state.cartItems));
    }

    getItemQuantity = (itemId) => {
        const { cartItems } = this.state;
        return cartItems.find(item => item.id === itemId)?.quantity || 0;
    }

    addToCart = (itemId, selectedAttributes) => {
        this.setState(function(currItems) {
            if (currItems.cartItems.find(item => item.itemId === itemId) == null) {
                return {
                    cartItems: [...currItems.cartItems, { itemId, selectedAttributes, quantity: 1 }]
                }  
            }
            return {
                cartItems: currItems.cartItems.map(item => {
                    if (item.itemId === itemId) {
                        return { ...item, selectedAttributes, quantity: item.quantity + 1 };
                    } else {
                        return item;
                    }
                })
            }
        });
    }

    increaseCartQuantity = (itemId) => {
        this.setState(function(currItems) {
            if (currItems.cartItems.find(item => item.itemId === itemId) == null) {
                return {
                    cartItems: [...currItems.cartItems, { itemId, quantity: 1 }]
                }  
            }
            return {
                cartItems: currItems.cartItems.map(item => {
                    if (item.itemId === itemId) {
                        return { ...item, quantity: item.quantity + 1 };
                    } else {
                        return item;
                    }
                })
            }
        });
    }

    decreaseCartQuantity = (itemId) => {
        this.setState(function(currItems) {
            if (currItems.cartItems.find(item => item.itemId === itemId)?.quantity === 1) {
                return {
                    cartItems: currItems.cartItems.filter(item => item.itemId !== itemId)
                }  
            }
            return {
                cartItems: currItems.cartItems.map(item => {
                    if (item.itemId === itemId) {
                        return { ...item, quantity: item.quantity - 1 };
                    } else {
                        return item;
                    }
                })
            }
        });
    }

    openCart = () => {
        this.setState({ isOpen: true });
    }

    closeCart = () => {
        this.setState({ isOpen: false });
    }

    render() {
        const { 
            getItemQuantity, 
            increaseCartQuantity, 
            decreaseCartQuantity, 
            openCart, 
            closeCart, 
            addToCart,
        } = this;

        const { cartItems, isOpen } = this.state;

        const cartQuantity = this.state.cartItems.reduce((quantity, item) => item.quantity + quantity, 0);

        return(
            <CartContext.Provider value={{ 
                getItemQuantity, 
                addToCart, 
                increaseCartQuantity, 
                decreaseCartQuantity, 
                openCart, closeCart, 
                isOpen, 
                cartItems, 
                cartQuantity,
                 }}>
                {this.props.children}
            </CartContext.Provider>
        );
    }
}

export default CartContext;