import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { AsyncPipe } from "@angular/common";
import { Auth } from "../../core/auth/auth";

@Component({
    selector: "app-home",
    imports: [RouterLink, AsyncPipe],
    templateUrl: "./home.html",
    styleUrl: "./home.scss",
})
export class Home {
    auth = inject(Auth);
}
