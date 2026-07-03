import { Container } from "./container";
import { Header } from "./header";
import { AdminHeader } from "./admin-header";

type PrivateLayoutProps = {
  children: React.ReactNode;
};

export function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <div className="private-layout">
      <Header />
      <AdminHeader />
      <main className="private-layout__main">
        <Container>{children}</Container>
      </main>
    </div>
  );
}
