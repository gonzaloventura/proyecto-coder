const isUser = (name) => {
    let nombre = name.toLowerCase();
    if (nombre === VALID_NAME) {
        return true;
    } else {
        return false;
    }
}