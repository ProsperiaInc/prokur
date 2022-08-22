import { useRouter } from "next/router";

export default function useIsNavLinkActive() {
  const router = useRouter();

  return (link: string) => router.pathname === link;
}
