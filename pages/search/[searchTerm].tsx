import React, {useState} from "react";
import Image from "next/image";
import {useRouter} from "next/router";
import {GoVerified} from "react-icons/go";
import Link from "next/link";
import axios from "axios";

import NoResult from "../../components/NoResult";
import VideoCard from "../../components/VideoCard";
import useAuthStore from "../../store/authStore";
import {BASE_URL} from "../../utils";
import {User, Video} from "../../types";

const Search = ({videos}: {videos: Video[]}) => {
  const [isAccounts, setIsAccounts] = useState(false);
  const {allUsers}: {allUsers: User[]} = useAuthStore();

  const router = useRouter();
  const {searchTerm}: any = router.query;

  const accounts = isAccounts ? "border-b-2 border-black" : "text-gray-400";
  const isVideos = !isAccounts ? "border-b-2 border-black" : "text-gray-400";
  const searchedAccounts = allUsers?.filter((user: User) =>
    user.userName.toLowerCase().includes(searchTerm),
  );

  return (
    <div className="w-full  ">
      <div className="flex gap-10 mb-10 border-b-2 border-gray-200 md:fixed z-50 bg-white w-full">
        <p
          className={`text-xl  font-semibold cursor-pointer ${accounts} mt-2`}
          onClick={() => setIsAccounts(true)}
        >
          Accounts
        </p>
        <p
          className={`text-xl font-semibold cursor-pointer ${isVideos} mt-2`}
          onClick={() => setIsAccounts(false)}
        >
          Videos
        </p>
      </div>
      {isAccounts ? (
        <div className="md:mt-16">
          {searchedAccounts.length > 0 ? (
            searchedAccounts.map((user: User, idx: number) => (
              <Link key={idx} href={`/profile/${user._id}`}>
                <div className=" flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200">
                  <div>
                    <Image
                      alt="user-profile"
                      className="rounded-full"
                      height={50}
                      src={user.image}
                      width={50}
                    />
                  </div>
                  <div>
                    <div>
                      <p className="flex gap-1 items-center text-lg font-bold text-primary">
                        {user.userName} <GoVerified className="text-blue-400" />
                      </p>
                      <p className="capitalize text-gray-400 text-sm">{user.userName}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <NoResult text={`No Account Results for ${searchTerm}`} />
          )}
        </div>
      ) : (
        <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start ">
          {videos.length ? (
            videos.map((post: Video, idx: number) => <VideoCard key={idx} post={post} />)
          ) : (
            <NoResult text={`No Video Results for ${searchTerm}`} />
          )}
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  params: {searchTerm},
}: {
  params: {searchTerm: string};
}) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

  return {
    props: {videos: res.data},
  };
};

export default Search;
