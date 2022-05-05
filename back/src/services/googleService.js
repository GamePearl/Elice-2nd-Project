import { User } from "../db";
import axios from "axios";
import jwt from "jsonwebtoken";

class GoogleService {
  static base64urlDecode = (str) => {
    return Buffer.from(this.base64urlUnescape(str), "base64").toString();
  };

  static base64urlUnescape = (str) => {
    str += Array(5 - (str.length % 4)).join("=");
    return str.replace(/\-/g, "+").replace(/_/g, "/");
  };

  static addUser = async ({ newUser }) => {
    const user = await User.create({ newUser });
    return user;
  };

  static checkUser = async ({ userId, email, nickname, loginMethod }) => {
    const user = await User.findByEmail({ email });
    if (user) {
      if (user.userId === userId) {
        const secretKey = process.env.JWT_SECRET_KEY;
        const token = jwt.sign({ user_id: userId }, secretKey);

        const loginUser = { token, userId, nickname, email };
        return loginUser;
      } else if (user.loginMethod !== loginMethod) {
        throw new Error(
          `${user.loginMethod}로 가입한 이력이 있습니다. ${user.loginMethod}로 로그인해주세요.`
        );
      }
    } else {
      const newUser = {
        email,
        nickname,
        userId,
        loginMethod,
        password: "noPassword!",
      };
      const createdNewUser = await this.addUser({ newUser });

      const registerUser = { ...createdNewUser, register: true };
      return registerUser;
    }
  };

  static getUserData = async ({ payload }) => {
    const { sub, email, name } = payload;
    return this.checkUser({
      userId: sub,
      email,
      nickname: name,
      loginMethod: "Google",
    });
  };

  static getToken = async () => {
    const uri = "https://oauth2.googleapis.com/token";
    const config = {
      code,
      client_id: process.env.GOOGLE_CLIENT,
      client_secret: process.env.GOOGLE_SECRET,
      redirect_uri: "http://localhost:3000/auth/google/callback",
    };
    const params = new URLSearchParams(config);

    const finalUrl = `${uri}?${params}&grant_type=authorization_code`;

    const tokenRequest = await axios.post(finalUrl, config);
    const idToken = tokenRequest.data.id_token.split(".");
    const payload = JSON.parse(this.base64urlDecode(idToken[1]));
    return this.getUserData({ payload });
  };
}

export { GoogleService };