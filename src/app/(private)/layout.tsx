import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { PrivateLayout } from "@/components/layout/private-layout";

type PrivateRouteLayoutProps = {
  children: React.ReactNode;
};

export default async function PrivateRouteLayout({
  children,
}: PrivateRouteLayoutProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/admin/login");
  }

  return <PrivateLayout>{children}</PrivateLayout>;
}
