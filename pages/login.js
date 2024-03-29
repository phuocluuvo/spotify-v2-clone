import React from "react";
import { getProviders, signIn } from "next-auth/react";
function Login({ providers }) {
  return (
    <div className="flex-col flex items-center justify-center w-full min-h-screen bg-slate-900">
      <img className="w-52 mb-5" src="https://cdn-icons-png.flaticon.com/512/3669/3669986.png" />

      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="bg-green-500 hover:bg-green-600 transition-color duration-75 text-white p-5 rounded-full font-bold"
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Login;
//render in server anytime back to login page
export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
