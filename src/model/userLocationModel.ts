import { GeoPoint, Timestamp } from "firebase/firestore";

export interface UserLocationModel {
  uuid: string; // Same as the user model
  currentLocation: GeoPoint;
  lastUpdatedAt: Timestamp;
}

export namespace UserLocationModelUtils {
  // Converts a UserLocationModel instance to a JSON object
  export function toJson(userLocation: UserLocationModel): Record<string, any> {
    return {
      uuid: userLocation.uuid,
      currentLocation: {
        latitude: userLocation.currentLocation.latitude,
        longitude: userLocation.currentLocation.longitude,
      },
      lastUpdatedAt: userLocation.lastUpdatedAt.toMillis(),
    };
  }

  // Converts a JSON object to a UserLocationModel instance
  export function fromJson(json: Record<string, any>): UserLocationModel {
    return {
      uuid: json.uuid,
      currentLocation: new GeoPoint(
        json.currentLocation.latitude,
        json.currentLocation.longitude
      ),
      lastUpdatedAt: Timestamp.fromMillis(json.lastUpdatedAt),
    };
  }

  // Generates an empty UserLocationModel instance with default values
  export function generateEmpty(uuid: string): UserLocationModel {
    return {
      uuid,
      currentLocation: new GeoPoint(0, 0), // Default to (0, 0)
      lastUpdatedAt: Timestamp.now(),
    };
  }
}
