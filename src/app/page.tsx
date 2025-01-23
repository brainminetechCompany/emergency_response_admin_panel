import { UserLocationModelUtils } from "@/model/userLocationModel";
import { UserLocationApi } from "@/services/userLocationApi";
import React from "react";

const Home = () => {
  async function upload() {
    const locationModel = UserLocationModelUtils.generateEmpty("123");
    const upload = await UserLocationApi.updateUserLocation(locationModel);
  }

  return <div></div>;
};

export default Home;
