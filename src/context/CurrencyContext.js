import React, { PureComponent } from 'react';

const CurrencyContext = React.createContext();
export const CurrencyConsumer = CurrencyContext.Consumer;

export class CurrencyProvider extends PureComponent {
    state = {
        currentCurrency: '$',
    }

    componentDidMount() {
        this.setState({ currentCurrency: JSON.parse(localStorage.getItem('currentCurrency')) });
    }

    setCurrency = (newCurrency) => {
        this.setState({ currentCurrency: newCurrency });
        localStorage.setItem('currentCurrency', JSON.stringify(newCurrency));
    }

    render() {
        const { currentCurrency } = this.state;
        const { setCurrency } = this;

        return(
            <CurrencyContext.Provider value={{ currentCurrency, setCurrency }}>
                {this.props.children}
            </CurrencyContext.Provider>
        );
    }
}

export default CurrencyContext;