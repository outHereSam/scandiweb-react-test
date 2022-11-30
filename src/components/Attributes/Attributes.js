import { PureComponent } from "react";
import CurrencyContext from "../../context/CurrencyContext";
import { CartConsumer } from "../../context/CartContext";
import parse from 'html-react-parser';

export default class Attributes extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedAttributes: [],
            selectedSwatch: '',
        };
        this.handleTextAttribClick = this.handleTextAttribClick.bind(this);
    }

    static contextType = CurrencyContext;

    handleTextAttribClick(e) {
        const item = e.target;
        const parent = item.parentNode;
        const options = parent.parentNode.parentNode;


        if (options.childNodes.length > 1) {
            parent.childNodes.forEach(child => {
                if (child.innerText === item.innerText) {
                    child.classList.add("selected");
                    // this.setState({ selectedAttributes: child.innerText });
                } else {
                    child.classList.remove("selected");
                }
            });
            // this product has multiple text attributes
            const attribs = [];

            options.childNodes.forEach(child => {
                const currentAttrib = {};
                const actualAttrib = child.childNodes[1];

                actualAttrib.childNodes.forEach(attrib => {
                    if (attrib.classList.contains('selected')) {
                        currentAttrib[(child.childNodes[0].innerText.slice(0, -1)).toLowerCase()] = attrib.innerText;
                        attribs.push(currentAttrib);
                    }
                });

                
            });

            this.setState({ selectedAttributes: attribs });

        } else {
            // product has only one text attribute
            parent.childNodes.forEach(child => {
                if (child.innerText === item.innerText) {
                    child.classList.add("selected");
                    this.setState({ selectedAttributes: child.innerText });
                } else {
                    child.classList.remove("selected");
                }
            });
        }
    }

    handleSwatchClick = (e) => {
        const item = e.target;
        const parent = item.parentNode;

        parent.childNodes.forEach(child => {
            if (child.id === item.id) {
                child.classList.add("selected-swatch");
                this.setState({ selectedSwatch: child.id });
            } else {
                child.classList.remove("selected-swatch");
            }
        });
    }

    render() {
        const { product } = this.props;
        const { currentCurrency } = this.context;
        const { selectedAttributes, selectedSwatch } = this.state;

        return(
            <CartConsumer>
                {cart => {
                    const { addToCart } = cart;
                    return(
                        <div className="attributes">
                            <div className="multiAttrib">
                                {product.attributes?.map(attrib => (
                                    <div key={attrib.name} className="attrib">
                                        <h4 className="attribName">{attrib.name}:</h4>
                                        {attrib.type === 'text' ? 
                                            <div className="textAttrib">
                                                {attrib.items.map(item => (
                                                    <div 
                                                    onClick={this.handleTextAttribClick} 
                                                    key={item.value}>
                                                    {item.value}
                                                    </div>
                                                ))}
                                            </div>
                                            :
                                            <div className="swatchAttrib">
                                                {attrib.items.map(item => (
                                                    <div 
                                                    id={item.value}
                                                    className="swatch" 
                                                    key={item.value}
                                                    style={{ backgroundColor: item.value }}
                                                    onClick={this.handleSwatchClick}
                                                    ></div>
                                                ))}
                                            </div>
                                        }
                                    </div>
                                ))}
                            </div>
            
                            <div className="attrib">
                                <h4 className="attribName">Price:</h4>
                                <p className="price">
                                {currentCurrency}{
                                    product.prices?.map(price => 
                                    price.currency.symbol === currentCurrency &&
                                    price.amount
                                    )
                                }
                                </p>
                            </div>
            
                            <button 
                            className={product.inStock && (selectedAttributes.length > 0 || selectedSwatch !== '') ? "addToCart" : "hidden"}
                            onClick={() => addToCart(product.id, { selectedAttributes: selectedAttributes, selectedSwatch: selectedSwatch })}
                            >
                                Add To Cart
                            </button>
            
                            
            
                            <div className="description">{parse(String(product.description))}</div>
                        </div>
                    );
                }}
            </CartConsumer>
        );

    }
}