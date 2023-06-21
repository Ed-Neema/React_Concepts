const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend application's URL
  })
);

app.use(express.json());

const users = [
  {
    id: "1",
    username: "john",
    password: "John0908",
    isAdmin: true,
  },
  {
    id: "2",
    username: "jane",
    password: "Jane0908",
    isAdmin: false,
  },
];

let refreshTokens = [];

app.post("/api/refresh", (req, res) => {
  //take the refresh token from the user
  const refreshToken = req.body.token;
  //send error if no token or if token not valid
  if (!refreshToken) return res.status(401).json("Not Authenticated");
  if (!refreshTokens.includes(refreshToken)) {
    // if  refreshTokens array doesn't include the obtain token from body
    return res.status(403).json("Refresh token not valid");
  } else {
    // if it's in the array, verify it
    jwt.verify(refreshToken, "myRefreshSecretKey", (err, user) => {
      err && console.log(err);
    //   after verifying, remove it from array
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

      const newAccessToken = generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user);//create new token

      refreshTokens.push(newRefreshToken);//add it to the array
      res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
      })
    });
  }
  // if everthing is okay, create new access token,refresh token and send to user
});

const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, "mySecretKey", {
    expiresIn: "5s",
  });
};
const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, "myRefreshSecretKey");
};

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((user) => {
    return user.username === username && user.password === password;
  });
  if (user) {
    // generate an access token
    //added the payload and accesskey
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    refreshTokens.push(refreshToken);
    res.status(200).json({
      username: user.username,
      isAdmin: user.isAdmin,
      accessToken,
      refreshToken
    });
  } else {
    res.status(400).json("Username or Password incorrect");
  }
});
// function to verify whether accessToken is valid

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, "mySecretKey", (err, payload) => {
      if (err) {
        return res.status(403).json("Token not Valid");
      }
      req.user = payload;
      next();
    });
  } else {
    res.status(401).json("not authenticated");
  }
};

app.delete("/api/users/:userId", verify, (req, res) => {
  if (req.user.id === req.params.userId || req.user.isAdmin) {
    res.status(200).json("User has been deleted");
  } else {
    res.status(403).json("You are not allowed to delete this user");
  }
});

app.post("/api/logout", verify, (req, res) => {
  const refreshToken = req.body.token;
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  res.status(200).json("You logged out successfully.");
});

app.listen(5000, () => {
  console.log("Backend Server running");
});
