import { Routes } from "@angular/router";
import { Home } from "./modules/landing/home";
import { Authenticated } from "./core/layout/authenticated/authenticated";
import { Signup } from "./core/auth/pages/signup/signup";
import { Login } from "./core/auth/pages/login/login";
import { authGuard } from "./core/auth/auth-guard";
import { InventoryList } from "./inventory/inventory-list/inventory-list";
import {
    matchIfPublic,
    matchVerifiedOrRedirect,
} from "./core/auth/auth-can-match-guard";
import { Public } from "./core/layout/public/public";

export const routes: Routes = [
    {
        path: "",
        component: Authenticated,
        canMatch: [matchVerifiedOrRedirect],
        canActivate: [authGuard],
        children: [
            {
                path: "inventory/list",
                component: InventoryList,
            },
        ],
    },
    {
        path: "",
        canMatch: [matchIfPublic],
        component: Public,
        children: [
            { path: "", component: Home },
            { path: "login", component: Login },
            { path: "signup", component: Signup },
            // Optionally catch unknown deep-links here:
            { path: "**", redirectTo: "login" },
        ],
    },
    { path: "**", redirectTo: "" },
];
