"use client";
import { AirlineForm } from "@/components/AirlineForm";
import { MyTrips } from "@/components/MyTrips";
import { WeatherWidget } from "@/components/WeatherWidget";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DESTINATIONS } from "@/config/destinations";
import { FlightDestination } from "@/types/FlightDestination";
import { PlaneTakeoff } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Typed from "typed.js";

export default function Home() {
  const [currentDestinationCode, setCurrentDestinationCode] =
    useState<string>("");

  //Used for the typing animation effect
  const header = useRef(null);

  useEffect(() => {
    //Typing animation for header
    const typed = new Typed(header.current, {
      strings: ["Welcome to Digido Airlines"],
      typeSpeed: 50,
      showCursor: false,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <>
      <div className="container mx-auto">
        <h1 className="text-center w-full text-7xl font-bold pt-8 text-white">
          <span ref={header} />
        </h1>
        <div></div>
        <div className="grid md:grid-cols-2 gap-4 mt-8 md:mt-24">
          <div className="flex min-w-full">
            <Tabs defaultValue="book" className="min-w-full">
              <TabsList>
                <TabsTrigger value="book">Book</TabsTrigger>
                <TabsTrigger value="trips">My Trips</TabsTrigger>
              </TabsList>
              <TabsContent value="book" className="w-full mt-4">
                <AirlineForm
                  destinations={DESTINATIONS}
                  onDestinationChange={setCurrentDestinationCode}
                />
              </TabsContent>
              <TabsContent value="trips">
                <MyTrips />
              </TabsContent>
            </Tabs>
          </div>
          <div className="flex flex-col  w-full">
            <div className="flex gap-2 text-5xl justify-center font-medium text-white">
              Where to...? <PlaneTakeoff className="w-[1em] h-[1em]" />
            </div>
            <div className="mt-4">
              <WeatherWidget destinationCode={currentDestinationCode} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
