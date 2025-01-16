import { EncryptionHandler } from "@/lib/encryption-utils";
import { UserType } from "@/lib/enums";
import { Timestamp } from "firebase/firestore";

export interface UserModel {
  uuid: string; // Unique identifier
  name: string; // Encrypted user's name
  phoneNumber: string; // Encrypted contact number
  email?: string; // Encrypted optional email address
  userType: UserType; // User type (user, moderator, admin)
  pushToken: string; // Token for push notifications
  profilePicture?: string; // URL or path to the user's profile picture
  isActive: boolean; // Status indicating if the user is active
  lastLoginAt?: Timestamp; // Last login timestamp
  createdAt: Timestamp; // Account creation timestamp
  updatedAt: Timestamp; // Last update timestamp
}

// Namespace for UserModel utilities
export namespace UserModelUtils {
  // Check if a field is encrypted (base64 check)
  function isEncrypted(text: string): boolean {
    const base64Regex = /^[A-Za-z0-9+/]+={0,2}$/;
    return base64Regex.test(text);
  }

  // Encrypt a field if it is not already encrypted
  function encryptIfNeeded(text: string): string {
    return isEncrypted(text) ? text : EncryptionHandler.encryptPHIText(text);
  }

  // Decrypt a field if it is encrypted
  function decryptIfNeeded(text: string): string {
    return isEncrypted(text) ? EncryptionHandler.decryptPHIText(text) : text;
  }

  // Convert UserModel to JSON, encrypting sensitive fields
  export function toJson(user: UserModel): Record<string, any> {
    return {
      uuid: user.uuid,
      name: encryptIfNeeded(user.name),
      phoneNumber: encryptIfNeeded(user.phoneNumber),
      email: user.email ? encryptIfNeeded(user.email) : undefined,
      userType: user.userType,
      pushToken: user.pushToken,
      profilePicture: user.profilePicture || null,
      isActive: user.isActive,
      lastLoginAt: user.lastLoginAt?.toMillis() || null,
      createdAt: user.createdAt.toMillis(),
      updatedAt: user.updatedAt.toMillis(),
    };
  }

  // Convert JSON to UserModel, decrypting sensitive fields
  export function fromJson(json: Record<string, any>): UserModel {
    return {
      uuid: json.uuid,
      name: decryptIfNeeded(json.name),
      phoneNumber: decryptIfNeeded(json.phoneNumber),
      email: json.email ? decryptIfNeeded(json.email) : undefined,
      pushToken: json.pushToken,
      userType: json.userType as UserType,
      profilePicture: json.profilePicture || undefined,
      isActive: json.isActive,
      lastLoginAt: json.lastLoginAt
        ? Timestamp.fromMillis(json.lastLoginAt)
        : undefined,
      createdAt: Timestamp.fromMillis(json.createdAt),
      updatedAt: Timestamp.fromMillis(json.updatedAt),
    };
  }

  // Generate an empty UserModel instance with default values
  export function generateEmpty(): UserModel {
    const now = Timestamp.now();
    return {
      uuid: "",
      name: "",
      phoneNumber: "",
      pushToken: "",
      userType: UserType.user,
      isActive: false,
      createdAt: now,
      updatedAt: now,
    };
  }
}
