"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var project_model_1 = __importDefault(require("../Model/project.model"));
var section_model_1 = __importDefault(require("../Model/section.model"));
var devices_model_1 = __importDefault(require("../Model/devices.model"));
var system_model_1 = __importDefault(require("../Model/system.model"));
var AdImage_model_1 = __importDefault(require("../Model/AdImage.model"));
var client_model_1 = __importDefault(require("../Model/client.model"));
var service_model_1 = __importDefault(require("../Model/service.model"));
var mobileApp_model_1 = __importDefault(require("../Model/mobileApp.model"));
var vistor_mode_1 = __importDefault(require("../Model/vistor.mode"));
var router = (0, express_1.Router)();
router.get("/", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, devices, systems, sections, projects, clients, ImageAds, services, visitors, mobileApps, adImagesByType, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Promise.all([
                        devices_model_1.default.find({}, { __v: 0 }),
                        system_model_1.default.find({}, { __v: 0 }),
                        section_model_1.default.find({}, { _id: 0, __v: 0 }),
                        project_model_1.default.find({}, { _id: 0, __v: 0 }),
                        client_model_1.default.find({}, { _id: 0, __v: 0 }),
                        AdImage_model_1.default.find({}, { _id: 0, __v: 0 }),
                        service_model_1.default.find({}, { _id: 0, __v: 0 }),
                        vistor_mode_1.default.find({}, { _id: 0, __v: 0 }),
                        mobileApp_model_1.default.find({}, { __v: 0 }),
                    ])];
            case 1:
                _a = _b.sent(), devices = _a[0], systems = _a[1], sections = _a[2], projects = _a[3], clients = _a[4], ImageAds = _a[5], services = _a[6], visitors = _a[7], mobileApps = _a[8];
                adImagesByType = ImageAds.reduce(function (acc, image) {
                    var type = image.type;
                    if (!acc[type]) {
                        acc[type] = [];
                    }
                    acc[type].push(image);
                    return acc;
                }, {});
                return [2 /*return*/, res.status(200).send({
                        devices: devices,
                        systems: systems,
                        sections: sections,
                        projects: projects,
                        clients: clients[0],
                        ImageAds: adImagesByType,
                        services: services,
                        visitors: visitors,
                        mobileApps: mobileApps,
                        // donwloadLink: downloadLink[0].link,
                    })];
            case 2:
                error_1 = _b.sent();
                next(error_1.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
