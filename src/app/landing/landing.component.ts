import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { AsyncPipe } from "@angular/common";

@Component({
    selector: "app-landing",
    imports: [RouterLink, AsyncPipe],
    templateUrl: "./landing.component.html",
    styleUrl: "./landing.component.scss",
})
export class LandingComponent {
    auth = inject(AuthService);
}
