import { PureComponent } from "react";
import CurrencyContext from "../../context/CurrencyContext";
import { getProductById } from "../../graphql/queries";
import CartItemInfo from "../CartItemInfo/CartItemInfo";
import './CartItem.css';

export default class CartItem extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            product: [],
        }
    }

    static contextType = CurrencyContext;

    componentDidMount = () => {
        const { itemId } = this.props;
        getProductById(itemId)
        .then(response => {
            this.setState({ product: response });
        });
    }

    render() {
        const { quantity, increaseCartQuantity, decreaseCartQuantity, selectedAttributes } = this.props;
        const { product } = this.state;

        return(
            <div className="cartItem">
                <div className="info">
                    <div className="product-name">
                        <h3>{product.brand}</h3>
                        <h3>{product.name}</h3>
                    </div>

                   
                    {product.prices?.map(price => (
                        price.currency.symbol === this.context.currentCurrency && 
                        <p key={price.currency.symbol} className="item-price">{price.currency.symbol}{price.amount}</p>
                    ))}

                    <CartItemInfo product={product} selectedAttributes={selectedAttributes} />
                </div>

                <div className="right">
                    <div className="qtyBtns">
                        <button onClick={() => increaseCartQuantity(product.id)}>+</button>
                        {quantity}
                        <button onClick={() => decreaseCartQuantity(product.id)}>-</button>
                    </div>

                    <img src={product.gallery?.[0]} alt="Product" />
                </div>
            </div>
        );
    }
}