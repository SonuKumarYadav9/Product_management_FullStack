const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { uploadFile } = require("../aws/awsS3");


const registerUSer = async (req, res) => {
  try {
    let data = req.body;
    let { name, email, password} = data;
    let image = req.files[0];


    if (name && email && password && image) {
  
      // data.image = await uploadFile(files);
      // let savedData = await userModel.create(req.body)
      let saveddata = await new userModel({
        name,
        email,
        password,
        image: await uploadFile(image),
      });
      let newSavedData = await saveddata.save();

      // generate Token as usecase of required when user create

      const token = jwt.sign(
        {
          userID: newSavedData._id.toString(),
        },
        "sonukumaryadavkey",
        {
          expiresIn: "2d",
        }
      );

      return res.status(201).json({ status: true, data: newSavedData, token });
    } else {
      return res
        .status(400)
        .json({ status: true, msg: "All Field Are Required" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ status: false, msg: error.message });
  }
};

const userLogin = async (req, res) => {
  try {
    let { email, password } = req.body;

    if ((email && password)) {
      let isUser = await userModel.findOne({ email: email });
      console.log(isUser)
      if (isUser) {
        let token =jwt.sign(
          {
            userID: isUser._id.toString(),
          },
          "sonukumaryadavkey",
          { expiresIn: "2d" }
        );
        return res
          .status(200)
          .json({ status: true, mesg: "Login Succes", data: token ,userID:isUser._id,name:isUser.name});
      } else {
        return res.status(404).json({ status: true, msg: "User Not Found" });
      }
    } else {
      return res
        .status(400)
        .json({ status: false, msg: "All fields are required to Login " });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, msg: error.message });
  }
};

module.exports = { registerUSer, userLogin };
