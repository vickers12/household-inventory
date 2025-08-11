import { inject } from "@angular/core";
import type { CanActivateFn } from "@angular/router";
import { Auth } from "./auth";
import { decideAuthOrRedirect } from "./auth-guard.util";

export const authGuard: CanActivateFn = async (_route, state) => {
    const auth = inject(Auth);
    await auth.whenInitialized(); // wait for first auth tick
    return decideAuthOrRedirect(state.url); // use the real attempted URL
};
