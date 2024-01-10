"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/controllers/PriorityController.ts
var PriorityController_exports = {};
__export(PriorityController_exports, {
  default: () => PriorityController_default
});
module.exports = __toCommonJS(PriorityController_exports);

// src/models/AnnotationData.ts
var import_mongoose = __toESM(require("mongoose"));
var AnnotationDataSchema = new import_mongoose.default.Schema(
  {
    title: String,
    notes: String,
    priority: Boolean
  },
  { versionKey: false }
);
var AnnotationData_default = import_mongoose.default.model(
  "Annotations",
  AnnotationDataSchema
);

// src/controllers/PriorityController.ts
var PriorityController = {
  read(req, res) {
    return __async(this, null, function* () {
      try {
        const { priority } = req.query;
        const priorityNotes = yield AnnotationData_default.find({ priority });
        return res.json(priorityNotes);
      } catch (error) {
        console.error("Erro ao ler anota\xE7\xF5es por prioridade:", error);
        return res.status(500).json({ error: "Erro do Servidor Interno" });
      }
    });
  },
  update(req, res) {
    return __async(this, null, function* () {
      try {
        const { id } = req.params;
        const annotation = yield AnnotationData_default.findOne({ _id: id });
        if (annotation) {
          annotation.priority = !annotation.priority;
          yield annotation.save();
        } else {
          return res.status(404).json({ error: "Anota\xE7\xE3o n\xE3o encontrada" });
        }
        return res.json(annotation);
      } catch (error) {
        console.error("Erro ao atualizar anota\xE7\xF5es:", error);
        return res.status(500).json({ error: "Erro do Servidor Interno" });
      }
    });
  }
};
var PriorityController_default = PriorityController;
