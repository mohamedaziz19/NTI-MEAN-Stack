
// const User = require("../models/user.model");

// exports.addAdmin = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const newAdmin = new User({
//       email,
//       password,
//       role: "admin", 
//     });
//     await newAdmin.save();
//     res
//       .status(201)
//       .json({ message: "Admin added successfully!", admin: newAdmin });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Failed to add admin", error: error.message });
//   }
// };
