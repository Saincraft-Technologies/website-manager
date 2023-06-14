const rateLimit = require('express-rate-limit');
class RateLimit {
    #configService;
    #logger;
    constructor(configService, logger,
    ) {
        this.#configService = configService;
        this.rateLimit = rateLimit(this.#configService);
    }
}
module.exports = RateLimit;