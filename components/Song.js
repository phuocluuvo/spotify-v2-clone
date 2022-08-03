import React, { useState } from "react";
import { useRecoilState } from "recoil";
import useSpotify from "../hooks/useSpotify";
import { millisToMinutesAndSeconds } from "../lib/time";
import {
  currentTrackIdState,
  isPlayingState,
  currentTrackState,
} from "../atoms/trackAtom";
function Song({ order, track }) {
  const spotifyApi = useSpotify();

  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [currentTrack, setCurrentTrack] = useRecoilState(currentTrackState);
  const playSong = () => {
    setCurrentTrackId(track.track.id);
    setIsPlaying(true);
    setCurrentTrack(track.track);
    // spotifyApi.play({
    //   uris: [track.track.uri],
    // });
  };
  return (
    <div
      className="grid grid-cols-2 font-normal hover:bg-gray-900 py-4 px-5 rounded-lg  mx-5 cursor-pointer"
      onClick={playSong}
    >
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>
        <img className="h-10 w-10" src={track.track.album.images[0].url} />
        <div className="w-36 lg:w-full truncate">
          <p className="truncate lg:w-full ">{track.track.name}</p>
          <a
            href={track.track.artists[0].external_urls.spotify}
            className="truncate lg:w-full
            opacity-50 hover:opacity-100 hover:text-white hover:underline duration-75"
          >
            {track.track.artists.map((artist) => artist.name).join(", ")}
          </a>
        </div>
      </div>
      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="hidden md:inline truncate w-[250px]">
          {track.track.album.name}
        </p>
        <h1 className="mx-10">
          {new Date(track.added_at).toLocaleDateString("en-us", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </h1>
        <p className="px-1">
          {millisToMinutesAndSeconds(track.track.duration_ms)}
        </p>
      </div>
    </div>
  );
}

export default Song;
