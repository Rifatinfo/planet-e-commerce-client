import axios from "axios";

// upload image and return image 
export const imageUpload = async imageData => {
    const formData = new FormData();
    formData.append('image', imageData)
    //1. send image data to imgbb
    const {data} = await axios.post('https://api.imgbb.com/1/upload?key=e5264e7b07636aa10c758ebfbbd30940', formData);
    const image_url = data.data.url;
    return image_url;
}