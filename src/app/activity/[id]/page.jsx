"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { SendHorizontal } from "lucide-react";

import koutoubia from "../../../../public/actitvities/koutoubia.png";
import wakeBoard from "../../../../public/actitvities/wake-board.png";
import motoCross from "../../../../public/actitvities/moto-cross.jpg";
import potteryClass from "../../../../public/actitvities/pottery-class.jpg";
import parapente from "../../../../public/actitvities/parapente.jpg";
import cookClass from "../../../../public/actitvities/cook-class.jpeg";
import buggy from "../../../../public/actitvities/buggy-palmeraie.jpg";

import DoorJama from "../../../../public/spas/Door-Jama.jpg";
import nara from "../../../../public/spas/nara.jpeg";
import saadi from "../../../../public/spas/spa-es-saadi.jpg";
import yemaya from "../../../../public/spas/yemaya-spa.jpg";

import atika from "../../../../public/swimming-pools/atika.jpg";
import bedouin from "../../../../public/swimming-pools/bedouin.jpeg";
import nikkiBeach from "../../../../public/swimming-pools/nikki-beach.jpg";
import oasiria from "../../../../public/swimming-pools/oasiria.jpg";
import retreat from "../../../../public/swimming-pools/marrakech-retreat.jpg";
import lahoLodge from "../../../../public/swimming-pools/laho-lodge.jpeg";
import vila55 from "../../../../public/swimming-pools/villa-55.jpeg";
import katia from "../../../../public/swimming-pools/katia.jpeg";
import Footer from "../../../../components/Footer";

export default function ActivityPage({ params }) {
  const unwrappedParams = React.use(params);
  const id = decodeURIComponent(unwrappedParams.id);
  const [image, setData] = useState(null);

  useEffect(() => {
    switch (id) {
      case "Visite de la Koutoubia":
        setData(koutoubia);
        break;
      case "Balade en moto-cross":
        setData(motoCross);
        break;
      case "Wake Board":
        setData(wakeBoard);
        break;
      case "Buggy à la palmeraie":
        setData(buggy);
        break;
      case "Cours de cuisine dans un riad":
        setData(cookClass);
        break;
      case "Atelier de potterie":
        setData(potteryClass);
        break;
      case "Parapente":
        setData(parapente);
        break;
      case "Door Jama":
        setData(DoorJama);
        break;
      case "Nara":
        setData(nara);
        break;
      case "Le Spa Palace Es Saadi":
        setData(saadi);
        break;
      case "Yemaya Spa":
        setData(yemaya);
        break;
      case "Le Bedouin":
        setData(bedouin);
        break;
      case "Villa 55":
        setData(vila55);
        break;
      case "Oasiria":
        setData(oasiria);
        break;
      case "Nikki Beach":
        setData(nikkiBeach);
        break;
      case "Villa Atika":
        setData(atika);
        break;
      case "Marrakech Retreat":
        setData(retreat);
        break;
      case "Laho Lodge":
        setData(lahoLodge);
        break;
      case "Villa Katia":
        setData(katia);
        break;
    }
  }, [id]);

  const [successMsg, setSuccessMsg] = useState({
    status: "",
    message: "",
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", `${process.env.NEXT_PUBLIC_WEB3FORMS_KEY}`);

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    }).then((res) => res.json());

    if (res.success) {
      setSuccessMsg({
        status: true,
        message: "Message successfully sent",
      });
    } else {
      setSuccessMsg({
        status: false,
        message: "Something went wrong, try again...",
      });
    }
  };

  return (
    <main className="flex flex-col items-center mt-10 w-full">
      {image && (
        <section className="w-full flex justify-center px-2 sm:px-4 md:px-0">
          <div className="w-full max-w-6xl flex flex-col gap-6 bg-white rounded-xl shadow-lg p-4 sm:p-8 md:p-10">
            <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2 break-words">
              {id}
            </h1>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="w-full max-w-md aspect-video rounded-lg overflow-hidden shadow-md">
                  <img
                    src={image}
                    alt="Activity Image"
                    className="object-cover w-full h-full"
                    // fill={false}
                    // width={600}
                    // height={400}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                  <p className="text-xl mb-6 font-medium text-gray-800">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                  <p className="mb-6">
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                    irure dolor in reprehenderit in voluptate velit esse cillum
                    dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                    cupidatat non proident, sunt in culpa qui officia deserunt
                    mollit anim id est laborum.
                  </p>
                  <p className="mb-6">
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem
                    aperiam, eaque ipsa quae ab illo inventore veritatis et
                    quasi architecto beatae vitae dicta sunt explicabo. Nemo
                    enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                    aut fugit.
                  </p>
                  <p className="mb-8">
                    At vero eos et accusamus et iusto odio dignissimos ducimus
                    qui blanditiis praesentium voluptatum deleniti atque
                    corrupti quos dolores et quas molestias excepturi sint
                    occaecati cupiditate non provident, similique sunt in culpa
                    qui officia deserunt mollitia animi.
                  </p>
                 
                </div>
              </div>
            </div>

            <div className=" flex flex-col gap-1">
              <div className=" flex flex-col gap-2">
                <h1 className=" text-3xl font-bold">
                  Mettre au point un rendez-vous
                </h1>
                <span className=" border border-transparent w-[150px] rounded-full p-2 bg-blue-800" />
              </div>
              <form onSubmit={onSubmit} className=" mt-5 flex flex-col gap-4">
                <input
                  required
                  name="name"
                  className=" outline-0 font-medium border border-gray-500 p-2 text-lg rounded-[5px]"
                  placeholder="Your Name..."
                  type="text"
                />
                <input
                  required
                  name="email"
                  className=" font-medium outline-0 border border-gray-500 p-2 text-lg rounded-[5px]"
                  placeholder="Your email..."
                  type="email"
                />
                <textarea
                  required
                  name="message"
                  className=" font-medium outline-0 border border-gray-500 p-2 text-lg rounded-[5px]"
                  placeholder="Write your message here..."
                ></textarea>
                <button className=" w-[200px] font-semibold text-lg cursor-pointer px-4 py-2 border border-transparent rounded-full text-white flex flex-row gap-2 justify-center items-center bg-amber-500 hover:bg-amber-600 duration-200">
                  <p>Submit</p>
                  <SendHorizontal
                    size={25}
                    color="#ffffff"
                    strokeWidth={2.25}
                  />
                </button>

                {successMsg.status === true ? (
                  <p className=" text-base itslic text-green-700 font-medium">
                    {successMsg.message}
                  </p>
                ) : successMsg.status === false ? (
                  <p className=" text-base italic text-red-700 font-medium">
                    {successMsg.message}
                  </p>
                ) : (
                  ""
                )}
              </form>
            </div>
          </div>
        </section>
      )}
      <Footer />
    </main>
  );
}
