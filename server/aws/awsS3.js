const aws = require("aws-sdk");

/* ------------------------------------------------aws config -------------------------------------------------------- */
// aws.config.update({
//     accessKeyId: "AKIAY3L35MCRVFM24Q7U",
//     secretAccessKey: "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",
//     region: "ap-south-1"
// })

// /* ------------------------------------------------aws fileUpload-------------------------------------------------------- */
// let uploadFile = async (file) => {
//     return new Promise(function (resolve, reject) {
//         let s3 = new aws.S3({ apiVersion: '2006-03-01' }); 

//         var uploadParams = {
//             ACL: "public-read",
//             Bucket: "classroom-training-bucket",  
//             Key: "sonu/" + file.originalname,
//             Body: file.buffer
//         }


//         s3.upload(uploadParams, function (err, data) {
//             if (err) {
//                 return reject({ "error": err })
//             }
//             console.log("file uploaded succesfully")
//             return resolve(data.Location)
//         })
//     })
// }
// module.exports.uploadFile = uploadFile


aws.config.update({
    accessKeyId: "AKIAY3L35MCRZNIRGT6N",
    secretAccessKey: "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",
    region: "ap-south-1"
});

let uploadFile = async(file) => {
    return new Promise(function(resolve, reject) {

        let s3 = new aws.S3({ apiVersion: "2006-03-01" })

        var uploadParams = {
            ACL: "public-read",         // access control list
            Bucket: "classroom-training-bucket",
            Key: "Sonu/" + file.originalname,
            Body: file.buffer
        }
        s3.upload(uploadParams, function(err, data) {
            if (err) {
                return reject({ "error": err })
            }

            return resolve(data.Location)
        })
    })      
};

module.exports = { uploadFile }