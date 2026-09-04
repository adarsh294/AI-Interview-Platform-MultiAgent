
import { motion } from "motion/react";
import React from "react";
import { GiArtificialHive } from "react-icons/gi";
import { FaArrowRight } from "react-icons/fa";

const Nav = ({ onopen, login }) => {
  return (
    <motion.nav className="flex items-center py-4 px-8 bg-[#F5F5F5] justify-between">

      <div className="flex">
        <div className="w-7 h-7 bg-[#121212] rounded-[6px] flex justify-center items-center shadow-md hover:shadow-xl transition-shadow duration-300">
          <GiArtificialHive size={16} color="#F5F5F5" />
        </div>

        <motion.h1 className="text-[#121212] font-bold text-[20px] ml-2">
          Prepare AI
        </motion.h1>
      </div>

      <button
        onClick={onopen}
        className="flex items-center bg-[#121212] rounded-[6px] text-white px-[5px] py-[3px] gap-[3px]"
      >
        {login ? "Log out" : "Log in"}
        <FaArrowRight strokeWidth={1} />
      </button>

    </motion.nav>
  );
};

export default Nav;

