import { Container } from "./container";

type PublicLayoutProps = {
  children: React.ReactNode;
};

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="public-layout">
      <header className="public-layout__header">
        <Container>
          <p>Bruno Da Silva</p>
        </Container>
      </header>

      <main className="public-layout__main">
        <Container>{children}</Container>
      </main>

      <footer className="public-layout__footer">
        <Container>
          <p>Portfolio</p>
        </Container>
      </footer>
    </div>
  );
}
