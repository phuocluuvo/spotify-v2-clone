import React from "react";
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
  const { data: session, status } = useSession();
  console.log(session);
  return (
    <div className="text-gray-500 text-sm p-5 border-gray-900  w-[200px] ">
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
        <p className="cursor-pointer hover:text-white">Playlist</p>
        <p className="cursor-pointer hover:text-white">Playlist</p>
        <p className="cursor-pointer hover:text-white">Playlist</p>
      </div>
    </div>
  );
}

export default Sidebar;
