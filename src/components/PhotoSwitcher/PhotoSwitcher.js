import { PureComponent } from "react";
import './PhotoSwitcher.css';

export default class PhotoSwitcher extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            bigPhotoIndex: 0,
        };
        this.handlePhotoSwitch = this.handlePhotoSwitch.bind(this);
    }

    handlePhotoSwitch(newIndex) {
        this.setState({ bigPhotoIndex: newIndex });
    }
    
    render() {
        const { gallery } = this.props;
        const { bigPhotoIndex } = this.state;

        return(
            <div className="photos">
                <div className="smPhotos">
                    {gallery?.map((photo, i) => 
                    (
                    <img 
                    onClick={() => this.handlePhotoSwitch(i)}
                    key={i}
                    src={photo}
                    alt="Item"
                    />
                    ))}
                </div>
                <div className="bigPhoto">
                    <img 
                    src={gallery?.[bigPhotoIndex]} 
                    alt="Big"
                    />
                </div>
            </div>
        );
    }
}