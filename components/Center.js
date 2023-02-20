import { ChevronDownIcon } from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Songs from "../components/Songs";

function Center() {
  const { data: session } = useSession();
  const playlistId = useRecoilValue(playlistIdState); //just get the value "read-only"
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const spotifyApi = useSpotify();
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getPlaylist(playlistId)
        .then((data) => {
          setPlaylist(data.body);
        })
        .catch((error) => console.log(error));
    }
  }, [spotifyApi, playlistId]);
  function numberToString(number) {
    return parseInt(number).toLocaleString();
  }
  // console.log(playlist);
  function scrolling() {
    document.getElementById("title_playlist").classList.remove("hidden");
    console.log(window);
  }
  return (
    <div
      className="flex-grow text-white relative h-screen overflow-y-scroll scrollbar-hide"
      onScroll={scrolling}
    >
      <header className="sticky top-0 right-8 bg-red-900 flex justify-between p-5 z-50">
        <p
          id="title_playlist"
          className="hidden text-3xl font-bold tracking-tighter md:leading-8 truncate flex-[0.9]"
        >
          {playlist?.name}
        </p>
        {x + ":" + y}
        <div
          className=" flex items-center w-fit rounded-full bg-neutral-800 space-x-3 cursor-pointer bg-opacity-70 hover:bg-opacity-100 p-1 pr-2 "
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          <img
            className="rounded-full w-7 h-7 object-cover"
            src={session?.user.image}
            alt=""
          />

          <h1 className="hidden md:block">{session?.user.name}</h1>
          <ChevronDownIcon className="w-5 h-5 sm:hidden md:block" />
        </div>
      </header>
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black from-red-900 h-[21rem] text-white p-4 md:p-8 pt-20 min-w-[450px]`}
      >
        <img
          src={playlist?.images?.[0]?.url}
          className="lg:w-64 lg:h-64  md:h-52 md:w-52 sm:h-48 sm:w-48 h-52 w-52 shadow-2xl"
        />
        <div className="">
          <h1 className="text-[10px] font-bold">PLAYLIST</h1>
          <p className="xl:text-5xl lg:text-4xl text-3xl font-bold tracking-tighter md:leading-8">
            {playlist?.name}
          </p>
          <p className=" md:text-lg xl:text-base font-normal my-5 opacity-70">
            {playlist?.description}
          </p>

          <h2 className=" font-bold flex space-x-1 flex-wrap text-sm">
            <span className="">{playlist?.owner.display_name}</span>
            <span className="">
              • {numberToString(playlist?.followers.total)} likes
            </span>
            <span className="opacity-70">
              {" "}
              • {playlist?.tracks.total} songs
            </span>
          </h2>
        </div>
      </section>
      <div>
        <Songs />
      </div>
    </div>
  );
}

export default Center;
