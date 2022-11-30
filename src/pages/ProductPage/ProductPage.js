import { PureComponent } from "react";
import { getProductById } from "../../graphql/queries";
import PhotoSwitcher from "../../components/PhotoSwitcher/PhotoSwitcher";
import Attributes from "../../components/Attributes/Attributes";
import './ProductPage.css';


export default class ProductPage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            product: [],
        };
    }

    componentDidMount() {
        const { match } = this.props;

        const productId = match.url.slice(10);

        getProductById(productId)
        .then(data => this.setState({ product: data }))
        .catch(err => console.log(err));
    }

    render() {

        const { product } = this.state;
        
        return(
            <div className="pageContainer">
                <div className="productPage">
                    <div className="photoSection">
                        <PhotoSwitcher gallery={product.gallery} />
                    </div>

                    <div className="infoSection">
                       <h1 className="brandName">{product.brand}</h1>
                       <h1 className="productName">{product.name}</h1>

                       <Attributes product={product} />   
                    </div>
                </div>
            </div>
        );
    }
}