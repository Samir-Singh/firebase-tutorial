"use client";

import { useGlobalContext } from "@/context/GlobalProvider";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const { authentication } = useGlobalContext();
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [formData, setFormData] = useState({ email: "", password: "" });

  const signUpUser = () => {
    authentication
      .signupUserWithEmailAndPassword(formData.email, formData.password)
      .then(() => {
        alert("Success");
      })
      .catch((err) => {
        alert(err);
      });
  };

  const loginUser = () => {
    authentication
      .signInUserWithEmailAndPassword(loginForm.email, loginForm.password)
      .then((_) => {
        router.push("/about-us");
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleGoogleSignIn = async () => {
    authentication
      .signInUserWithProvider("Google")
      .then((_) => {
        router.push("/about-us");
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleGithubSignIn = async () => {
    authentication
      .signInUserWithProvider("Github")
      .then((_) => {
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
}
