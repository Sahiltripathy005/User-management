import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* normal CRUD */

export const getUsers = async (
  req,
  res
) => {
  const users = await User.find();
  res.json(users);
};

export const addUser =
  async (req, res) => {
    try {
      const {
        name,
        email,
        phone,
        age,
        comments,
      } = req.body;

      const existing =
        await User.findOne({
          email,
        });

      if (existing) {
        return res.status(400).json({
          message:
            "User already exists",
        });
      }

      const hashedPassword =
        await bcrypt.hash(
          "default123",
          10
        );

      const user =
        new User({
          name,
          email,
          phone,
          age,
          comments,
          password:
            hashedPassword,
          role: "user",
        });

      const saved =
        await user.save();

      res.status(201).json(
        saved
      );
    } catch (err) {
      res.status(500).json({
        message:
          "Add user failed",
      });
    }
  };

export const deleteUser = async (
  req,
  res
) => {
  await User.findByIdAndDelete(
    req.params.id
  );

  res.json({
    message: "Deleted",
  });
};

export const updateUser = async (
  req,
  res
) => {
  try {
    const updatedUser =
      await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.json(updatedUser);

  } catch (err) {
    res.status(500).json({
      message: "Update failed",
    });
  }
};

/* signup */

export const signupUser =
  async (req, res) => {
    try {
      const {
        name,
        email,
        password,
        role,
        phone,
        age,
        comments,
      } = req.body;

      const existing =
        await User.findOne({
          email,
        });

      if (existing) {
        return res.status(400).json({
          message:
            "User already exists",
        });
      }

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      const user =
        await User.create({
          name,
          email,
          password:
            hashedPassword,
          role,
          phone,
          age,
          comments,
        });

      res.status(201).json({
        message:
          "Signup successful",
        user,
      });
    } catch (err) {
      res.status(500).json({
        message:
          err.message ||
          "Signup failed",
      });
    }
  };

/* login */

export const loginUser =
  async (req, res) => {
    try {
      const {
        email,
        password,
      } = req.body;

      const user =
        await User.findOne({
          email,
        });

      if (!user) {
        return res.status(404).json({
          message:
            "User not found",
        });
      }

      const match =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!match) {
        return res.status(400).json({
          message:
            "Invalid password",
        });
      }

      const token =
        jwt.sign(
          {
            id: user._id,
            role: user.role,
          },
          process.env.JWT_SECRET,
          {
            expiresIn:
              process.env.JWT_EXPIRES,
          }
        );

      res.cookie(
        "token",
        token,
        {
          httpOnly: true,
          secure: false,
          sameSite:
            "lax",
        }
      );

      res.json({
        message:
          "Login successful",
        user: {
          _id: user._id,
          name: user.name,
          email:
            user.email,
          role: user.role,
        },
      });
    } catch (err) {
      res.status(500).json({
        message:
          "Login failed",
      });
    }
  };
/* logout */

export const logoutUser =
  async (req, res) => {
    res.clearCookie(
      "token"
    );

    res.json({
      message:
        "Logged out",
    });

  };

/* profile */

export const getProfile =
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.user.id
        ).select("-password");

      res.json(user);
    } catch (err) {
      res.status(500).json({
        message:
          "Profile fetch failed",
      });
    }

  };

export const changePassword =
  async (req, res) => {
    try {
      console.log(
        "REQ USER:",
        req.user
      );

      console.log(
        "REQ BODY:",
        req.body
      );

      const {
        currentPassword,
        newPassword,
      } = req.body;

      const user =
        await User.findById(
          req.user.id
        );

      console.log(
        "FOUND USER:",
        user
      );

      if (!user) {
        return res.status(404).json({
          message:
            "User not found",
        });
      }

      const match =
        await bcrypt.compare(
          currentPassword,
          user.password
        );

      console.log(
        "PASSWORD MATCH:",
        match
      );

      if (!match) {
        return res.status(400).json({
          message:
            "Current password incorrect",
        });
      }

      const hashedPassword =
        await bcrypt.hash(
          newPassword,
          10
        );

      user.password =
        hashedPassword;

      await user.save();

      res.json({
        message:
          "Password updated",
      });
    } catch (err) {
      console.log(
        "CHANGE PASSWORD ERROR:",
        err
      );

      res.status(500).json({
        message:
          err.message ||
          "Password update failed",
      });
    }
  };