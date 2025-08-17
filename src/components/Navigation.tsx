import { getProfileData } from "@/lib/actions";
import { NavigationClient } from "./NavigationClient";

async function Navigation() {
  const profile = await getProfileData();
  return (<NavigationClient profile={profile} />);
}

export { Navigation };