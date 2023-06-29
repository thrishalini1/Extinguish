var ImageKit = require("imagekit");
const fs = require("fs");
const path = require("path");


// const uploadLocalFile = (imagekitInstance, filePath, fileName) => {
//     const file = fs.createReadStream(filePath);
//     const response =  imagekitInstance.upload({ file, fileName });
//     return response;
//   };

var imagekit = new ImageKit({
    publicKey : "public_kihjdWkJcQHMmeUpP2E4FU/Og2Q=",
    privateKey : "private_/sskfnb5JRWagUEfKNiLhz5J9Uo=",
    urlEndpoint : "https://ik.imagekit.io/uxv7hoiuz"
});

// const FILE_PATH = path.resolve(__dirname, "../uploads/recent.jpg")
// const FILE_PATH = path.resolve(__dirname, "../uploads/Main Resume.pdf")
const FILE_PATH = path.resolve(__dirname, "../uploads/sample_video.mp4")
// const response = uploadLocalFile(imagekit, FILE_PATH, `my_pic.jpg`);
// console.log(`Binary upload response :`, JSON.stringify(response, undefined, 2), "\n");

const file = fs.createReadStream(FILE_PATH);
// const file_name ="my_pic.jpg";
// const response =  imagekit.upload({ file:file, fileName:file_name });
// console.log(response)
var fileId ;
imagekit.upload({
    file : file ,//required
    fileName : "recent",   //required
    // extensions: [
    //     // {
    //     //     name: "google-auto-tagging",
    //     //     maxTags: 5,
    //     //     minConfidence: 95
    //     // },
    //     // {
    //     //     "name": "remove-bg",
    //     //     "options": {
    //     //         "add_shadow": true,
                
    //     //     }
    //     // }
    // ]
}).then(response => {
    fileId = response.fileId;

    console.log(response);

}).catch(error => {
    console.log(error);
});