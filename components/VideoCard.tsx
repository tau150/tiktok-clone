import type {Video} from "../types";

import {useEffect, useState, useRef} from "react";
import Image from "next/legacy/image";
import Link from "next/link";
import {NextPage} from "next";
import {BsFillPlayFill, BsFillPauseFill} from "react-icons/bs";
import {HiVolumeUp, HiVolumeOff} from "react-icons/hi";
import {GoVerified} from "react-icons/go";

interface Props {
  post: Video;
}

const VideoCard: NextPage<Props> = ({post}) => {
  const [isHover, setIsHover] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  const onVideoPress = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted]);

  return (
    <div className="flex flex-col border-b-2 border-gray-200 pb-6">
      <div>
        <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
          <div className="md:w-16 md:h-16 w-10 h-10">
            <Link href={`/profile/${post.postedBy._id}`}>
              <>
                <Image
                  alt="profile photo"
                  className="rounded-full"
                  height={62}
                  layout="responsive"
                  src={post.postedBy.image}
                  width={62}
                />
              </>
            </Link>
          </div>
          <div>
            <Link href={`/profile/${post.postedBy._id}`}>
              <div className="flex items-center gap-2">
                <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                  {post.postedBy.userName} <GoVerified className="text-blue-400 text-md" />{" "}
                </p>
                <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                  {post.postedBy.userName}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="lg:ml-2 flex gap-4 relative">
        <div
          className="rounded-3xl"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <Link href={`/detail/${post._id}`}>
            <video
              ref={videoRef}
              loop
              className="lg:w-[700px] h-[300px] md:h-[400px] lg:h-[530px] w-[200px] rounded-2xl cursor-pointer bg-gray-100"
              src={post.video.asset.url}
            />
          </Link>
          {isHover && (
            <div className="absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 lg:justify-center w-[100px] md:w-[50px] lg:w-[700px] p-3 bg-gray-100">
              {playing ? (
                <button onClick={onVideoPress}>
                  <BsFillPauseFill className="text-black text-3xl lg:text-2xl" />
                </button>
              ) : (
                <button onClick={onVideoPress}>
                  <BsFillPlayFill className="text-black text-2xl lg:text-2xl" />
                </button>
              )}
              {isVideoMuted ? (
                <button onClick={() => setIsVideoMuted(false)}>
                  <HiVolumeOff className="text-black text-2xl lg:text-2xl" />
                </button>
              ) : (
                <button onClick={() => setIsVideoMuted(true)}>
                  <HiVolumeUp className="text-black text-2xl lg:text-2xl" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
