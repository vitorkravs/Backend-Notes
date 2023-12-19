import express from "express";
import AnnotationController from "./controllers/AnnotationController";
import PriorityController from "./controllers/PriorityController";

const routes = express.Router();

//Rota annotations
routes.get("/annotations", AnnotationController.read);
routes.post("/annotations", AnnotationController.create);
routes.delete("/annotations/:id", AnnotationController.delete);
routes.put("/annotations/:id", AnnotationController.update);

//Rota Priority
routes.get("/priorities", PriorityController.read);

export default routes;
