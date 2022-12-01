import { PureComponent } from "react";
import './CartItemInfo.css';
import SingleAttributeButton from "./SingleAttributeButton";
import MultipleAttributesButton from "./MultipleAttributesButton";


class CartItemInfo extends PureComponent {

    render() {
        const { product, selectedAttributes } = this.props;
        
        
        return(
            <div className="attribs">
                {product.attributes?.map((attribute, i) => (
                    attribute.type === 'text'?
                    <div key={i} className="text">
                        <h3 className="attrib-name">{attribute.name}:</h3>
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
                    <div key={i} className="color-swatch">
                        <h3 className="attrib-name">{attribute.name}:</h3>
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
        );
    }
}

export default CartItemInfo;