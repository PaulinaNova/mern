import express from "express";
const router = express.Router();
import Gestor from "../models/gestorModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Log in
router.post("/login", async (req, res) => {
  //const { userName, password } = req.body;
  const userName = req.body.userName;
  const password = req.body.password;
  // Look for user email in the database
  const gestor = await Gestor.findOne({
    userName: userName,
  });

  // If user not found, send error message
  if (!gestor) {
    return res.status(400).json({
      errors: [
        {
          msg: "No se encontró este usuario.",
        },
      ],
    });
  }

  const isAdmin = gestor.isAdmin;
  // Compare hased password with user password to see if they are valid
  const isMatch = await bcrypt.compare(password, gestor.password);

  if (!isMatch) {
    return res.status(401).json({
      errors: [
        {
          msg: "El usuario o la contraseña no son correctos.",
        },
      ],
    });
  }

  // Send JWT access token
  const accessToken = jwt.sign({ userName }, "secret", {
    expiresIn: "1m",
  });

  // Refresh token
  const refreshToken = jwt.sign({ userName }, "secret", {
    expiresIn: "5m",
  });

  // Set refersh token in refreshTokens array
  refreshTokens.push(refreshToken);

  res.json({
    userName,
    isAdmin,
    accessToken,
    refreshToken,
  });
});

let refreshTokens = [];

// Create new access token from refresh token
router.post("/token", async (req, res) => {
  const refreshToken = req.header("x-auth-token");

  // If token is not provided, send error message
  if (!refreshToken) {
    res.status(401).json({
      errors: [
        {
          msg: "Token not found",
        },
      ],
    });
  }

  // If token does not exist, send error message
  if (!refreshTokens.includes(refreshToken)) {
    res.status(403).json({
      errors: [
        {
          msg: "Invalid refresh token",
        },
      ],
    });
  }

  try {
    const gestor = jwt.verify(refreshToken, "secret");
    // user = { email: 'jame@gmail.com', iat: 1633586290, exp: 1633586350 }
    const { userName } = gestor;
    const accessToken = jwt.sign(
      { userName },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1m",
      }
    );
    res.json({ accessToken });
  } catch (error) {
    res.status(403).json({
      errors: [
        {
          msg: "Invalid token",
        },
      ],
    });
  }
});

// Deauthenticate - log out
// Delete refresh token
router.delete("/logout", (req, res) => {
  const refreshToken = req.header("x-auth-token");

  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  res.sendStatus(204);
});

export default router;
