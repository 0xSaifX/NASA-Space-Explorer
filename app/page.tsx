"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Rocket,
  Camera,
  Atom,
  Globe,
  Calendar,
  ExternalLink,
  ChevronRight,
  Sparkles,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";
import useSWR from "swr";

// NASA API Key - Replace with your own
const NASA_API_KEY = "bToFMQbJE8hFdeu9q5aWrvL1dlb8foEyjumqHQbR";

const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`Request failed (${res.status}): ${errorBody || res.statusText}`);
  }

  return res.json();
};

export default function SpaceExplorer() {
  const [activeTab, setActiveTab] = useState<"apod" | "mars" | "asteroids" | "earth">("apod");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

  // Fetch APOD (Astronomy Picture of the Day)
  const { data: apodData, error: apodError } = useSWR(
    `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&date=${selectedDate}`,
    fetcher
  );

  // Fetch Mars Rover Photos
  const { data: marsData, error: marsError } = useSWR(
    `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=${NASA_API_KEY}`,
    fetcher
  );

  // Fetch Near-Earth Asteroids
  const today = new Date().toISOString().split("T")[0];
  const { data: asteroidsData, error: asteroidsError } = useSWR(
    `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${NASA_API_KEY}`,
    fetcher
  );

  // Fetch Earth Events (EONET)
  const { data: earthEventsData } = useSWR(
    `https://eonet.gsfc.nasa.gov/api/v3/events?limit=10&status=open`,
    fetcher
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-space-darker via-space-dark to-space-darker stars-bg overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 backdrop-blur-xl bg-space-dark/50">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="relative">
                <Rocket className="w-8 h-8 text-purple-400 animate-float" />
                <div className="absolute inset-0 blur-xl bg-purple-500/50" />
              </div>
              <div>
                <h1 className="text-2xl font-bold glow-text">NASA Space Explorer</h1>
                <p className="text-sm text-gray-400">Real-time space data dashboard</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 glass px-4 py-2 rounded-full"
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm">Live Data</span>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="relative z-10 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-4">
            {[
              { id: "apod" as const, label: "Astronomy Picture", icon: Camera },
              { id: "mars" as const, label: "Mars Rovers", icon: Rocket },
              { id: "asteroids" as const, label: "Near-Earth Objects", icon: Atom },
              { id: "earth" as const, label: "Earth Events", icon: Globe },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? "glass border-purple-500/50 text-white"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 py-12">
        {/* APOD Section */}
        {activeTab === "apod" && (
          <motion.div
            key="apod"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold glow-text">Astronomy Picture of the Day</h2>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-purple-400" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  max={new Date().toISOString().split("T")[0]}
                  className="glass px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {apodData && (
              <div className="grid lg:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="gradient-border glass rounded-2xl p-1 overflow-hidden group"
                >
                  <div className="relative aspect-video rounded-xl overflow-hidden">
                    {apodData.media_type === "image" ? (
                      <img
                        src={apodData.url}
                        alt={apodData.title}
                        className="w-full h-full object-cover bg-black/40 group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <iframe
                        src={apodData.url}
                        className="w-full h-full"
                        allowFullScreen
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{apodData.title}</h3>
                    <p className="text-gray-400 text-sm flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(apodData.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  <p className="text-gray-300 leading-relaxed">{apodData.explanation}</p>

                  {apodData.copyright && (
                    <div className="glass px-4 py-3 rounded-lg">
                      <p className="text-sm text-gray-400">
                        <span className="font-semibold text-purple-400">Copyright:</span>{" "}
                        {apodData.copyright}
                      </p>
                    </div>
                  )}

                  {apodData.hdurl && (
                    <a
                      href={apodData.hdurl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:scale-105 transition-transform"
                    >
                      View HD Image
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            )}

            {apodError && (
              <div className="glass p-8 rounded-2xl text-center">
                <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <p className="text-gray-400">Failed to load astronomy picture</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Mars Rovers Section */}
        {activeTab === "mars" && (
          <motion.div
            key="mars"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <Rocket className="w-8 h-8 text-red-500" />
              <h2 className="text-3xl font-bold glow-text">Mars Curiosity Rover</h2>
            </div>

            {marsData && (
              <>
                <div className="glass p-6 rounded-2xl">
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="glass p-4 rounded-xl">
                      <p className="text-sm text-gray-400 mb-1">Latest Photos</p>
                      <p className="text-2xl font-bold text-purple-400">
                        {marsData.latest_photos?.length || 0}
                      </p>
                    </div>
                    <div className="glass p-4 rounded-xl">
                      <p className="text-sm text-gray-400 mb-1">Sol (Mars Day)</p>
                      <p className="text-2xl font-bold text-pink-400">
                        {marsData.latest_photos?.[0]?.sol || "N/A"}
                      </p>
                    </div>
                    <div className="glass p-4 rounded-xl">
                      <p className="text-sm text-gray-400 mb-1">Earth Date</p>
                      <p className="text-2xl font-bold text-blue-400">
                        {marsData.latest_photos?.[0]?.earth_date || "N/A"}
                      </p>
                    </div>
                    <div className="glass p-4 rounded-xl">
                      <p className="text-sm text-gray-400 mb-1">Camera</p>
                      <p className="text-2xl font-bold text-green-400">
                        {marsData.latest_photos?.[0]?.camera?.full_name?.split(" ")[0] || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {marsData.latest_photos?.slice(0, 12).map((photo: any, index: number) => (
                    <motion.div
                      key={photo.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="gradient-border glass rounded-xl p-1 overflow-hidden group cursor-pointer"
                    >
                      <div className="relative aspect-square rounded-lg overflow-hidden">
                        <img
                          src={photo.img_src?.replace(/^http:\/\//, "https://")}
                          alt={`Mars ${photo.camera.full_name}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                          <p className="text-sm font-semibold">{photo.camera.full_name}</p>
                          <p className="text-xs text-gray-400">Sol {photo.sol}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}

            {marsError && (
              <div className="glass p-8 rounded-2xl text-center">
                <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <p className="text-gray-400">Failed to load Mars rover photos</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Asteroids Section */}
        {activeTab === "asteroids" && (
          <motion.div
            key="asteroids"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <Atom className="w-8 h-8 text-yellow-500 animate-spin" style={{ animationDuration: "10s" }} />
              <h2 className="text-3xl font-bold glow-text">Near-Earth Objects Today</h2>
            </div>

            {asteroidsData && (
              <>
                <div className="glass p-6 rounded-2xl">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="glass p-4 rounded-xl">
                      <p className="text-sm text-gray-400 mb-1">Total Objects</p>
                      <p className="text-3xl font-bold text-purple-400">
                        {asteroidsData.element_count || 0}
                      </p>
                    </div>
                    <div className="glass p-4 rounded-xl">
                      <p className="text-sm text-gray-400 mb-1">Potentially Hazardous</p>
                      <p className="text-3xl font-bold text-red-400">
                        {Object.values(asteroidsData.near_earth_objects || {})
                          .flat()
                          .filter((neo: any) => neo.is_potentially_hazardous_asteroid).length}
                      </p>
                    </div>
                    <div className="glass p-4 rounded-xl">
                      <p className="text-sm text-gray-400 mb-1">Date</p>
                      <p className="text-xl font-bold text-blue-400">
                        {new Date().toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {Object.values(asteroidsData.near_earth_objects || {})
                    .flat()
                    .slice(0, 10)
                    .map((neo: any, index: number) => (
                      <motion.div
                        key={neo.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`gradient-border glass p-6 rounded-xl ${
                          neo.is_potentially_hazardous_asteroid ? "border-red-500/50" : ""
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <h3 className="text-xl font-bold">{neo.name}</h3>
                              {neo.is_potentially_hazardous_asteroid && (
                                <span className="px-3 py-1 bg-red-500/20 border border-red-500/50 rounded-full text-xs font-semibold text-red-400">
                                  POTENTIALLY HAZARDOUS
                                </span>
                              )}
                            </div>

                            <div className="grid md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <p className="text-gray-400">Estimated Diameter</p>
                                <p className="font-semibold text-purple-400">
                                  {neo.estimated_diameter?.meters?.estimated_diameter_max?.toFixed(0)} m
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-400">Relative Velocity</p>
                                <p className="font-semibold text-pink-400">
                                  {parseFloat(
                                    neo.close_approach_data?.[0]?.relative_velocity?.kilometers_per_hour
                                  ).toFixed(0)}{" "}
                                  km/h
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-400">Miss Distance</p>
                                <p className="font-semibold text-blue-400">
                                  {parseFloat(
                                    neo.close_approach_data?.[0]?.miss_distance?.kilometers
                                  ).toFixed(0)}{" "}
                                  km
                                </p>
                              </div>
                            </div>
                          </div>

                          <TrendingUp className="w-8 h-8 text-purple-400 opacity-30" />
                        </div>
                      </motion.div>
                    ))}
                </div>
              </>
            )}

            {asteroidsError && (
              <div className="glass p-8 rounded-2xl text-center">
                <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <p className="text-gray-400">Failed to load asteroid data</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Earth Events Section */}
        {activeTab === "earth" && (
          <motion.div
            key="earth"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <Globe className="w-8 h-8 text-blue-500 animate-spin" style={{ animationDuration: "20s" }} />
              <h2 className="text-3xl font-bold glow-text">Active Earth Events</h2>
            </div>

            {earthEventsData && (
              <div className="grid md:grid-cols-2 gap-6">
                {earthEventsData.events?.slice(0, 10).map((event: any, index: number) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="gradient-border glass p-6 rounded-xl"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold mb-1">{event.title}</h3>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-purple-500/20 border border-purple-500/50 rounded text-xs font-semibold text-purple-400">
                            {event.categories?.[0]?.title || "Unknown"}
                          </span>
                          <span className="text-xs text-gray-400">
                            {new Date(event.geometry?.[0]?.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <Sparkles className="w-6 h-6 text-purple-400" />
                    </div>

                    <p className="text-sm text-gray-400 mb-4">
                      Location: {event.geometry?.[0]?.coordinates?.[1]?.toFixed(2)}°,{" "}
                      {event.geometry?.[0]?.coordinates?.[0]?.toFixed(2)}°
                    </p>

                    {event.sources?.[0]?.url && (
                      <a
                        href={event.sources[0].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        View Source
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 backdrop-blur-xl bg-space-dark/50 py-8 mt-20">
        <div className="container mx-auto px-6 text-center text-gray-400">
          <p className="mb-2">Powered by NASA Open APIs</p>
          <p className="text-sm">
            Data from NASA's APOD, Mars Rover, NeoWs, and EONET services
          </p>
        </div>
      </footer>
    </div>
  );
}
