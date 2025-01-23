import { db } from "@/config/firebase_config";
import {
  UserLocationModel,
  UserLocationModelUtils,
} from "@/model/userLocationModel";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

export class UserLocationApi {
  static collectionName: string = "userLocations";

  static async updateUserLocation(
    userLocation: UserLocationModel
  ): Promise<boolean> {
    try {
      const collectionRef = collection(db, this.collectionName);
      const docRef = doc(collectionRef, userLocation.uuid);
      await setDoc(docRef, UserLocationModelUtils.toJson(userLocation));
      return true;
    } catch (error) {
      console.error("Failed to update user location:", error);
    }
    return false;
  }

  static async getUserLocation(
    userUuid: string
  ): Promise<UserLocationModel | undefined> {
    return undefined;
  }
}
