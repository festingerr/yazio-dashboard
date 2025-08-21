"use client"

import { TabNavigation, TabNavigationLink } from "@/components/tremor/TabNavigation"
import Link from "next/link"
import { usePathname } from "next/navigation";
import { Logo } from "@/../public/Logo";
import { Label } from "@radix-ui/react-label";
import { cx, getAge } from "@/lib/utils";
import { ProfileData } from "@/lib/actions";

interface NavigationClientProps {
  profile: ProfileData | undefined;
}

function Navigation({ profile }: NavigationClientProps) {
  const pathname = usePathname();

  return (
    <div className="shadow-s sticky top-0 z-20 bg-white dark:bg-gray-950">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 pt-3">
        <div>
          <span className="sr-only">Your Company</span>
          <Logo className="h-6" />
        </div>
        <div className="flex h-[42px] flex-nowrap gap-1">
          <div className="flex items-center space-x-4">
            {profile?.userview && (
              <img src={profile.userview} alt={profile.username} className="size-9 rounded-full" />
            )}
            {!profile?.userview && (
              <span
                className={cx(
                  'bg-blue-500 dark:bg-blue-500',
                  'flex size-9 shrink-0 items-center justify-center rounded-full text-xs text-white dark:text-white',
                )}
                aria-hidden="true"
              >
                {profile?.initials}
              </span>
            )}
            <div>
              <Label className="font-medium">
                {profile?.username}
              </Label>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                {`${getAge(profile?.dob)} yr, ${profile?.height} cm, ${profile?.weight} kg`}
              </p>
            </div>
          </div>
        </div>
      </div>
      <TabNavigation className="mt-5">
        <div className="mx-auto flex w-full max-w-7xl items-center px-6">
          <TabNavigationLink
            className="inline-flex gap-2"
            asChild
            active={pathname === "/overview"}
          >
            <Link href="/overview">Overview</Link>
          </TabNavigationLink>
        </div>
      </TabNavigation>
    </div>
  )
}

export { Navigation };
