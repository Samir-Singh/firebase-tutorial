"use client";

import { useState } from "react";
import { app } from "../firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const Signup = () => {
  const auth = getAuth(app);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [formData, setFormData] = useState({ email: "", password: "" });

  const signUpUser = () => {
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then((res) => {
        console.log(res);
        alert("Success");
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  const loginUser = () => {
    signInWithEmailAndPassword(auth, loginForm.email, loginForm.password)
      .then((res) => {
        console.log(res);
        alert("Success");
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  return (
    <div>
      <h1 className="text-xl font-medium">Login with email and password</h1>
      <div className="mt-5">
        Email :{" "}
        <input
          type="email"
          value={loginForm?.email}
          className="border px-2 rounded-sm"
          placeholder="Enter Email"
          onChange={(e) =>
            setLoginForm((prev) => ({
              ...prev,
              email: e.target.value,
            }))
          }
        />
      </div>

      <div className="mt-2">
        Password :{" "}
        <input
          type="password"
          value={loginForm?.password}
          className="border px-2 rounded-sm"
          placeholder="Enter Password"
          onChange={(e) =>
            setLoginForm((prev) => ({
              ...prev,
              password: e.target.value,
            }))
          }
        />
      </div>
      <div className="mt-3">
        <button
          onClick={loginUser}
          className="border bg-gray-300 px-2 rounded-sm cursor-pointer"
        >
          Login
        </button>
      </div>

      <h1 className="text-xl font-medium my-5">Or</h1>
      <h1 className="text-xl font-medium">Signup with email and password</h1>
      <div className="mt-5">
        Email :{" "}
        <input
          type="email"
          value={formData?.email}
          className="border px-2 rounded-sm"
          placeholder="Enter Email"
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              email: e.target.value,
            }))
          }
        />
      </div>

      <div className="mt-2">
        Password :{" "}
        <input
          type="password"
          value={formData?.password}
          className="border px-2 rounded-sm"
          placeholder="Enter Password"
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              password: e.target.value,
            }))
          }
        />
      </div>
      <div className="mt-3">
        <button
          onClick={signUpUser}
          className="border bg-gray-300 px-2 rounded-sm cursor-pointer"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Signup;
