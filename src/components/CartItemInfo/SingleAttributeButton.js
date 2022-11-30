import { PureComponent } from "react";

class SingleAttributeButton extends PureComponent {
    render() {
        const { attribute, selectedAttributes } = this.props;

        return(
            attribute.items.map(item => (
                <button 
                key={item.value}
                className={selectedAttributes === item.value ? "selected-attrib" : null}
                >
                {item.value}
                </button>
            ))
        );
    }
}

export default SingleAttributeButton;