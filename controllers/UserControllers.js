const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
// Post a User
const newUserRegister = async (req, res) => {
  const { file } = req;
  const {
    first_name,
    last_name,
    father_name,
    mother_name,
    employee_id,
    email,
    alternate_email,
    phone,
    alternate_phone,
    dob,
    gender,
    country,
    city,
    state,
    zip_code,
    sudo_name,
    blood_group,
    designation,
    department,
    marital_status,
    doj,
    password,
    confirm_password,
    role,
    account_holder_name,
    bank_name,
    ifsc,
    account_number,
    branch_name,
    upi_id,
    registered_phone,
    aadhar,
  } = req.body;

  // Check if password and confirm_password match
  if (password !== confirm_password) {
    res.send({ Message: "Password and confirm password do not match." });
    return;
  }

  const existing_user = await UserModel.findOne({ employee_id });

  if (existing_user) {
    res.send({ Message: "User already exist" });
    return;
  }
  bcrypt.hash(password, 4, async function (err, hash) {
    if (err) {
      res.send({ Message: "Registration Failed", err });
    } else {
      const new_user = new UserModel({
        first_name,
        last_name,
        father_name,
        mother_name,
        employee_id,
        email,
        alternate_email,
        phone,
        alternate_phone,
        dob,
        gender,
        country,
        city,
        state,
        zip_code,
        sudo_name,
        blood_group,
        designation,
        department,
        marital_status,
        doj,
        password: hash,
        confirm_password: hash,
        role,
        account_holder_name,
        bank_name,
        ifsc,
        account_number,
        branch_name,
        upi_id,
        registered_phone,
        aadhar,
        name: file.originalname,
        path: file.path,
      });

      await new_user.save();
      res.send({ Message: "Signup succesfull..", new_user });
    }
  });
};

const login = async (req, res) => {
  const { employee_id, password } = req.body;

  const user = await UserModel.findOne({ employee_id });

  if (user) {
    const hashed_password = user.password;

    const user_id = user._id;

    bcrypt.compare(password, hashed_password, function (err, result) {
      if (err) {
        res.send({ Message: "Something went wrong, try again later" });
      }
      if (result) {
        const token = jwt.sign({ user_id }, process.env.SECRET);
        const name = user.name;
        const path = user.path;
        const first_name = user.first_name;
        const last_name = user.last_name;
        const father_name = user.father_name;
        const mother_name = user.mother_name;
        const email = user.email;
        const alternate_email = user.alternate_email;
        const phone = user.phone;
        const alternate_phone = user.alternate_phone;
        const dob = user.dob;
        const gender = user.gender;
        const country = user.country;
        const city = user.city;
        const state = user.state;
        const zip_code = user.zip_code;
        const sudo_name = user.sudo_name;
        const blood_group = user.blood_group;
        const designation = user.designation;
        const department = user.department;
        const marital_status = user.marital_status;
        const doj = user.doj;
        const account_holder_name = user.account_holder_name;
        const bank_name = user.bank_name;
        const ifsc = user.ifsc;
        const account_number = user.account_number;
        const branch_name = user.branch_name;
        const upi_id = user.upi_id;
        const registered_phone = user.registered_phone;
        const aadhar = user.aadhar;
        const employee_id = user.employee_id;
        const role = user.role;
        const id = user._id;
        const document = {
          name: name,
          path: path,
          first_name: first_name,
          last_name: last_name,
          father_name: father_name,
          mother_name: mother_name,
          email: email,
          alternate_email: alternate_email,
          phone: phone,
          alternate_phone: alternate_phone,
          employee_id: employee_id,
          id: id,
          role: role,
          dob: dob,
          gender: gender,
          country: country,
          city: city,
          state: state,
          zip_code: zip_code,
          sudo_name: sudo_name,
          blood_group: blood_group,
          designation: designation,
          department: department,
          marital_status: marital_status,
          doj: doj,
          account_holder_name: account_holder_name,
          bank_name: bank_name,
          ifsc: ifsc,
          account_number: account_number,
          branch_name: branch_name,
          upi_id: upi_id,
          registered_phone: registered_phone,
          aadhar: aadhar,
          token: token,
        };
        res.send({
          Message: "Login Successfull",
          document: document,
          token: token,
        });
      } else {
        res.send({ Message: "Invalid Credentials" });
      }
    });
  } else {
    res.send({ Message: "Invalid Credentials" });
  }
};

// Get a user
const getUser = async (req, res) => {
  try {
    const user = await UserModel.find();
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get User By Id
const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const singleUser = await UserModel.findOne({ _id: id });

    res.status(404).send({ Message: "Single User By Id", singleUser });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Edit User
// const editUser = async (req, res) => {
//   try {
//     const users = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     if (!users) {
//       return res.status(404).send();
//     }
//     res.send({ Message: "User updated successfully", users });
//   } catch (error) {
//     res.status(400).send(error);
//   }
// };

// Controller
const editUser = async (req, res) => {
  const { file } = req;
  try {
    const updateObject = { ...req.body };
    if (file) {
      updateObject.path = file.path;
    }
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      updateObject,
      {
        new: true,
      }
    );
    if (!updatedUser) {
      return res.status(404).send({ error: "User not found" });
    }
    res.send({ Message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .send({ error: "An error occurred while updating the user." });
  }
};

// Delete Task
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await UserModel.deleteOne({ _id: id });
    res.send({ Message: "User deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  newUserRegister,
  login,
  getUser,
  getSingleUser,
  deleteUser,
  editUser,
};
