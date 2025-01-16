import * as aesjs from "aes-js";

export class EncryptionHandler {
  // FOR THE LOVE OF GOD PLEASE DO NOT CHANGE THIS CODE FOR ANY REASON
  static secretKey: string = "pUVxaozOrf7TcPYClSCfmRpN0kZm17P4";

  static encryptPHIText(text: string): string {
    const key = aesjs.utils.utf8.toBytes(this.secretKey); // Convert key to bytes
    const iv = new Uint8Array(16); // All zeros IV
    const textBytes = aesjs.utils.utf8.toBytes(text); // Convert input text to bytes

    // Ensure the textBytes length is a multiple of 16 for AES block size
    const paddedBytes = aesjs.padding.pkcs7.pad(textBytes);

    const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(iv)); // AES CTR mode
    const encryptedBytes = aesCtr.encrypt(paddedBytes); // Encrypt the padded bytes

    return Buffer.from(encryptedBytes).toString("base64"); // Encode result as Base64
  }

  static decryptPHIText(base64Text: string): string {
    try {
      const key = aesjs.utils.utf8.toBytes(this.secretKey); // Convert key to bytes
      const iv = new Uint8Array(16); // All zeros IV
      const encryptedBytes = Buffer.from(base64Text, "base64"); // Decode Base64 to bytes

      const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(iv)); // AES CTR mode
      const decryptedBytes = aesCtr.decrypt(encryptedBytes); // Decrypt the bytes

      const unpaddedBytes = aesjs.padding.pkcs7.strip(decryptedBytes); // Remove PKCS7 padding
      return aesjs.utils.utf8.fromBytes(unpaddedBytes).trim(); // Convert to string
    } catch (error) {
      console.error("Decryption failed:", error);
      return "";
    }
  }
}
