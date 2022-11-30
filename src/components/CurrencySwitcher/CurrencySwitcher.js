import React, { PureComponent } from "react";
import arrow from '../../assets/arrow.svg';
import './CurrencySwitcher.css';
import { getAllCurrencies } from "../../graphql/queries";
import CurrencyContext from "../../context/CurrencyContext";


export default class CurrencySwitcher extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            currencies: [],
            isOpened: false,
        };
        this.wrapperRef = React.createRef();
        this.toggleSwitcher = this.toggleSwitcher.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    static contextType = CurrencyContext;

    componentDidMount() {
        getAllCurrencies()
        .then(data => this.setState({ currencies: data }));
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    toggleSwitcher() {
        this.state.isOpened ? this.setState({ isOpened: false }) : this.setState({ isOpened: true });
    }
    
    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            this.setState({ isOpened: false });
        }
    }

    render() {
        const { currencies, isOpened } = this.state;
        
        const { currentCurrency,setCurrency } = this.context;

        return(
            <div className="currencySwitcher" ref={this.wrapperRef}>
                <button onClick={this.toggleSwitcher}>
                    {currentCurrency}
                    <img src={arrow} alt="arrow" />
                </button>

                <div className={ isOpened ? "currencies" : "hidden"}>
                    <ul>
                        {currencies.map(currency => (
                            <li 
                            key={currency.symbol}
                            onClick={() => setCurrency(currency.symbol)}
                            >
                            {currency.symbol}{currency.label}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );

    }
}
