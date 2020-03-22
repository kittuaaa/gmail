const checkIfPositiveNumber = (number) => {
    return (number && Number(number) > 0) ? 1 : 0 ;
};

const checkIfTextIsAlphaNumeric = (text) => {
    return !(/[^a-z 0-9]/gi).test(text);
};

module.exports = { checkIfPositiveNumber,checkIfTextIsAlphaNumeric };
