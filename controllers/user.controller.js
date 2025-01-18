const userSchema = require('../models/user.model') 
const hashing = require('../utilities/hashing')
const auth = require('../utilities/auth')

exports.createUser = async (req, res) => {
  try {
    const {password , ReEnterPassword} = req.body
    if (password !== ReEnterPassword) {
      return res.status(400).json({ error: "Password doesn't match" });
    }
    const hashedPassword = await hashing.hashPassword(req.body.password);
    req.body.password = hashedPassword ;

    delete req.body.ReEnterPassword;
    const user = await userSchema.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.login = async (req , res) => {
  try {
    const {email , password} = req.body
    const user = await userSchema.findOne({email}) 
    if (user) {
      const isMatch = await hashing.isMatch(password , user.password)
      if (isMatch) {
        /// return access token

        const token = auth.createAccessToken({userId : user._id , name : user.name , email : user.email , role : user.role})
        res.status(200).json({ accessToken : token})
      } else {
        res.status(400).json({error : "Invalid password"})
      }
    } else {
      res.status(400).json({error : "Invalid email"})
    }
  } catch (err) {
    res.status(500).json({error: err.message})
  }
}

exports.getUsers = async(req,res) => {
  try {
    const users = await userSchema.find()
    res.status(200).send(users)
  } catch (err) {
    res.status(500).json({error: err.message})
  }
  }

  exports.updateUserRole = async (req, res) => {
    const userId = req.params.id;
    const { role } = req.body; 

    try {
      const user = await userSchema.findByIdAndUpdate(
        userId,
        { role },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: "Error updating user role" });
    }
  };     