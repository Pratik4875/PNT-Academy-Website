
import { Experience } from '@/components/Experience'

export default function Home() {
  return (
    <main className="w-full h-full relative">
      {/* 3D Scene */}
      <div className="absolute inset-0 z-0">
        <Experience />
      </div>

      {/* UI Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-8 md:p-12">
        <header className="flex justify-between items-start">
          <div className="pointer-events-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-2">
              PNT ACADEMY
            </h1>
            <p className="text-blue-200 text-lg md:text-xl max-w-md">
              Master Robotics, AI, and Future Tech through hands-on innovation.
            </p>
          </div>
          <button className="pointer-events-auto bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-full font-medium transition-colors">
            Enroll Now
          </button>
        </header>

        <footer className="pointer-events-auto">
          <p className="text-blue-300/60 text-sm">
            Interactive 3D Experience • Hover over cards to explore
          </p>
        </footer>
      </div>
    </main>
  )
}
