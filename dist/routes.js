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

// src/routes.ts
var routes_exports = {};
__export(routes_exports, {
  default: () => routes_default
});
module.exports = __toCommonJS(routes_exports);
var import_express = __toESM(require("express"));

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

// src/controllers/AnnotationController.ts
var annotationController = {
  read(req, res) {
    return __async(this, null, function* () {
      try {
        const annotationList = yield AnnotationData_default.find();
        return res.json(annotationList);
      } catch (error) {
        console.log("Erro ao ler anota\xE7\xF5es:", error);
        return res.status(500).json({ error: "Erro do Servidor Interno" });
      }
    });
  },
  create(req, res) {
    return __async(this, null, function* () {
      try {
        const { title, notes, priority } = req.body;
        if (!title || !notes) {
          return res.status(400).json({ error: "Forne\xE7a um t\xEDtulo e/ou notas." });
        }
        const annotationCreate = yield AnnotationData_default.create({
          title,
          notes,
          priority
        });
        return res.json(annotationCreate);
      } catch (error) {
        console.log("Erro ao criar anota\xE7\xE3o:", error);
        return res.status(500).json({ error: "Erro do Servidor Interno" });
      }
    });
  },
  update(req, res) {
    return __async(this, null, function* () {
      try {
        const { id } = req.params;
        const { title, notes, priority } = req.body;
        if (!title && !notes && priority === void 0) {
          return res.status(400).json({ error: "Forne\xE7a pelo menos um campo para atualiza\xE7\xE3o." });
        }
        const updatedAnnotation = yield AnnotationData_default.findByIdAndUpdate(
          id,
          { title, notes, priority },
          { new: true }
          // Returns the updated document
        );
        if (updatedAnnotation) {
          return res.json(updatedAnnotation);
        }
        return res.status(404).json({ error: "Registro n\xE3o encontrado para atualiza\xE7\xE3o!" });
      } catch (error) {
        console.log("Erro ao atualizar anota\xE7\xE3o:", error);
        return res.status(500).json({ error: "Erro do Servidor Interno" });
      }
    });
  },
  delete(req, res) {
    return __async(this, null, function* () {
      try {
        const { id } = req.params;
        const deletedAnnotation = yield AnnotationData_default.findByIdAndDelete(id);
        if (deletedAnnotation) {
          return res.json(deletedAnnotation);
        }
        return res.status(404).json({ error: "Registro n\xE3o encontrado para exclus\xE3o!" });
      } catch (error) {
        console.log("Erro ao excluir anota\xE7\xE3o:", error);
        return res.status(500).json({ error: "Erro do Servidor Interno" });
      }
    });
  }
};
var AnnotationController_default = annotationController;

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

// src/routes.ts
var routes = import_express.default.Router();
routes.get("/annotations", AnnotationController_default.read);
routes.post("/annotations", AnnotationController_default.create);
routes.delete("/annotations/:id", AnnotationController_default.delete);
routes.put("/annotations/:id", AnnotationController_default.update);
routes.get("/priorities", PriorityController_default.read);
routes.put("/priorities/:id", PriorityController_default.update);
var routes_default = routes;
