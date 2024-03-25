"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var VisitorSchema = new mongoose_1.Schema({
    count: {
        type: Number,
        required: true,
    },
    isEnabled: {
        type: Boolean,
        required: true,
    },
});
var VisitorModel = (0, mongoose_1.model)("Visitor", VisitorSchema);
exports.default = VisitorModel;
