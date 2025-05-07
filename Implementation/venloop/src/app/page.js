import Image from "next/image";
import TeamForm from "@/app/Component/TeamForm";
import Penis from "@/app/Component/Penis"
import LoginPage from "./admin-login/page";
import AdminLandingPage from "@/app/admin-landing/page";
import PageWrapper from "@/app/teams/page";
import TeamWrapper from "@/app/teams/page";
import TaskCreation from "@/app/task-creation/page";
import Page from "@/app/teamleader-task-submition/view/page";


export default function Home() {
  return (
     <LoginPage/>
  );
}
