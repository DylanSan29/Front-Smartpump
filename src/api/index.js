import axiosInstance from "./axiosInstance";

const fetchUserDetails = async () => {
  try {
    const response = await axiosInstance.get("/user/details");
  } catch (error) {
    console.error(error);
  }
};

export { fetchUserDetails };
