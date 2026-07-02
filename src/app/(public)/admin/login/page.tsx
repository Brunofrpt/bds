import LoginForm from "./login-form";

export default function LoginPage() {
  return (
    <section className="admin-login">
      <header className="admin-login__header">
        <p className="admin-login__page-info link-description">
          / ESPACE ADMIN
        </p>
        <h1 className="admin-login__title title">Connexion</h1>
        <p className="admin-login__description paragraphe">
          Entrez vos identifiants pour accéder à l&apos;administration du site.
        </p>
      </header>
      <LoginForm />
    </section>
  );
}
