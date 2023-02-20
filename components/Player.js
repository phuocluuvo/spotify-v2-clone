import {
  ChevronUpIcon,
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  RewindIcon,
  SwitchHorizontalIcon,
  VolumeOffIcon,
  VolumeUpIcon,
} from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  currentTrackIdState,
  isPlayingState,
  currentTrackState,
  openImageState,
} from "../atoms/trackAtom";
import useSpotify from "../hooks/useSpotify";
import useTrackInfo from "../hooks/useTrackInfo";
import { debounce } from "lodash";
function Player() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [hover, setHover] = useState(false);
  const [volume, setVolume] = useState(50);
  const [volumeHolder, setVolumeHolder] = useState(0); // keep temporarily volume value
  const [isOpenImage, setIsOpenImage] = useRecoilState(openImageState);
  const trackInfo = useTrackInfo();

  const fetchCurrentSong = () => {
    if (!trackInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        setCurrentTrackId(data.body?.item?.id);
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing);
        });
      });
    }
  };
  console.log(trackInfo);
  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackId, spotifyApi, session]);

  // useEffect(() => {
  //   if (volume > 0 && volume < 100) {
  //     debouncedAdjustVolume(volume);
  //   }
  // }, [volume]);
  // const debouncedAdjustVolume = useCallback(
  //   debounce((volume) => {
  //     // spotifyApi.setVolume(volume);
  //   }, 500),
  //   []
  // );
  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
    // spotifyApi.getMyCurrentPlayingTrack().then((data) => {
    //   if (data.body.is_playing) {
    //     spotifyApi.pause();
    //     setIsPlaying(false);
    //   } else {
    //     spotifyApi.play();
    //     setIsPlaying(true);
    //   }
    // });
  };
  return (
    <div className="flex bg-black w-full justify-between">
      <div
        className=" flex flex-1 m-3 h-20 space-x-3
 "
      >
        <div className={`relative flex-initial flex `}>
          <img
            className={`${isOpenImage ? "hidden" : `h-full w-full `} `}
            src={trackInfo?.album.images[2]?.url}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          />

          <ChevronUpIcon
            className={`${hover ? "opacity-90" : "opacity-0"}
            sm:inline
            hidden 
            transition-opacity
            w-6 h-6 absolute top-0 right-0 text-white bg-zinc-900 rounded-full p-1 m-1 bg-opacity-80`}
            onClick={() => setIsOpenImage(true)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          />
        </div>
        <div className="overflow-hidden text-white flex-1  flex-col">
          <h1 className=" lg:text-xl sm:text-sm">{trackInfo?.name}</h1>

          <a
            href={trackInfo?.artists[0].external_urls.spotify}
            className="opacity-50 w-fit
            truncate
            hover:opacity-100 hover:text-white hover:underline duration-75
            sm:text-sm"
          >
            {trackInfo?.artists.map((artist) => artist.name).join(", ")}
          </a>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-evenly ">
        <SwitchHorizontalIcon className="button" />
        <RewindIcon className="button" />
        {!isPlaying ? (
          <PlayIcon className="button w-10 h-10" onClick={handlePlayPause} />
        ) : (
          <PauseIcon className="button w-10 h-10" onClick={handlePlayPause} />
        )}
        <FastForwardIcon className="button" />
        <ReplyIcon className="button" />
      </div>
      <div className="md:space-x-4 space-x-3 flex flex-[0.4] items-center justify-end px-4">
        {volume === 0 ? (
          <VolumeOffIcon
            className="button"
            onClick={() => {
              setVolumeHolder(0);
              setVolume(volumeHolder);
            }}
          />
        ) : (
          <VolumeUpIcon
            className="button"
            onClick={() => {
              setVolumeHolder(volume);
              setVolume(0);
            }}
          />
        )}
        <input
          className="w-14 md:w-28"
          type="range"
          onChange={(e) => setVolume(Number(e.target.value))}
          value={volume}
          min={0}
          max={100}
        />
      </div>
    </div>
  );
}

export default Player;
