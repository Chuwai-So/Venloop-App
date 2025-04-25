import Image from "next/image";
import TeamForm from "@/app/Component/TeamForm";
import Leaderboard from './Component/Leaderboard';
import TaskCreation from "@/app/pages/TaskCreation_Preview";
import TaskListPreview from "@/app/Component/TaskListPreview";

export default function Home() {
  return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <TaskListPreview/>
      </main>
  );
}
