import { Request, Response } from "express";
import Annotations from "../models/AnnotationData";

const annotationController = {
  async read(req: Request, res: Response) {
    try {
      const { priority } = req.query;
      const priorityNotes = await Annotations.find({ priority });
      return res.json(priorityNotes);
    } catch (error) {
      console.error("Erro ao ler anotações por prioridade:", error);
      return res.status(500).json({ error: "Erro do Servidor Interno" });
    }
  },
};

export default annotationController;
