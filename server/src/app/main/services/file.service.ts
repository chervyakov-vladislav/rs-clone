/* eslint-disable import/no-extraneous-dependencies */
import uuid from 'uuid';
import path from 'path';
import fileUpload from 'express-fileupload';

class FileService {
  public saveFile(file: fileUpload.UploadedFile) {
    try {
      const fileName = `${uuid.v4()}.jpg`;
      const filePath = path.resolve('static', fileName);
      file.mv(filePath);
      return fileName;
    } catch (e) {
      console.log(e);
    }
  }
}

const fileService = new FileService();
export default fileService;
