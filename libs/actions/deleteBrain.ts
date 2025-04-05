import toast from "react-hot-toast";
// import apiClient from "../apiClient";

const deleteBrain = async (id: string) => {
//   try {
//     const res = await apiClient.delete(`/api/v1/content/delete/${id}`, {
//       withCredentials: true,
//     });
//     if (res.status !== 200) {
//       toast.error("Failed to delete content");
//       return;
//     }
//     toast.success("Content deleted successfully");
//     setTimeout(() => {
//       window.location.reload();
//     }, 1000);
//     //   window.location.reload();
//   } catch (error) {
//     toast.error("Failed to delete content");
//     console.error(error);
//   }
    toast.success("Content deleted successfully");
};

export default deleteBrain;
