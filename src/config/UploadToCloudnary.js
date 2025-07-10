export const uploadToCloudnary = async (image) => {
    if (image) {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "goldenblog");
        data.append("cloud_name", "ddxuqqssn")
 
        const res = await fetch("https://api.cloudinary.com/v1_1/ddxuqqssn/image/upload",{
            method: "POST",
            body: data,
        })
 
        const fileData = await res.json();
        console.log("fileData: ",fileData.url.toString());
        return fileData.url.toString();
    }
}

export default uploadToCloudnary