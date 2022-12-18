export default (data) => {
    if (data.names === '') {
        return 'Remember your name!';
    }
    if (data.phoneNumber === '') {
        return 'Remember your phone number!';
    }

    return false;
};
