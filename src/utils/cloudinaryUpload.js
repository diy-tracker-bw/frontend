import axios from 'axios';

const cloudinaryUpload = async file => {
  const timestamp = Date.now() / 1000;
  let formData = new FormData();
  formData.append('api_key', process.env.REACT_APP_CLOUDINARY_APIKEY);
  formData.append('file', file);
  formData.append('timestamp', timestamp);
  formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET);

  try {
    const res = await axios.post(
      process.env.REACT_APP_CLOUDINARY_URL,
      formData,
      { headers: { 'X-Requested-With': 'XMLHttpRequest' } },
    );
    return res.data.url;
  } catch (error) {
    console.log(error);
  }
};

export default cloudinaryUpload;
