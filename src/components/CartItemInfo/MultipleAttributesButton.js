import { PureComponent } from "react";

class MultipleAttributesButton extends PureComponent {
    render() {
        const { attribute, selectedAttributes } = this.props;

        return(
            attribute.items.map((item) => (
                <button 
                key={item.value}
                className={
                    selectedAttributes.some(attr => attr[attribute.name.toLowerCase()] === item.value) ? "selected-attrib" : null
                }
                >
                {item.value}
                </button>
            ))
        );
    }
}

export default MultipleAttributesButton;