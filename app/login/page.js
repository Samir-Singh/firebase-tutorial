"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/GlobalProvider";

const Signup = () => {
  const router = useRouter();
  const {
    signInUserWithEmailAndPassword,
    signupUserWithEmailAndPassword,
    signInUserWithProvider,
    putAuth,
  } = useGlobalContext();
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [formData, setFormData] = useState({ email: "", password: "" });

  const signUpUser = () => {
    signupUserWithEmailAndPassword(formData.email, formData.password)
      .then(() => {
        alert("Success");
      })
      .catch((err) => {
        alert(err);
      });
  };

  const loginUser = () => {
    signInUserWithEmailAndPassword(loginForm.email, loginForm.password)
      .then((res) => {
        putAuth(res.user.accessToken);
        router.push("/about-us");
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleGoogleSignIn = async () => {
    signInUserWithProvider("Google")
      .then((res) => {
        putAuth(res.user.accessToken);
        router.push("/about-us");
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleGithubSignIn = async () => {
    signInUserWithProvider("Github")
      .then((res) => {
        putAuth(res.user.accessToken);
        router.push("/about-us");
      })
      .catch((err) => {
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
        </button>{" "}
        /{" "}
        <button
          onClick={handleGoogleSignIn}
          className="border bg-gray-300 px-2 rounded-sm cursor-pointer"
        >
          Google Sign In
        </button>{" "}
        /{" "}
        <button
          onClick={handleGithubSignIn}
          className="border bg-gray-300 px-2 rounded-sm cursor-pointer"
        >
          Github Sign In
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
