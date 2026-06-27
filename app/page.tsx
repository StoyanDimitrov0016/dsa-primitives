import { redirect } from "next/navigation";
import { defaultDrill } from "./drills";

export default function Home() {
  redirect(`/practice/${defaultDrill.groupId}/${defaultDrill.id}`);
}
