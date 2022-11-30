import { PureComponent } from "react";
import CurrencyContext from "../../context/CurrencyContext";
import { getProductById } from "../../graphql/queries";
import './CartPageItem.css';
import CartPageItemImageSwitcher from "../../components/CartPageItemImageSwitcher/CartPageItemImageSwitcher";
import SingleAttributeButton from "../../components/CartItemInfo/SingleAttributeButton";
import MultipleAttributesButton from "../../components/CartItemInfo/MultipleAttributesButton";

class CartPageItem extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            product: [],
        };
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
            <div className="cartItem cart-page-item">
                <div className="info">
                    <div className="product-name">
                        <h3 className="brand-name">{product.brand}</h3>
                        <h3 className="item-name">{product.name}</h3>
                    </div>

                   
                    {product.prices?.map(price => (
                        price.currency.symbol === this.context.currentCurrency && 
                        <p key={price.currency.symbol} className="item-price cart-item-price">{price.currency.symbol}{price.amount}</p>
                    ))}

                    <div className="attribs">
                        {product.attributes?.map((attribute, i) => (
                            attribute.type === 'text'?
                            <div key={i} className="text cart-attribute-text">
                                <h3>{attribute.name}:</h3>
                                <div className="text-options">
                                {
                                    typeof selectedAttributes.selectedAttributes == 'string' ? 
                                    <SingleAttributeButton 
                                    attribute={attribute}
                                    selectedAttributes={selectedAttributes.selectedAttributes} /> :
                                    <MultipleAttributesButton 
                                    attribute={attribute}
                                    selectedAttributes={selectedAttributes.selectedAttributes} />
                                }

                            </div>
                            </div>
                            :
                            <div key={i} className="color-swatch cart-attribute-color">
                                <h3>{attribute.name}:</h3>
                                <div className="text-options">
                                    {attribute.items.map(item => (
                                        <div
                                        id={item.value} 
                                        key={item.value} 
                                        style={{ backgroundColor: `${item.value}` }}
                                        onClick={this.handleSwatchClick}
                                        className={selectedAttributes.selectedSwatch === item.value ? "selected-color" : "color"}
                                        ></div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

                <div className="right">
                    <div className="qtyBtns">
                        <button onClick={() => increaseCartQuantity(product.id, selectedAttributes)}>+</button>
                        {quantity}
                        <button onClick={() => decreaseCartQuantity(product.id, selectedAttributes)}>-</button>
                    </div>

                    <CartPageItemImageSwitcher images={product.gallery} />
                </div>
            </div>
        );
    }
}

export default CartPageItem;