import Cube from "@/components/Cube/Cube";
import { ProductComponent } from "@/components/ProductComponent";
import RowCards from "@/components/RowCards";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Product } from "@/types/product.type";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import { Suspense } from "react";
import { Link } from "react-router-dom";

export function Home() {
  const { data: products } = useQuery<Product[]>({
    queryKey: ["products"],
    // queryFn: () =>
    //   fetch("http://localhost:3001/api/products").then((res) => res.json()),
  });

  // Assurez-vous que vos composants Product et Title sont importés correctement.

  return (
    <>
      <section className="flex flex-col md:flex-row items-center justify-center h-auto mt-6 bg-dark">
        <div className="py-16 w-full md:w-1/2 lg:py-8 my-24 px-12">
          <h1 className="text-6xl font-bold tracking-tighter sm:text-6xl xl:text-8xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
            Unleash Creativity in the NFT Space
          </h1>
          <p className="text-gray-300 text-xl mt-5">
            Join a community where art meets blockchain to craft unique digital
            masterpieces.
          </p>
          <div className="mt-10">
            <Button variant="outline">
              <p className="mr-2"> Join our community </p>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="w-100 h-100 md:w-114 md:h-114 lg:w-114 lg:h-114 ml-2 xl:ml-24 rounded-lg">
          <Cube />
        </div>
      </section>

      <section className="flex flex-col md:flex-row items-center py-12 bg-dark justify-center">
        <RowCards />
      </section>

      <section className="flex-1 max-w-7xl container my-12 md:px-6 xl:px-1">
        <div className="font-bold text-2xl text-black mb-8 overflow-x-auto">
          Featured Collectibles
        </div>
        <div className="flex pb-4">
          {products &&
            products.slice(0, 5).map((product, index) => (
              <div key={index} className="min-w-[15rem]">
                <Suspense fallback={<div>Loading Cube...</div>}>
                  <ProductComponent {...product} />
                </Suspense>
              </div>
            ))}
        </div>
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
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1 text-white"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button className="bg-white text-black" type="submit">
                    Join Now
                  </Button>
                </form>
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
}
