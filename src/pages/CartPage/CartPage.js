import { PureComponent } from "react";
import CartContext from "../../context/CartContext";
import './CartPage.css';
import CartPageItem from "./CartPageItem";
// import CartItem from "../../components/CartItem/CartItem";
import { CurrencyConsumer } from "../../context/CurrencyContext";
import { getProductsByCategoryName } from "../../graphql/queries";


class CartPage extends PureComponent {
    state = {
        products: [],
        total: 0.00,
    };

    static contextType = CartContext;

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside);
        getProductsByCategoryName("all")
        .then(response => {
            this.setState({ products: response.products });
        })

    }

    render() {
        const { cartItems, cartQuantity } = this.context;
        const { products, total } = this.state;

        return(
            <CurrencyConsumer>
                {currency => {
                    this.setState({ total: cartItems?.reduce((total, cartItem) => {
                                        const item = products.find(i => i.id === cartItem.itemId);
                                        const price = item?.prices.find(price => price.currency.symbol === currency.currentCurrency && price.amount);
                                        return total + price?.amount * cartItem.quantity;
                                    }, 0).toFixed(2) });

                    return(
                        <main className="pageContainer">
                            <h1 className="page-name">Cart</h1>
            
                            {cartItems.map(item => (
                                <CartPageItem key={item.itemId} {...item} {...this.context} />
                            ))}
            
                            <div className="order-slip">
                                <p>Tax 21%: <strong>{currency.currentCurrency}{(0.21 * total).toFixed(2)}</strong></p>
                                <p>Quantity: <strong>{cartQuantity}</strong></p>
                                <p>Total:<strong>
                                {currency.currentCurrency}{
                                    total
                                }
                                </strong></p>
            
                                <button className="cart-btn order-btn">Order</button>
                            </div>
                        </main>
                    );
                }}
            </CurrencyConsumer>
        );
    }
}

export default CartPage;