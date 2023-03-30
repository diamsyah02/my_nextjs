import AES from "crypto-js/aes";
import { enc } from "crypto-js";
export const encryptX = (str: string) => {
  const ciphertext = AES.encrypt(str, "secretPassphrase");
  return encodeURIComponent(ciphertext.toString());
};

export const decryptX = (str: string) => {
  const decodedStr = decodeURIComponent(str);
  return AES.decrypt(decodedStr, "secretPassphrase").toString(enc.Utf8);
};
