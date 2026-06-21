import { Container } from "./container";
import { Footer } from "./footer";
import { Header } from "./header";

type PublicLayoutProps = {
  children: React.ReactNode;
};

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="public-layout">
      <Header />

      <main className="public-layout__main">
        <Container>{children}</Container>
      </main>

      <Footer />
    </div>
  );
}
