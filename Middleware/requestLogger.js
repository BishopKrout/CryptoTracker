const requestLogger = (req, res, next) => {
    console.log(`${reg.method} ${reg.path}`);
    next();
};

module.exports = requestLogger;