import { Component } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { AsyncPipe } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";

@Component({
    selector: "app-header",
    imports: [AsyncPipe, RouterLink, MatButtonModule],
    templateUrl: "./header.component.html",
    styleUrl: "./header.component.scss",
})
export class HeaderComponent {
    constructor(public auth: AuthService, private router: Router) {}

    async logout() {
        await this.auth.logout();
        this.router.navigate([""]);
    }
}
