import { PureComponent } from "react";
import ProductList from "../../components/ProductList/ProductList";

export default class CategoryPage extends PureComponent {
    render() {
        const { match } = this.props;

        return(
            <ProductList category={match.url} />
        );

    }
}