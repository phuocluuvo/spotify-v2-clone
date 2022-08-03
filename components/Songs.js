import { ClockIcon } from "@heroicons/react/outline";
import React from "react";
import { useRecoilValue } from "recoil";
import { playlistState } from "../atoms/playlistAtom";
import Song from "./Song";
function Songs() {
  const playlist = useRecoilValue(playlistState);
  return (
    <div>
      <div className=" flex-col space-y-1 text-white">
        <div className="sticky top-[4.5rem] px-9 py-4 bg-black z-50 ">
          <div className="grid grid-cols-2">
            <div className="flex items-center space-x-4">
              <p>#</p>

              <div>
                <p className="w-36 lg:w-36 truncate">TITLE</p>
              </div>
            </div>

            <div className="flex items-center justify-between ml-auto md:ml-0">
              <p className="hidden md:inline w-[250px]">ALBUM</p>
              <p className="mx-10">DATE ADDED</p>
              <ClockIcon className="w-5 h-5 mx-2" />
            </div>
          </div>
        </div>
        <hr className="border-t-[0.1px] border-gray-900 py-2" />
        {playlist?.tracks.items.map((track, i) => (
          <Song key={track.track.id} order={i} track={track} />
        ))}
      </div>
    </div>
  );
}

export default Songs;
