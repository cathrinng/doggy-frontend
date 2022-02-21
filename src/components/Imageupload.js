import React, { useState } from "react";

const Imageupload = () => {
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "img_url");
    data.append("cloud_name", "dbniwuu7z");

    fetch("  https://api.cloudinary.com/v1_1/dbniwuu7z/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="img-input">
      <input type="file" onChange={(e) => setImage(e.target.files[0])}></input>
      <button onClick={uploadImage}>Upload</button>
    </div>
  );
};
export default Imageupload;
