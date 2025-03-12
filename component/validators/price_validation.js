const validatePrice = (value) => {        
    const priceRegex = /^[+-]?\d+(\.\d{2})?$/;
    const test_results = priceRegex.test(value);
    return test_results
};

export default validatePrice;