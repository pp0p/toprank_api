"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimiterMiddleware = void 0;
var rate_limiter_flexible_1 = require("rate-limiter-flexible");
var MAX_REQUEST_LIMIT = 100;
var MAX_REQUEST_WINDOW = 15 * 60; // Per 15 minutes by IP
var options = {
    duration: MAX_REQUEST_WINDOW,
    points: MAX_REQUEST_LIMIT,
};
var rateLimiter = new rate_limiter_flexible_1.RateLimiterMemory(options);
var rateLimiterMiddleware = function (req, res, next) {
    rateLimiter
        .consume(req.ip)
        .then(function () {
        next();
    })
        .catch(function () {
        res.status(429).json({ message: "Too many requests" });
    });
};
exports.rateLimiterMiddleware = rateLimiterMiddleware;
