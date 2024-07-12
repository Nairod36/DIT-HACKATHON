import React, { Suspense } from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  // Assurez-vous que vos composants Product et Title sont importés correctement.

  return (
    <>
      <section className="flex flex-col md:flex-row items-center justify-center h-auto mt-3 bg-dark">
        <div className="py-16 w-full md:w-1/2 lg:py-8 my-24 px-12">
          <h1 className="text-6xl font-bold tracking-tighter sm:text-6xl xl:text-8xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
            Unleash Creativity in the NFT Space
          </h1>
          <p className="text-gray-300 text-xl mt-5">
            Join a community where art meets blockchain to craft unique digital
            masterpieces.
          </p>
          <div className="mt-10"></div>
        </div>

        <div className="overflow-hidden rounded-lg max-w-xs md:max-w-none mx-12">
          <img
            alt="content"
            className="object-cover w-full h-auto rounded-lg  w-100 h-100 md:w-114 md:h-114 lg:w-90 lg:h-90"
            src="https://sothebys-com.brightspotcdn.com/dims4/default/441c499/2147483647/strip/true/crop/1080x1080+0+0/resize/684x684!/format/webp/quality/90/?url=http%3A%2F%2Fsothebys-brightspot.s3.amazonaws.com%2Fdotcom%2Fab%2Fa5%2F80c8e82e4d9ea9412f20b9e92988%2Fgif-fungibleopeneditions-small.gif"
          />
        </div>
      </section>

      <section className="flex flex-col md:flex-row items-center py-12 bg-dark justify-center"></section>

      <section className="flex-1 max-w-7xl container my-12 md:px-6 xl:px-1">
        <div className="font-bold text-2xl text-black mb-8 overflow-x-auto">
          Featured Collectibles
        </div>
        <div className="flex pb-4"></div>
      </section>

      <section className="w-full pt-12 md:pt-12 lg:pt-32 xl:pt-32 bg-dark pb-32">
        <div className="px-4 md:px-6">
          <div className="grid gap-6 items-center">
            <div className="flex flex-col justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                  Embark on a Collaborative Creation Journey
                </h1>
                <p className="max-w-[600px] text-zinc-200 md:text-xl dark:text-zinc-100 mx-auto pt-3">
                  Join us and forge unique digital assets with creators
                  worldwide. Your imagination is the blueprint for tomorrow's
                  most coveted NFTs.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2 mx-auto pt-3">
                <form className="flex space-x-2"></form>
                <p className="text-xs text-zinc-200 dark:text-zinc-100 pt-2">
                  Dive into the world of NFTs and collaborative design.
                  <Link
                    className="underline underline-offset-2 pl-1 text-white"
                    to="/terms"
                  >
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
