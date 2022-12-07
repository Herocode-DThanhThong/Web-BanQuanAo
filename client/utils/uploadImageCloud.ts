import axios from "axios";
export const uploadImageToCloudinary = async (images: File[]) => {
  let imgArr = [];
  for (const item of images) {
    const formData = new FormData();
    formData.append("file", item);
    formData.append("upload_preset", process.env.CLOUD_UPLOAD_PRESET as string);
    formData.append("cloud_name", process.env.CLOUD_NAME as string);

    const { data } = await axios.post(
      process.env.CLOUD_API as string,
      formData
    );
    imgArr.push({ public_id: data.public_id, url: data.secure_url });
  }
  return imgArr;
};
