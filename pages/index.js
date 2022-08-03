import Head from "next/head";
import Sidebar from "../components/Sidebar";
import Center from "../components/Center";
import Player from "../components/Player";
import { getSession } from "next-auth/react";
import { useRecoilValue } from "recoil";
import {
  currentTrackIdState,
  isPlayingState,
  currentTrackState,
} from "../atoms/trackAtom";
import useTrackInfo from "../hooks/useTrackInfo";
const Home = () => {
  const trackInfo = useTrackInfo();
  return (
    <div className="h-screen overflow-hidden bg-black font-semibold">
      <Head>
        <title>Spotify Clone NextJS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex ">
        <Sidebar />
        <Center />
      </main>
      {trackInfo && (
        <div className="sticky h-fit w-full bottom-0 ">
          <Player />
        </div>
      )}
    </div>
  );
};
export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}
export default Home;
