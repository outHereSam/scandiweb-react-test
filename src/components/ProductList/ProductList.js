import { PureComponent } from "react";
import { getProductsByCategoryName } from "../../graphql/queries";
import './ProductList.css';
import { Link } from "react-router-dom";
import { CurrencyConsumer } from "../../context/CurrencyContext";

export default class ProductList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            currentCurrency: '$',
            products: [],
        }; 
    }


    componentDidMount() {
        getProductsByCategoryName(this.props.category.slice(1))
        .then(data => this.setState({ products: data.products }));
        const currencyFromLocalStorage = JSON.parse(localStorage.getItem('currentCurrency'));
        this.setState({ currentCurrency: currencyFromLocalStorage });
    } 

    componentDidUpdate(prevProps) {
        if (this.props.category.slice(1) !== prevProps.category.slice(1)) {
            getProductsByCategoryName(this.props.category.slice(1))
            .then(data => this.setState({ products: data.products }));
        }
    }

    render() {
        const { products } = this.state;
        const { category } = this.props;

        return(
            <CurrencyConsumer>
                {props => {
                    const { currentCurrency } = props;

                    return (
                        <div className="pageContainer">
                            <h1 className="categoryName">{category.slice(1)}</h1>

                            <div className="products">
                                {products.map(product => (
                                    <Link className="productLink" to={`/products/${product.id}`} key={product.id}>
                                        <div className="item">
                                            <div className={product.inStock ? "hidden" : "stock-overlay"}>Out of Stock</div>
                                            <img src={product.gallery[0]} alt={product.name} />
                                            <p className="productName">{product.brand} {product.name}</p>
                                            <p className="price">{currentCurrency}{
                                                product.prices.map(price => 
                                                price.currency.symbol === currentCurrency &&
                                                price.amount
                                                )
                                            }</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                    );
                }}

            </CurrencyConsumer>
        );
    }
}