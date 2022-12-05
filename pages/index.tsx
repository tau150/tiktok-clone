import type {NextPage} from "next";
import type {Video} from "../types";

import axios from "axios";

import {BASE_URL} from "../utils";
import VideoCard from "../components/VideoCard";
import NoResult from "../components/NoResult";
interface Props {
  videos: Video[];
}

const Home: NextPage<Props> = ({videos}) => {
  return (
    <div className="flex flex-col gap-10 videos h-full">
      {videos.length ? (
        videos.map((video: Video) => <VideoCard key={video._id} post={video} />)
      ) : (
        <NoResult text="No Videos" />
      )}
    </div>
  );
};

export const getServerSideProps = async ({query: {topic}}: {query: {topic: string}}) => {
  let response = await axios.get(`${BASE_URL}/api/post`);

  if (topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  }

  return {
    props: {videos: response.data},
  };
};

export default Home;
