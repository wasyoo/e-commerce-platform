import fs from 'fs';

export const fileMutations = `
  uploadFile(input: InputFile): File
`;

const storeFS = (stream, filename) => {
  const name = `${Date.now()}${Math.floor(Math.random() * 10000) + 999}.${filename.split('.').pop()}`;
  const path = `${process.env.UPLOAD_DIR}/${name}`;

  return new Promise((resolve, reject) =>
    stream
      .on('error', (error) => {
        if (stream.truncated) fs.unlinkSync(path);
        reject(error);
      })
      .pipe(fs.createWriteStream(path))
      .on('error', (error) => reject(error))
      .on('finish', () => resolve({ name, path })));
};

export const fileResolvers = {
  uploadFile: async (parent, { input }) => {
    const { stream, filename } = await input.file;
    const { name } = await storeFS(stream, filename);
    return {
      filename: name,
    };
  },
};
