
export const getAllCategories = async () => {
    const query = `
        query {
            categories {
            name
            }
        }
    `;

    const opts = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
    }

   const response = await fetch('http://localhost:4000/', opts);
   const jsonResponse = await response.json();

   return jsonResponse.data.categories;
}

export const getProductsByCategoryName = async (categoryName) => {
    const query = `
        query {  
            category (input: { title: "${categoryName}" }) {
                name
                products {
                    id
                    name
                    brand
                    inStock
                    gallery
                    prices {
                        currency {
                            label
                            symbol
                        }
                    amount
                    }
                }
            }
        }
    `;

    const opts = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
    }

   const response = await fetch('http://localhost:4000/', opts);
   const jsonResponse = await response.json();

   return jsonResponse.data.category;
}

export const getAllCurrencies = async () => {
    const query = `
        query {  
            currencies {
            label
            symbol
            }
        }
    `;

    const opts = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
    }

   const response = await fetch('http://localhost:4000/', opts);
   const jsonResponse = await response.json();

   return jsonResponse.data.currencies;
}

export const getProductById = async (id) => {
    const query = `
        query {
            product (id: "${id}") {
                id
                gallery
                name
                inStock
                attributes {
                    name
                    type
                    items {
                        displayValue
                        value
                    }
                }
                prices {
                    currency {
                        label
                        symbol
                    }
                    amount
                }
                description
                brand
            }
        }
    `;

    const opts = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
    }

   const response = await fetch('http://localhost:4000/', opts);
   const jsonResponse = await response.json();

   return jsonResponse.data.product;
}