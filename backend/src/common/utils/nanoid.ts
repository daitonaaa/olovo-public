import { randomFill } from 'crypto';

const urlAlphabet =
  'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';

const random = (bytes) =>
  new Promise((resolve, reject) => {
    // `Buffer.allocUnsafe()` is faster because it doesn’t flush the memory.
    // Memory flushing is unnecessary since the buffer allocation itself resets
    // the memory with the new bytes.
    randomFill(Buffer.allocUnsafe(bytes), (err, buf) => {
      if (err) {
        /* c8 ignore next */
        reject(err);
      } else {
        resolve(buf);
      }
    });
  });

export const nanoid = (size = 21) =>
  random(size).then((bytes) => {
    let id = '';
    // A compact alternative for `for (var i = 0; i < step; i++)`.
    while (size--) {
      // It is incorrect to use bytes exceeding the alphabet size.
      // The following mask reduces the random byte in the 0-255 value
      // range to the 0-63 value range. Therefore, adding hacks, such
      // as empty string fallback or magic numbers, is unneccessary because
      // the bitmask trims bytes down to the alphabet size.
      id += urlAlphabet[bytes[size] & 63];
    }
    return id;
  });
