import React, {useEffect, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/router";
import {AiOutlineLogout} from "react-icons/ai";
import {BiSearch} from "react-icons/bi";
import {IoMdAdd} from "react-icons/io";
import {GoogleLogin, googleLogout} from "@react-oauth/google";

import useAuthStore from "../store/authStore";
import {User} from "../types";
import {createOrGetUser} from "../utils";
import Logo from "../utils/tiktik-logo.png";

const Navbar = () => {
  const [user, setUser] = useState<User | null>();
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const {userProfile, addUser, removeUser} = useAuthStore();

  useEffect(() => {
    setUser(userProfile);
  }, [userProfile]);

  const handleSearch = (e: {preventDefault: () => void}) => {
    e.preventDefault();

    if (searchValue) {
      router.push(`/search/${searchValue}`);
    }
  };

  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">
      <Link href="/">
        <div className="w-[100px] md:w-[129px] md:h-[30px] h-[38px]">
          <Image alt="logo" className="cursor-pointer" layout="responsive" src={Logo} />
        </div>
      </Link>

      <div className="relative hidden md:block">
        <form className="absolute md:static top-10 -left-20 bg-white" onSubmit={handleSearch}>
          <input
            className="bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full  md:top-0"
            placeholder="Search accounts and videos"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            className="absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400"
            onClick={handleSearch}
          >
            <BiSearch />
          </button>
        </form>
      </div>
      <div>
        {user ? (
          <div className="flex gap-5 md:gap-10">
            <Link href="/upload">
              <button className="border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2">
                <IoMdAdd className="text-xl" /> <span className="hidden md:block">Upload </span>
              </button>
            </Link>
            {user.image && (
              <Link href={`/profile/${user._id}`}>
                <div>
                  <Image
                    alt="user"
                    className="rounded-full cursor-pointer"
                    height={40}
                    src={user.image}
                    width={40}
                  />
                </div>
              </Link>
            )}
            <button
              className=" border-2 p-2 rounded-full cursor-pointer outline-none shadow-md"
              type="button"
              onClick={() => {
                googleLogout();
                removeUser();
              }}
            >
              <AiOutlineLogout color="red" fontSize={21} />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onError={() => console.log("Login Failed")}
            onSuccess={(response) => createOrGetUser(response, addUser)}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
