
import React, { useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { SiFirebase } from "react-icons/si";
import instance from "../utils/axios";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase";

const Loginmodel = ({ onclose, log }) => {
  const modelRef = useRef(null);

  const handlegoogleauth = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      console.log("User signed in:", result);

      const resultapi = await instance.post("api/auth/googleauth", {
        token: result.user.accessToken,
      });

      console.log("Server response:", resultapi.data);

      // Login successful
      log();

      // Modal close
      onclose();

    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 backdrop-blur-[2px] w-full h-full bg-black/60 flex items-center justify-center z-50">

      <div
        ref={modelRef}
        className="bg-[#232323] flex flex-col rounded-[10px] w-[400px] h-[200px] overflow-hidden"
      >

        {/* Close button */}
        <div className="w-full flex justify-end">
          <button
            className="text-white text-[20px] px-4 py-2"
            onClick={onclose}
          >
            <IoMdClose className="hover:scale-105 text-gray-400 hover:text-white active:scale-100" />
          </button>
        </div>

        {/* Heading */}
        <div className="w-full h-fit flex flex-col justify-center items-center text-white text-[20px]">
          <span>Sign In to FresherAI</span>

          <span className="text-sm text-gray-400">
            continue your ai interview journey
          </span>
        </div>

        {/* Google Login */}
        <button
          onClick={handlegoogleauth}
          className="mx-auto mt-[20px] border-[0.5px] active:scale-95 hover:bg-white/30 hover:scale-105 transition duration-100 border-gray-500 rounded-[7px] bg-white/20 flex py-[5px] px-[40px] items-center gap-[7px]"
        >
          <FcGoogle />

          <span className="text-white">
            Sign in with Google
          </span>
        </button>

        {/* Footer */}
        <p className="w-full bg-black/20 flex mt-auto py-[5px] justify-center items-center gap-1">
          <span className="text-gray-500">
            secure authentication powered by Firebase
          </span>

          <SiFirebase className="text-[#FFCA28] text-lg" />
        </p>

      </div>
    </div>
  );
};

export default Loginmodel;

