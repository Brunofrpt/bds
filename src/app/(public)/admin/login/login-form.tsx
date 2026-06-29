"use client"

export default function LoginForm() {
    return (
        <form className="admin-login__form">
            <div className="admin-login__field">
                <label 
                className="admin-login__label description"
                htmlFor="email"
                >
                    ADRESSE E-MAIL
                </label>
                <input
                className="admin-login__input"
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="adresse@email.com"
                />
            </div>
            <div className="admin-login__field">
                <label
                className="admin-login__label description"
                htmlFor="password"
                >
                    MOT DE PASSE
                </label>
                <input
                className="admin-login__input"
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                />
            </div>
            <button className="admin-login__button button button--primary"
            type="submit"
            >
                SE CONNECTER
            </button>
        </form>
    )
}