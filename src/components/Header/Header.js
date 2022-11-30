import { PureComponent } from "react";
import logo from '../../assets/logo.svg';
import './Header.css';
import CurrencySwitcher from "../CurrencySwitcher/CurrencySwitcher";
import Cart from "../Cart/Cart";
import { Link } from 'react-router-dom';
import { getAllCategories } from '../../graphql/queries';

class Header extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
        };
    }

    componentDidMount () {
        getAllCategories()
        .then(data => this.setState({ categories: data }));
    }

    render() {

        const { categories } = this.state;

        return(
            <header>
                <div className="headerContainer">
                    <nav>
                        <ul>
                            {categories?.map(category => <Link className="navLinks" key={category.name} to={`/${category.name}`}>{category.name}</Link>)}
                        </ul>
                    </nav>

                    <div className="logo">
                        <img src={logo} alt="logo" />
                    </div>

                    <div className="options">
                        <CurrencySwitcher />

                        <Cart />
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;