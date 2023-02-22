import path from 'path';
import fileUpload from 'express-fileupload';

class FileService {
  public saveFile(file: fileUpload.UploadedFile) {
    try {
      const fileName = file.name;
      const filePath = path.resolve('src/files', fileName);
      file.mv(filePath);
      console.log(`created file: ${filePath}`);
      return fileName;
    } catch (e) {
      console.log(e);
    }
  }
}

const fileService = new FileService();
export default fileService;
