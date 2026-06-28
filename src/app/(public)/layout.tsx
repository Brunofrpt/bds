import { PublicLayout } from "@/components/layout/public-layout";

type PublicRouteLayoutProps = {
  children: React.ReactNode;
};

export default function PublicRouteLayout({
  children,
}: PublicRouteLayoutProps) {
  return <PublicLayout>{children}</PublicLayout>;
}
