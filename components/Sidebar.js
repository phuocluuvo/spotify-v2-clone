import React, { useEffect, useState } from "react";
import useSpotify from "../hooks/useSpotify";
import {
  HeartIcon,
  HomeIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
function Sidebar() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useState(null);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);
  playlists.map((playlist) => {
    console.log(playlist.id);
  });
  return (
    <div
      className="text-gray-500 text-sm p-5 border-gray-900  overflow-y-scroll h-screen scrollbar-hide
    w-[200px]"
    >
      <div className="space-y-4">
        <button
          className="flex items-center hover:text-white ease-in-out  space-x-2"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          <p className="">Log Out</p>
        </button>
        <button className="flex items-center hover:text-white ease-in-out  space-x-2">
          <HomeIcon className=" w-5 h-5 " />
          <p className="">Home</p>
        </button>
        <button className="flex items-center hover:text-white ease-in-out  space-x-2">
          <SearchIcon className="w-5 h-5" />
          <p className="">Search</p>
        </button>
        <button className="flex items-center hover:text-white ease-in-out space-x-2 ">
          <LibraryIcon className="w-5 h-5  " />
          <p className="">Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />
      </div>
      <div className="space-y-4">
        <button className="flex items-center hover:text-white ease-in-out  space-x-2">
          <PlusCircleIcon className=" w-5 h-5 " />
          <p className="">Create Playlist</p>
        </button>
        <button className="flex items-center hover:text-white ease-in-out  space-x-2">
          <HeartIcon className="w-5 h-5" />
          <p className="">Liked Songs</p>
        </button>
        <button className="flex items-center hover:text-white ease-in-out space-x-2 ">
          <RssIcon className="w-5 h-5  " />
          <p className="">Your Postcast</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />
      </div>
      <div className="space-y-4">
        {playlists?.map((playlist) => (
          <h1 key={playlist.id} className="cursor-pointer hover:text-white">
            {playlist.name}
          </h1>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
