import { Component, inject } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { AsyncPipe } from "@angular/common";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import { MainContent } from "../../../shared/main-content/main-content";
import { Auth } from "../../auth/auth";

@Component({
    selector: "app-sidebar",
    templateUrl: "./authenticated.html",
    styleUrl: "./authenticated.scss",
    imports: [
        RouterOutlet,
        RouterLink,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        AsyncPipe,
        MainContent,
    ],
})
export class Authenticated {
    private breakpointObserver = inject(BreakpointObserver);
    auth = inject(Auth);
    router = inject(Router);

    async logout() {
        await this.auth.logout();
        this.router.navigate([""]);
    }

    isHandset$: Observable<boolean> = this.breakpointObserver
        .observe(Breakpoints.Handset)
        .pipe(
            map((result) => result.matches),
            shareReplay()
        );
}
