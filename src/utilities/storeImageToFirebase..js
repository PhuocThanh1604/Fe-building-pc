import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "src/firebase";
import { v4 as uuid4 } from "uuid";

export const storeImageToFireBase = async (uploadedImage) => {
  if (uploadedImage === null) {
    return {
      isSuccess: false,
      imageUrl: "",
      message: "Upload image failed",
    };
  }
  const imageRef = ref(storage, `images/${uploadedImage.name}${uuid4()}`);
  try {
    const response = await uploadBytes(imageRef, uploadedImage);
    const url = await getDownloadURL(response.ref);

    return {
      isSuccess: true,
      imageUrl: url,
      message: "Upload image successfully",
    };
  } catch (ex) {
    return {
      isSuccess: false,
      imageUrl: "",
      message: "Upload image failed",
    };
  }
};
