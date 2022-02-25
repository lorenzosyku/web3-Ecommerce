import Head from "next/head";
import { useMoralis } from "react-moralis";
import { useCollection } from "react-firebase-hooks/firestore";
import { getFirestore, collection } from "@firebase/firestore";
import { db } from "../firebase";

export default function Home() {
  const [snapshot, loading, error] = useCollection(collection(db, "products"));

  console.log(snapshot);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 space-y-10">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-3xl">Welcome to the Web3 Store</h1>
      <div className="">
        {snapshot?.docs.map((doc) => (
          <div
            key={doc.id}
            className="flex transform cursor-pointer justify-between space-x-8 p-5 shadow-md transition duration-200 hover:scale-105"
          >
            <p>{doc.data().name}</p>
            <p>{doc.data().price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
