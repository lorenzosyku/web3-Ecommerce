import Head from "next/head";
import { useMoralis } from "react-moralis";
import { useCollection } from "react-firebase-hooks/firestore";
import { getFirestore, collection, setDoc, doc, serverTimestamp } from "@firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";

export default function Home() {
  const { Moralis, authenticate, isAuthenticated, logout } = useMoralis();
  const [snapshot, loading, error] = useCollection(collection(db, "products"));
  const [errmsg, setErrmsg] = useState();

  type TransferType = Parameters<typeof Moralis.transfer>[0];
  const purchase = async (price: number) => {
    const options: TransferType = {
      type: "native",
      amount: Moralis.Units.ETH(price),
      receiver: "0xac712CA6b82e2eE44df82e4730D4f53Aeff874f1",
    };

    Moralis.transfer(options)
      .then((transaction) => {
        console.log(transaction);

        setDoc(doc(db, 'tnxCollection', transaction.hash!), {
          timestamp: serverTimestamp(),
          ...transaction,
          from: "0x593c44Df9E15906E329103c740CEBdbfA956180b",
          gasLimit: JSON.stringify(transaction.gasLimit),
          gasPrice: JSON.stringify(transaction.gasPrice),
          hash: "0xcd72b4c46bf477b40e11a09bdd9a1de83db211adc6232808fcfef50b06c92bee",
          
        })
      })
      .catch((error) => {
        console.log(error.data.message);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 space-y-10">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-3xl">Welcome to the Web3 Store</h1>
      {!isAuthenticated ? (
        <button
          onClick={() => {
            authenticate();
          }}
        >
          Login
        </button>
      ) : (
        <div className="">
          {snapshot?.docs.map((doc) => (
            <div
              key={doc.id}
              className="flex transform cursor-pointer justify-between space-x-8 p-5 shadow-md transition duration-200 hover:scale-105"
              onClick={()=>purchase(doc.data().price)}
            >
              <p>{doc.data().name}</p>
              <p>{doc.data().price} ETH</p>
            </div>
          ))}
          <div className="p-5">
            <h3 className="text-red-400">{errmsg}</h3>
          </div>
          <button
            onClick={() => {
              logout();
            }}
          >
            logout
          </button>
        </div>
      )}
    </div>
  );
}
