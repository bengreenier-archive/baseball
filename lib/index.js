module.exports = exports = function makeBaseball(options) {
    if (typeof(options) === "string") {
        var messagePrefix = options;
        options = {
            messagePrefix: messagePrefix
        };
    } else if (typeof(options) === "function") {
        var logger = options;
        options = {
            logger: logger
        };
    } else if (typeof(options) === "undefined") {
        options = {};
    }
    options.logger = options.logger || console.error.bind(console);
    
    return function (err) {
        options.logger(options.messagePrefix ? options.messagePrefix + err : err);
    };
}