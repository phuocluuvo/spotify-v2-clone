import Head from "next/head";
import Sidebar from "../components/Sidebar";
const Home = () => {
  return (
    <div className="h-screen overflow-hidden bg-black">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" ">
        <Sidebar />
        {/**Center */}
      </main>
    </div>
  );
};

export default Home;
