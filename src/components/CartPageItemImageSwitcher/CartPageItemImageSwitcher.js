import { PureComponent } from "react";
import './CartPageItemImageSwitcher.css';

class CartPageItemImageSwitcher extends PureComponent {
    state = {
        currentPhotoIndex: 0,
    };

    moveRight = () => {
        const { images } = this.props;
         
        this.setState((currState) => {
            if (currState.currentPhotoIndex < images.length) {
                return { currentPhotoIndex: currState.currentPhotoIndex + 1 };
            }
        });
    }

    moveLeft = () => {
        const { images } = this.props;
         
        this.setState((currState) => {
            if (currState.currentPhotoIndex <= images.length - 1) {
                return { currentPhotoIndex: currState.currentPhotoIndex - 1 };
            }
        });
    }

    render() {
        const { images } = this.props;
        const { currentPhotoIndex } = this.state;

        return(
            <div className="photo-switcher">
                <img src={images?.[currentPhotoIndex]} alt="Product" />

                <div className="switcher-buttons">
                    <button 
                    className={currentPhotoIndex === 0 ? "dimmed-button-left" : "left-button"} 
                    onClick={this.moveLeft} 
                    disabled={currentPhotoIndex === 0}
                    ></button>
                    <button 
                    className={currentPhotoIndex === images?.length - 1 ? "dimmed-button-right" : "right-button"}
                    onClick={this.moveRight} 
                    disabled={currentPhotoIndex === images?.length - 1}
                    ></button>
                </div>
            </div>
        );
    }
}

export default CartPageItemImageSwitcher;