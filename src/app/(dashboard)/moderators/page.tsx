"use client";
import React, { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/config/firebase_config";
import { UserModelUtils } from "@/model/userModel"; // Adjust import path
import { UserType } from "@/lib/enums";
import { Timestamp } from "firebase/firestore";
import { UserModel } from "@/model/userModel";

export default function ModeratorsPage() {
  const [showModal, setShowModal] = useState(false);
  const [moderators, setModerators] = useState<UserModel[]>([]);
  const [newModerator, setNewModerator] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewModerator((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddModerator = async () => {
    try {
      const moderatorData: UserModel = {
        ...UserModelUtils.generateEmpty(),
        name: newModerator.name,
        email: newModerator.email,
        phoneNumber: newModerator.phoneNumber,
        userType: UserType.moderator,
        isActive: true,
        pushToken: "", // You might want to handle this differently
        uuid: "",

        // Firebase will generate a unique ID
      };
      console.log(UserModelUtils.toJson(moderatorData));

      const docRef = await addDoc(
        collection(db, "moderators"),
        UserModelUtils.toJson(moderatorData)
      );
      console.log(docRef, "ok");
      // Update local state
      setModerators([...moderators, moderatorData]);

      // Reset form
      setNewModerator({ name: "", email: "", phoneNumber: "" });
      setShowModal(false);
    } catch (error) {
      console.error("Error adding moderator:", error);
    }
  };
  useEffect(() => {
    const moderatorsRef = collection(db, "moderators");
    const moderatorsQuery = query(
      moderatorsRef,
      where("userType", "==", UserType.moderator)
    );

    const unsubscribe = onSnapshot(
      moderatorsQuery,
      (querySnapshot) => {
        const fetchedModerators: UserModel[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data() as UserModel;
          fetchedModerators.push(UserModelUtils.fromJson(data));
        });

        setModerators(fetchedModerators);
      },
      (error) => {
        console.error("Error fetching moderators:", error);
      }
    );

    return () => unsubscribe();
  }, []);
  const dbc = moderators;
  console.log(dbc);
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Moderator
        </button>
      </div>

      {/* Moderators Table */}
      <div className="bg-white shadow-md rounded">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Email</th>
              <th className="text-left p-3">Phone</th>
            </tr>
          </thead>
          <tbody>
            {dbc.map((mod, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-3">{mod.name}</td>
                <td className="p-3">{mod.email}</td>
                <td className="p-3">{mod.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-96 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add Moderator</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={newModerator.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={newModerator.email}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={newModerator.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddModerator}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
