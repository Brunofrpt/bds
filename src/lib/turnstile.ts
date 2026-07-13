type VerifyTurnstileTokenResult = {
  success: boolean;
  errorCodes?: string[];
};

export async function verifyTurnstileToken(
  token: string,
): Promise<VerifyTurnstileTokenResult> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    throw new Error(
      "La variable d'environnement TURNSTILE_SECRET_KEY est manquante.",
    );
  }

  const body = new URLSearchParams({
    secret: secretKey,
    response: token,
  });

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    },
  );

  if (!response.ok) {
    throw new Error("La vérification Turnstile a échoué côté réseau.");
  }

  const data = (await response.json()) as {
    success: boolean;
    "error-codes"?: string[];
  };

  return {
    success: data.success,
    errorCodes: data["error-codes"],
  };
}
