const crypto = require('crypto');
const stream = require('stream');
export default function(buffer: string): Promise<string> {
  return new Promise(resolve => {
    const md5 = crypto.createHash('md5');
    const theStream = new stream.PassThrough();
    theStream.end(buffer);
    theStream.on('data', (chunk: string): void => {
      md5.update(chunk);
    });
    theStream.on('end', (): void => {
      resolve(md5.digest('hex'));
    });
  });
}
