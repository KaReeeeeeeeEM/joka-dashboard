import { MeterDashboard } from "@/components/meter-dashboard";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="flex h-16 items-center px-4">
          <h1 className="text-2xl font-bold">Meter Dashboard</h1>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main>
        <MeterDashboard />
      </main>
    </div>
  );
}