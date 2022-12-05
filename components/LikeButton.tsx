import {useState, useEffect} from "react";
import {MdFavorite} from "react-icons/md";
import {Circles} from "react-loader-spinner";

import useAuthStore from "../store/authStore";

interface Props {
  handleLike: () => void;
  handleDislike: () => void;
  isLikeLoading: boolean;
  likes: any[];
  flex: string;
}

const LikeButton = ({handleDislike, handleLike, likes, isLikeLoading, flex}: Props) => {
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const {userProfile}: any = useAuthStore();

  const filterLikes = likes?.filter((item) => item._ref === userProfile?._id);

  useEffect(() => {
    if (filterLikes?.length > 0) {
      setAlreadyLiked(true);
    } else {
      setAlreadyLiked(false);
    }
  }, [filterLikes?.length, likes]);

  if (isLikeLoading)
    return (
      <div className="py-6">
        {" "}
        <Circles color="#777" height={50} width={50} />{" "}
      </div>
    );

  return (
    <div className={`${flex} gap-6`}>
      <div className="mt-4 flex flex-col justify-center items-center cursor-pointer">
        {alreadyLiked ? (
          <div
            className="bg-primary rounded-full p-2 md:p-4 text-[#F51997]"
            onClick={handleDislike}
          >
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        ) : (
          <div className="bg-primary rounded-full p-2 md:p-4" onClick={handleLike}>
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        )}
        <p className="text-md font-semibold">{likes?.length ?? 0}</p>
      </div>
    </div>
  );
};

export default LikeButton;
