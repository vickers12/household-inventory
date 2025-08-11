import { CanMatchFn, Router, UrlSegment } from "@angular/router";
import { Auth } from "./auth";
import { inject } from "@angular/core";

// Private app only for logged-in AND email-verified users
export const matchVerifiedOrRedirect: CanMatchFn = async (
    _route,
    segments: UrlSegment[]
) => {
    const auth = inject(Auth);
    const router = inject(Router);
    await auth.whenInitialized();
    const u = auth.user();

    if (u && u.emailVerified) return true;

    // Build attempted path for returnUrl
    const attempted = "/" + segments.map((s) => s.path).join("/");
    return router.createUrlTree(["/login"], {
        queryParams: { returnUrl: attempted },
    });
};

// Public app for everyone else (logged out OR unverified)
export const matchIfPublic: CanMatchFn = async () => {
    const auth = inject(Auth);
    await auth.whenInitialized();
    const u = auth.user();
    return !u || !u.emailVerified;
};
