import { Request } from "express";
import { BadRequest } from "../utils/helper/badRequest";
export const UploadService = {
  uploadImage: async (req: Request) => {
    const file = req.file;
    if (!file) {
      throw new BadRequest("Image not found", 400);
    }

    const fileUrl = `${req.protocol}://${req.get("host")}${
      process.env.BASE_URL || ""
    }/upload/image/${file.filename}`;
    return { filename: file.filename, url: fileUrl };
  },

  uploadFile: async (req: Request) => {
    const file = req.file;
    if (!file) {
      throw new BadRequest("File not found", 400);
    }

    const fileUrl = `${req.protocol}://${req.get("host")}${
      process.env.BASE_URL || ""
    }/upload/file/${file.filename}`;
    return { filename: file.filename, url: fileUrl };
  },
};
