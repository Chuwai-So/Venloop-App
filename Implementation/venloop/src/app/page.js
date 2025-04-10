import Image from "next/image";
import TeamForm from "@/app/Component/TeamForm";
import Leaderboard from './Component/Leaderboard';

export default function Home() {
  return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Leaderboard />
      </main>
  );
}
