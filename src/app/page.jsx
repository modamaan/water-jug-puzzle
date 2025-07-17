import { redirect } from "next/navigation";

export default function Home() {
  redirect("/levels");
  return null;
} 