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
    if (res.status !== 200) {
      toast.error("Failed to delete content");
      return;
    }
    toast.success("Content deleted successfully");
    setTimeout(() => {
      window.location.reload();
    }, 500);
  } catch (error: unknown) {
    toast.error("Failed to delete content");
    if (error instanceof Error) {
      console.error(error);
      return error.message;
    }
    return "An unknown error occurred";
  }
  toast.success("Content deleted successfully");
};

export default deleteBrain;
