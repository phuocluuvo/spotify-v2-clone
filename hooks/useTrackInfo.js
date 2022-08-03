import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState } from "../atoms/trackAtom";
import useSpotify from "./useSpotify";
function useTrackInfo() {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [trackInfo, setTrackInfo] = useState(null);

  useEffect(() => {
    const fetchTrackInfo = async () => {
      if (currentTrackId) {
        const data = await fetch(
          `https://api.spotify.com/v1/tracks/${currentTrackId}`,
          {
            headers: {
              //for the spotifyApi know that you are the owner
              //when you make a request
              Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
            },
          }
        ).then((res) => res.json());
        setTrackInfo(data);
        console.log(data);
      }
    };

    fetchTrackInfo();
    console.log(trackInfo, currentTrackId);
  }, [currentTrackId, spotifyApi]);

  return trackInfo;
}

export default useTrackInfo;
