const validateStrings = (value) => {
    const strings = /^[a-zA-Z0-9_.\s-]+$/; // Allows letters, numbers, ., -, and _
    return !strings.test(value);
};

export default validateStrings;