import express from "express";
import AnnotationController from "./controllers/AnnotationController";

const routes = express.Router();

//Rota annotations
routes.get("/annotations", AnnotationController.read);
routes.post("/annotations", AnnotationController.create);

export default routes;
