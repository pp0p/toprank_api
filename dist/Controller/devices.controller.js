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
var multer_1 = __importDefault(require("../config/multer"));
var util_1 = __importDefault(require("util"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var devices_model_1 = __importDefault(require("../Model/devices.model"));
var unlinkAsync = util_1.default.promisify(fs_1.default.unlink);
var router = (0, express_1.Router)();
// get single item
router.get("/:id", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, device, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, devices_model_1.default.findById(id)];
            case 2:
                device = _a.sent();
                if (!device) {
                    return [2 /*return*/, res.status(404).send({ message: "العنصر غير موجود" })];
                }
                return [2 /*return*/, res.send(device)];
            case 3:
                error_1 = _a.sent();
                next(error_1.message);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// created device
router.post("/", multer_1.default.single("image"), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, description, price, type, betaLink, imagePath, newDevice, error_2;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                _a = req.body, title = _a.title, description = _a.description, price = _a.price, type = _a.type, betaLink = _a.betaLink;
                imagePath = "https://api.toprankiq.com/public/".concat((_b = req.file) === null || _b === void 0 ? void 0 : _b.filename);
                newDevice = new devices_model_1.default({
                    name: title,
                    price: price,
                    description: description,
                    image: imagePath,
                    type: type,
                    betaLink: betaLink,
                });
                return [4 /*yield*/, newDevice.save()];
            case 1:
                _c.sent();
                return [2 /*return*/, res.status(201).send({ message: "تم إضافة جهاز جديد بنجاح" })];
            case 2:
                error_2 = _c.sent();
                console.log(error_2);
                next(error_2.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// get members
router.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var team;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, devices_model_1.default.find({})];
            case 1:
                team = _a.sent();
                if (team.length === 0) {
                    return [2 /*return*/, res.status(404).send({ message: "no device to show" })];
                }
                return [2 /*return*/, res.send(team)];
        }
    });
}); });
// update device
router.put("/:id", multer_1.default.single("image"), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, description, price, id, device, imagePath, updatedDevice, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, title = _a.title, description = _a.description, price = _a.price;
                id = req.params.id;
                return [4 /*yield*/, devices_model_1.default.findById(id)];
            case 1:
                device = _b.sent();
                if (!device) {
                    return [2 /*return*/, res.status(404).send({ message: "العنصر غير موجود" })];
                }
                imagePath = req.file
                    ? "https://api.toprankiq.com/public/".concat(req.file.filename)
                    : undefined;
                return [4 /*yield*/, devices_model_1.default.findByIdAndUpdate(id, {
                        name: title,
                        description: description,
                        price: price,
                        image: imagePath || device.image, // Use new image if provided, otherwise retain the old image
                    }, { new: true } // Return the updated document
                    )];
            case 2:
                updatedDevice = _b.sent();
                if (!updatedDevice) {
                    return [2 /*return*/, res.status(500).send({ message: "فشل في تحديث العنصر" })];
                }
                return [2 /*return*/, res.status(200).send({ message: "تم تحديث العنصر بنجاح" })];
            case 3:
                error_3 = _b.sent();
                next(error_3.message);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// remove device
router.delete("/:id", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, removedItem, splitPath, imagePath, err_1, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                return [4 /*yield*/, devices_model_1.default.findByIdAndRemove(id)];
            case 2:
                removedItem = _a.sent();
                if (!removedItem) {
                    return [2 /*return*/, res.sendStatus(404)];
                }
                splitPath = removedItem.image.split("/");
                imagePath = path_1.default.join(__dirname, "../../public", splitPath[splitPath.length - 1]);
                _a.label = 3;
            case 3:
                _a.trys.push([3, 5, , 6]);
                return [4 /*yield*/, unlinkAsync(imagePath)];
            case 4:
                _a.sent();
                return [3 /*break*/, 6];
            case 5:
                err_1 = _a.sent();
                console.error(err_1);
                return [2 /*return*/, res.status(500).send({ message: "Error deleting image file" })];
            case 6: return [2 /*return*/, res.status(200).send({ message: "تم الحذف بنجاح" })];
            case 7:
                error_4 = _a.sent();
                next(error_4.message);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
