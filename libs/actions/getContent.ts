import toast from "react-hot-toast";
import apiClient from "../apiClient";
import axios from "axios";

const getContent = async () => {
  try {
    const content = await apiClient.get("/api/content", {
      withCredentials: true,
    });
    
    if (content.status !== 200) {
      console.error("error occured while getting content: ", content);
    }
    const allContents = await content.data.contents;
    return allContents;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 429) {
        console.warn("Too many requests. Please wait a moment.");
        toast.error("Too many requests. Please wait a moment.");
      } else {
        console.error("API error:", error.message);
        toast.error(error.message);
      }
    } else {
      console.error("Unexpected error:", error);
    }
  }
};

export default getContent;
