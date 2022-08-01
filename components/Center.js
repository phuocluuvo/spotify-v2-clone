import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

function Center() {
  const { data: session } = useSession();
  useEffect(() => {}, []);
  return (
    <div className="flex-grow text-white relative">
      <header className="absolute top-5 right-8">
        <div className=" flex items-center w-fit rounded-full bg-black border space-x-3 cursor-pointer opacity-90 hover:opacity-80 p-1 pr-2 ">
          <img
            className="rounded-full w-7 h-7 object-cover"
            src={session?.user.image}
            alt=""
          />
          <h1>{session?.user.name}</h1>
          <ChevronDownIcon className="w-5 h-5" />
        </div>
      </header>
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black from-red-500 h-80 text-white p-8`}
      >
        <p>YYo</p>
      </section>
    </div>
  );
}

export default Center;
