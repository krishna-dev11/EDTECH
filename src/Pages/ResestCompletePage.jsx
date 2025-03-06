import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

const ResestCompletePage = () => {
  return (
    <div className=" flex  flex-col gap-y-5 h-screen w-full justify-center items-center bg-richblack-900">
      <div className="  w-[30%] flex flex-col border-richblack-400 border p-10 rounded-md gap-y-5">
        <p className=" text-2xl text-white font-semibold">Reset complete!</p>
        <p className=" text-richblack-300 font-inter text-[.8rem] ">
          All done! We have sent an email to m***********@gmail.com to confirm
        </p>
        <Link to={"/"}>
          <button
            type="submit"
            className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
          >
            Reset Password
          </button>
        </Link>
        <Link to={"/"} className="flex gap-x-3 items-baseline">
          <FaArrowLeftLong fill="white" />
          <p className="text-white -translate-y-1">Return to login</p>
        </Link>
      </div>
    </div>
  );
};

export default ResestCompletePage;
