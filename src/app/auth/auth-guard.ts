import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { take, map, combineLatest, filter } from "rxjs";
import { AuthService } from "./auth.service";

export const authGuard: CanActivateFn = (route, state) => {
    const auth = inject(AuthService);
    const router = inject(Router);

    return combineLatest([auth.initialized$, auth.user$]).pipe(
        // Wait until initialized$ is true
        filter(([initialized]) => initialized),
        take(1),
        map(([initialized, user]) => {
            if (user && user.emailVerified) {
                // User is logged in AND has verified their email
                return true;
            } else if (user && !user.emailVerified) {
                // User has not verified their email.
                router.navigate(["/login"], {
                    queryParams: {
                        returnUrl: state.url,
                        emailVerificationRequired: true,
                    },
                });
                return false;
            } else {
                // Not logged in
                router.navigate(["/login"], {
                    queryParams: { returnUrl: state.url },
                });
                return false;
            }
        })
    );
};
