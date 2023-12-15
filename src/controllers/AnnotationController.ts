import Annotations from "../models/AnnotationData";

export default {
  async read(req: any, res: any) {
    const annotationList = await Annotations.find();
    return res.json(annotationList);
  },

  async create(req: any, res: any) {
    const { title, notes, priority } = req.body;

    if (!title || !notes) {
      return res
        .status(400)
        .json({ error: "Necessário que insira um título e/ou Anotação" });
    }

    const annotationCreate = await Annotations.create({
      title,
      notes,
      priority,
    });

    return res.json(annotationCreate);
  },
};
