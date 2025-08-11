// auth-guard.util.ts
import { inject } from "@angular/core";
import { Router, UrlTree } from "@angular/router";
import { Auth } from "./auth";

/** Shared redirect logic */
export const decideAuthOrRedirect = (targetUrl: string): boolean | UrlTree => {
    const auth = inject(Auth);
    const router = inject(Router);

    const user = auth.user(); // signal read

    if (user && user.emailVerified) return true;

    // Redirect to /login and preserve the attempted URL (and email verification hint)
    return router.createUrlTree(["/login"], {
        queryParams: {
            returnUrl: targetUrl,
            ...(user && !user.emailVerified
                ? { emailVerificationRequired: true }
                : {}),
        },
    });
};
