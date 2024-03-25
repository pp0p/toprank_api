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
var mobileApp_model_1 = __importDefault(require("../Model/mobileApp.model"));
var multer_1 = __importDefault(require("../config/multer"));
var util_1 = __importDefault(require("util"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var config_1 = require("../config/config");
var unlinkAsync = util_1.default.promisify(fs_1.default.unlink);
var router = (0, express_1.Router)();
// Get a mobile app by ID
router.get("/:id", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, mobileApp, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, mobileApp_model_1.default.findById(id)];
            case 2:
                mobileApp = _a.sent();
                if (!mobileApp) {
                    return [2 /*return*/, res.status(404).send({ message: "Mobile app not found" })];
                }
                return [2 /*return*/, res.send(mobileApp)];
            case 3:
                error_1 = _a.sent();
                next(error_1.message);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Create a new mobile app
router.post("/", multer_1.default.fields([
    { name: "imageCover", maxCount: 1 },
    { name: "mobileImage1", maxCount: 1 },
    { name: "mobileImage2", maxCount: 1 },
    { name: "mobileImage3", maxCount: 1 },
]), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, description, files, basePath, imageCoverPath, mobileImages, i, fieldName, newMobileApp, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, title = _a.title, description = _a.description;
                files = req.files;
                basePath = req.hostname === "localhost"
                    ? "http://localhost:".concat(config_1.config.port, "/public/")
                    : "https://api.toprankiq.com/public/";
                imageCoverPath = (files === null || files === void 0 ? void 0 : files["imageCover"])
                    ? "".concat(basePath).concat(files["imageCover"][0].filename)
                    : "";
                mobileImages = [];
                for (i = 1; i <= 3; i++) {
                    fieldName = "mobileImage".concat(i);
                    if (files[fieldName]) {
                        mobileImages.push("".concat(basePath).concat(files[fieldName][0].filename));
                    }
                }
                newMobileApp = new mobileApp_model_1.default({
                    name: title,
                    description: description,
                    imageCover: imageCoverPath,
                    images: mobileImages,
                });
                return [4 /*yield*/, newMobileApp.save()];
            case 1:
                _b.sent();
                return [2 /*return*/, res
                        .status(201)
                        .send({ message: "Mobile app created successfully" })];
            case 2:
                error_2 = _b.sent();
                next(error_2.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Get all mobile apps
router.get("/", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var mobileApps, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, mobileApp_model_1.default.find({})];
            case 1:
                mobileApps = _a.sent();
                if (mobileApps.length === 0) {
                    return [2 /*return*/, res.status(404).send({ message: "No mobile apps to show" })];
                }
                return [2 /*return*/, res.send(mobileApps)];
            case 2:
                error_3 = _a.sent();
                next(error_3.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Update a mobile app by ID
router.put("/:id", multer_1.default.fields([
    { name: "image", maxCount: 1 },
    { name: "mobileImage1", maxCount: 1 },
    { name: "mobileImage2", maxCount: 1 },
    { name: "mobileImage3", maxCount: 1 },
]), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, description, id, mobileApp, files, basePath, imageCoverPath, mobileImages, i, fieldName, updatedMobileApp, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, title = _a.title, description = _a.description;
                id = req.params.id;
                return [4 /*yield*/, mobileApp_model_1.default.findById(id)];
            case 1:
                mobileApp = _b.sent();
                if (!mobileApp) {
                    return [2 /*return*/, res.status(404).send({ message: "Mobile app not found" })];
                }
                files = req.files;
                basePath = req.hostname === "localhost"
                    ? "http://localhost:".concat(config_1.config.port, "/public/")
                    : "https://api.toprankiq.com/public/";
                imageCoverPath = (files === null || files === void 0 ? void 0 : files["image"])
                    ? "".concat(basePath).concat(files["image"][0].filename)
                    : "";
                mobileImages = [];
                for (i = 1; i <= 3; i++) {
                    fieldName = "mobileImage".concat(i);
                    if (files[fieldName]) {
                        mobileImages.push("".concat(basePath).concat(files[fieldName][0].filename));
                    }
                }
                return [4 /*yield*/, mobileApp_model_1.default.findByIdAndUpdate(id, {
                        name: title,
                        description: description,
                        imageCover: imageCoverPath || mobileApp.imageCover,
                        images: mobileImages,
                    }, { new: true })];
            case 2:
                updatedMobileApp = _b.sent();
                if (!updatedMobileApp) {
                    return [2 /*return*/, res.status(500).send({ message: "Failed to update mobile app" })];
                }
                return [2 /*return*/, res
                        .status(200)
                        .send({ message: "Mobile app updated successfully" })];
            case 3:
                error_4 = _b.sent();
                next(error_4.message);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Delete a mobile app by ID
router.delete("/:id", function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, removedItem, removedImageCover, removedImages, splitCoverPath, imageCoverFilePath, _i, removedImages_1, imagePath, splitPath, imageFilePath, err_1, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 11, , 12]);
                return [4 /*yield*/, mobileApp_model_1.default.findByIdAndRemove(id)];
            case 2:
                removedItem = _a.sent();
                if (!removedItem) {
                    return [2 /*return*/, res.sendStatus(404)];
                }
                removedImageCover = removedItem.imageCover;
                removedImages = removedItem.images;
                _a.label = 3;
            case 3:
                _a.trys.push([3, 9, , 10]);
                splitCoverPath = removedImageCover.split("/");
                imageCoverFilePath = path_1.default.join(__dirname, "../../public", splitCoverPath[splitCoverPath.length - 1]);
                return [4 /*yield*/, unlinkAsync(imageCoverFilePath)];
            case 4:
                _a.sent();
                _i = 0, removedImages_1 = removedImages;
                _a.label = 5;
            case 5:
                if (!(_i < removedImages_1.length)) return [3 /*break*/, 8];
                imagePath = removedImages_1[_i];
                splitPath = imagePath.split("/");
                imageFilePath = path_1.default.join(__dirname, "../../public", splitPath[splitPath.length - 1]);
                return [4 /*yield*/, unlinkAsync(imageFilePath)];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7:
                _i++;
                return [3 /*break*/, 5];
            case 8: return [3 /*break*/, 10];
            case 9:
                err_1 = _a.sent();
                console.error(err_1);
                return [2 /*return*/, res.status(500).send({ message: "Error deleting image files" })];
            case 10: return [2 /*return*/, res
                    .status(200)
                    .send({ message: "Mobile app deleted successfully" })];
            case 11:
                error_5 = _a.sent();
                next(error_5.message);
                return [3 /*break*/, 12];
            case 12: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
