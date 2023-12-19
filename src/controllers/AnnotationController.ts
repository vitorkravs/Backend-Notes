import { Request, Response } from "express";
import Annotations from "../models/AnnotationData";

const annotationController = {
  async read(req: Request, res: Response) {
    try {
      const annotationList = await Annotations.find();
      return res.json(annotationList);
    } catch (error) {
      console.log("Erro ao ler anotações:", error);
      return res.status(500).json({ error: "Erro do Servidor Interno" });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const { title, notes, priority } = req.body;

      if (!title || !notes) {
        return res.status(400).json({ error: "Forneça um título e/ou notas." });
      }

      const annotationCreate = await Annotations.create({
        title,
        notes,
        priority,
      });

      return res.json(annotationCreate);
    } catch (error) {
      console.log("Erro ao criar anotação:", error);
      return res.status(500).json({ error: "Erro do Servidor Interno" });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, notes, priority } = req.body;

      if (!title && !notes && priority === undefined) {
        return res
          .status(400)
          .json({ error: "Forneça pelo menos um campo para atualização." });
      }

      const updatedAnnotation = await Annotations.findByIdAndUpdate(
        id,
        { title, notes, priority },
        { new: true } // Returns the updated document
      );

      if (updatedAnnotation) {
        return res.json(updatedAnnotation);
      }

      return res
        .status(404)
        .json({ error: "Registro não encontrado para atualização!" });
    } catch (error) {
      console.log("Erro ao atualizar anotação:", error);
      return res.status(500).json({ error: "Erro do Servidor Interno" });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const deletedAnnotation = await Annotations.findByIdAndDelete(id);

      if (deletedAnnotation) {
        return res.json(deletedAnnotation);
      }

      return res
        .status(404)
        .json({ error: "Registro não encontrado para exclusão!" });
    } catch (error) {
      console.log("Erro ao excluir anotação:", error);
      return res.status(500).json({ error: "Erro do Servidor Interno" });
    }
  },
};

export default annotationController;
