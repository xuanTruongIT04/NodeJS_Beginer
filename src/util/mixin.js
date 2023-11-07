const limitChar = (str, cntChar) => {
    if (str.length > cntChar) return (str = str.substring(0, cntChar));
};

module.exports = { limitChar };
