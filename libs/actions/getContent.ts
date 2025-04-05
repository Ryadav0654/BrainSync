import toast from "react-hot-toast";
import apiClient from "../apiClient";

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
    toast.error("Failed to get content");
    console.error("error occured while getting content: ", error);
  }
};

export default getContent;
