import toast from "react-hot-toast";
import apiClient from "../apiClient";

const deleteBrain = async (id: string) => {
  try {
    const res = await apiClient.delete(
      `/api/content/${id}`,
      {
        withCredentials: true,
      },
      
    );
    console.log("res in delete brain", res);
    if (res.status !== 200) {
      toast.error("Failed to delete content");
      return;
    }
    toast.success("Content deleted successfully");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  } catch (error) {
    toast.error("Failed to delete content");
    console.error(error);
  }
  toast.success("Content deleted successfully");
};

export default deleteBrain;
