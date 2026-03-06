"use client";

import { useState } from "react";

interface WeatherData {
  name: string;
  main: { temp: number; humidity: number };
  weather: { description: string }[];
  wind: { speed: number };
  _tempRounded: number;
}

export default function Home() {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);

  const GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL;

  const fetchWeather = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;

    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      // Petición al API Gateway
      const res = await fetch(`${GATEWAY_URL}/api/weather/current?city=${encodeURIComponent(city)}`);

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Error ${res.status}: Fallo al consultar el API Gateway`);
      }

      const data: WeatherData = await res.json();

      setWeather(data);
    } catch (err: unknown) {
      console.error(err);
      
      const errorMessage = err instanceof Error ? err.message : "Ocurrió un error inesperado al conectar con el servidor.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-xl mx-auto flex flex-col items-center gap-8 mt-12">
        <header className="text-center">
          <h1 className="text-4xl font-bold mb-2">🌤️ WeatherSOA</h1>
        </header>

        {/* Buscador */}
        <form onSubmit={fetchWeather} className="flex gap-2 w-full">
          <input
            type="text"
            className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="Escribe una ciudad (Ej. Monterrey)..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Buscar
          </button>
        </form>

        {/* CONTENEDOR DE ESTADOS */}
        <div className="w-full">

          {/* LOADING */}
          {loading && (
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 flex flex-col items-center justify-center animate-pulse">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-blue-400 font-medium tracking-wide">Consultando OpenWeather mediante Gateway...</p>
            </div>
          )}

          {/* ERROR */}
          {error && !loading && (
            <div className="bg-red-900/30 border border-red-500/50 rounded-xl p-6 text-center">
              <span className="text-4xl mb-4 block">⚠️</span>
              <h3 className="text-xl font-bold text-red-400 mb-2">¡Ups! Ocurrió un problema</h3>
              <p className="text-red-200">{error}</p>
              <p className="text-sm text-red-400 mt-4 italic">Verifica que todos los servicios estén corriendo correctamente.</p>
            </div>
          )}

          {/* SUCCESS */}
          {weather && !loading && !error && (
            <div className="bg-gradient-to-br from-gray-800 to-gray-800/80 border border-gray-700 rounded-xl p-8 shadow-2xl">
              <div className="text-center border-b border-gray-700 pb-6 mb-6">
                <h2 className="text-3xl font-bold mb-1">{weather.name}</h2>
                <p className="text-gray-400 capitalize">{weather.weather[0]?.description}</p>
              </div>

              <div className="flex items-center justify-center gap-12">
                <div className="text-center">
                  <span className="text-5xl font-bold">{weather._tempRounded}°C</span>
                  <p className="text-sm text-gray-400 mt-1">Temperatura</p>
                </div>

                <div className="flex flex-col gap-4 border-l border-gray-700 pl-12">
                  <div>
                    <span className="font-semibold text-lg">{weather.main.humidity}%</span>
                    <p className="text-sm text-gray-400">Humedad</p>
                  </div>
                  <div>
                    <span className="font-semibold text-lg">{weather.wind.speed} m/s</span>
                    <p className="text-sm text-gray-400">Viento</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mensaje inicial si no hay búsqueda */}
          {!loading && !error && !weather && (
            <div className="text-center text-gray-500 p-8 border border-dashed border-gray-700 rounded-xl">
              <p>Esperando tu búsqueda...</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
