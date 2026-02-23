"use client";

import { useState } from "react";
import {
  Rocket,
  Camera,
  Atom,
  Globe,
  ExternalLink,
  AlertCircle,
  Loader2,
} from "lucide-react";
import useSWR from "swr";

// NASA API Key
const NASA_API_KEY = "bToFMQbJE8hFdeu9q5aWrvL1dlb8foEyjumqHQbR";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  return response.json();
};

const swrOptions = {
  revalidateOnFocus: false,
  dedupingInterval: 60_000,
};

export default function SpaceExplorer() {
  const [activeTab, setActiveTab] = useState<"apod" | "mars" | "asteroids" | "earth">("apod");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const today = new Date().toISOString().split("T")[0];

  // Fetch APOD
  const { data: apodData, error: apodError, isLoading: apodLoading } = useSWR(
    activeTab === "apod"
      ? `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&date=${selectedDate}`
      : null,
    fetcher,
    swrOptions
  );

  // Fetch EPIC Earth Images via local API route
  const { data: epicImages, error: epicError, isLoading: epicLoading } = useSWR(
    activeTab === "mars" ? "/api/epic" : null,
    fetcher,
    swrOptions
  );

  // Fetch Asteroids
  const { data: asteroidsData } = useSWR(
    activeTab === "asteroids"
      ? `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${NASA_API_KEY}`
      : null,
    fetcher,
    swrOptions
  );

  // Fetch Space Weather Alerts (DONKI) via local API route
  const { data: spaceWeatherAlerts, error: spaceWeatherError, isLoading: spaceWeatherLoading } = useSWR(
    activeTab === "earth" ? "/api/space-weather" : null,
    fetcher,
    {
      ...swrOptions,
      shouldRetryOnError: false,
      errorRetryCount: 0,
    }
  );

  const epicMode = epicImages?.mode ?? "natural";
  const epicItems = epicImages?.items ?? [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-space-darker via-space-dark to-space-darker stars-bg">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 backdrop-blur-xl bg-space-dark/50">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Rocket className="w-8 h-8 text-purple-400" />
              <div>
                <h1 className="text-2xl font-bold glow-text">NASA Space Explorer</h1>
                <p className="text-sm text-gray-400">Real-time space data</p>
              </div>
            </div>
            <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm">Live</span>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <nav className="relative z-10 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex gap-2 overflow-x-auto py-4">
            {[
              { id: "apod" as const, label: "Astronomy", icon: Camera },
              { id: "mars" as const, label: "EPIC Earth", icon: Rocket },
              { id: "asteroids" as const, label: "Asteroids", icon: Atom },
              { id: "earth" as const, label: "Space Weather", icon: Globe },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl ${
                    activeTab === tab.id
                      ? "glass border-purple-500/50"
                      : "text-gray-400 hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="relative z-10 container mx-auto px-6 py-12">
        
        {/* APOD */}
        {activeTab === "apod" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold">Astronomy Picture of the Day</h2>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                max={new Date().toISOString().split("T")[0]}
                className="glass px-4 py-2 rounded-lg"
              />
            </div>

            {apodLoading && (
              <div className="glass p-12 rounded-2xl text-center">
                <Loader2 className="w-12 h-12 text-purple-400 mx-auto mb-4 animate-spin" />
                <p>Loading APOD...</p>
              </div>
            )}

            {apodError && (
              <div className="glass p-8 rounded-2xl text-center">
                <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <p>Failed to load APOD data</p>
                <p className="text-sm text-gray-500">{apodError.message}</p>
              </div>
            )}

            {apodData && (
              <div className="grid lg:grid-cols-2 gap-8 items-stretch">
                <div className="glass rounded-2xl p-1 h-full">
                  <img
                    src={apodData.url}
                    alt={apodData.title}
                    className="w-full h-full min-h-[420px] rounded-xl object-cover"
                  />
                </div>
                <div className="glass rounded-2xl p-6 space-y-4 h-full min-h-[420px] overflow-y-auto">
                  <h3 className="text-2xl font-bold">{apodData.title}</h3>
                  <p className="text-gray-300">{apodData.explanation}</p>
                  {apodData.hdurl && (
                    <a
                      href={apodData.hdurl}
                      target="_blank"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 rounded-lg"
                    >
                      View HD <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* EPIC EARTH IMAGERY */}
        {activeTab === "mars" && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Rocket className="w-8 h-8 text-red-500" />
              EPIC Earth Imagery
            </h2>

            {epicLoading && (
              <div className="glass p-12 rounded-2xl text-center">
                <Loader2 className="w-12 h-12 text-purple-400 mx-auto mb-4 animate-spin" />
                <p>Loading EPIC images...</p>
              </div>
            )}

            {epicItems.length > 0 && (
              <>
                <div className="glass p-6 rounded-2xl grid md:grid-cols-4 gap-4">
                  <div className="glass p-4 rounded-xl">
                    <p className="text-sm text-gray-400">Photos</p>
                    <p className="text-2xl font-bold text-purple-400">{epicItems.length}</p>
                  </div>
                  <div className="glass p-4 rounded-xl">
                    <p className="text-sm text-gray-400">Latest ID</p>
                    <p className="text-2xl font-bold text-pink-400">{epicItems[0]?.identifier ?? "-"}</p>
                  </div>
                  <div className="glass p-4 rounded-xl">
                    <p className="text-sm text-gray-400">Date</p>
                    <p className="text-xl font-bold text-blue-400">{epicItems[0]?.date?.split(" ")[0] ?? "-"}</p>
                  </div>
                  <div className="glass p-4 rounded-xl">
                    <p className="text-sm text-gray-400">Mode</p>
                    <p className="text-2xl font-bold text-green-400">{epicMode}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {epicItems.slice(0, 12).map((image: any) => {
                    const imageUrl = image.imageUrl ?? "";

                    return (
                    <div key={image.identifier} className="glass rounded-xl p-1 group">
                      <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-800">
                        <img
                          src={imageUrl}
                          alt={`EPIC ${image.caption ?? image.identifier}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect fill="%23374151" width="400" height="400"/><text x="50%" y="50%" text-anchor="middle" fill="%23fff" font-size="14">Image Error</text></svg>';
                          }}
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                          <p className="text-sm font-semibold">{image.identifier}</p>
                          <p className="text-xs text-gray-400">{image.date?.split(" ")[0]}</p>
                        </div>
                      </div>
                    </div>
                  )})}
                </div>
              </>
            )}

            {epicError && (
              <div className="glass p-8 rounded-2xl text-center">
                <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <p>Failed to load EPIC images</p>
                <p className="text-sm text-gray-500">{epicError.message}</p>
              </div>
            )}

            {epicItems.length === 0 && (
              <div className="glass p-8 rounded-2xl text-center">
                <AlertCircle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <p>No EPIC images available</p>
              </div>
            )}
          </div>
        )}

        {/* ASTEROIDS */}
        {activeTab === "asteroids" && asteroidsData && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Near-Earth Objects</h2>
            <div className="glass p-6 rounded-2xl grid md:grid-cols-3 gap-4">
              <div className="glass p-4 rounded-xl">
                <p className="text-sm text-gray-400">Total</p>
                <p className="text-3xl font-bold text-purple-400">{asteroidsData.element_count}</p>
              </div>
              <div className="glass p-4 rounded-xl">
                <p className="text-sm text-gray-400">Hazardous</p>
                <p className="text-3xl font-bold text-red-400">
                  {Object.values(asteroidsData.near_earth_objects || {})
                    .flat()
                    .filter((neo: any) => neo.is_potentially_hazardous_asteroid).length}
                </p>
              </div>
              <div className="glass p-4 rounded-xl">
                <p className="text-sm text-gray-400">Date</p>
                <p className="text-xl font-bold text-blue-400">{new Date().toLocaleDateString()}</p>
              </div>
            </div>

            <div className="space-y-4">
              {Object.values(asteroidsData.near_earth_objects || {})
                .flat()
                .slice(0, 10)
                .map((neo: any) => (
                  <div key={neo.id} className="glass p-6 rounded-xl">
                    <h3 className="text-xl font-bold mb-2">{neo.name}</h3>
                    {neo.is_potentially_hazardous_asteroid && (
                      <span className="px-3 py-1 bg-red-500/20 border border-red-500 rounded-full text-xs">
                        POTENTIALLY HAZARDOUS
                      </span>
                    )}
                    <div className="grid md:grid-cols-3 gap-4 mt-3 text-sm">
                      <div>
                        <p className="text-gray-400">Diameter</p>
                        <p className="font-semibold text-purple-400">
                          {neo.estimated_diameter?.meters?.estimated_diameter_max?.toFixed(0)} m
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400">Velocity</p>
                        <p className="font-semibold text-pink-400">
                          {parseFloat(neo.close_approach_data?.[0]?.relative_velocity?.kilometers_per_hour).toFixed(0)} km/h
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400">Miss Distance</p>
                        <p className="font-semibold text-blue-400">
                          {parseFloat(neo.close_approach_data?.[0]?.miss_distance?.kilometers).toFixed(0)} km
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* SPACE WEATHER (DONKI) */}
        {activeTab === "earth" && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Space Weather Notifications</h2>

            {spaceWeatherLoading && (
              <div className="glass p-12 rounded-2xl text-center">
                <Loader2 className="w-12 h-12 text-purple-400 mx-auto mb-4 animate-spin" />
                <p>Loading space weather alerts...</p>
              </div>
            )}

            {spaceWeatherError && (
              <div className="glass p-8 rounded-2xl text-center">
                <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <p>Failed to load space weather alerts</p>
                <p className="text-sm text-gray-500">{spaceWeatherError.message}</p>
              </div>
            )}

            {!spaceWeatherLoading && !spaceWeatherError && spaceWeatherAlerts && spaceWeatherAlerts.length === 0 && (
              <div className="glass p-8 rounded-2xl text-center">
                <AlertCircle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <p>No recent space weather alerts</p>
              </div>
            )}

            {spaceWeatherAlerts && spaceWeatherAlerts.length > 0 && (
              <div className="grid md:grid-cols-2 gap-6">
                {spaceWeatherAlerts.slice(0, 10).map((alert: any, idx: number) => {
                  return (
                    <div key={`${alert.messageType ?? "alert"}-${idx}`} className="glass p-6 rounded-xl">
                      <h3 className="text-lg font-bold mb-2">{alert.messageType ?? "Notification"}</h3>
                      <span className="px-2 py-1 bg-purple-500/20 border border-purple-500 rounded text-xs">
                        {alert.messageIssueTime?.split("T")[0] ?? "Unknown date"}
                      </span>
                      <p className="text-sm text-gray-300 mt-3">
                        {alert.messageBody ?? "No details provided."}
                      </p>
                      {alert.messageURL && (
                        <a
                          href={alert.messageURL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-purple-400 mt-3"
                        >
                          Source <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-8 mt-20">
        <div className="container mx-auto px-6 text-center text-gray-400">
          <p>Powered by NASA Open APIs</p>
        </div>
      </footer>
    </div>
  );
}
