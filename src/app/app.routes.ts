import { Routes } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { LandingComponent } from "./landing/landing.component";
import { InventoryComponent } from "./inventory/inventory.component";
import { authGuard } from "./auth/auth-guard";
import { SidebarComponent } from "./sidebar/sidebar.component";

export const routes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "signup", component: SignupComponent },
    {
        path: "",
        component: SidebarComponent,
        canActivate: [authGuard],
        children: [
            { path: "", component: LandingComponent },
            {
                path: "inventory",
                component: InventoryComponent,
            },
        ],
    },
    { path: "**", redirectTo: "" },
];
