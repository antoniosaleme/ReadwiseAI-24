// import { v4 as uuid } from 'uuid';

// export const fileNamer = (
//   req: Express.Request,
//   file: Express.Multer.File,
//   callback: (error: Error | null, fileName: string) => void,
// ) => {
//   if (!file) return callback(new Error('No file provided'), '');

//   const shortUuid = uuid().split('-')[0];
//   const fileName = `${shortUuid}-${file.originalname.replace(/\.[^/.]+$/, '')}`; // take the original name and remove the extension

//   callback(null, fileName);
// };
