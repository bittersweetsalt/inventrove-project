const validateNumber = (value) => {        
    const floatRegex = /^[+-]?\d+(\.\d+)?$/;
    const test_results = !floatRegex.test(value);
    return test_results
};

export default validateNumber;