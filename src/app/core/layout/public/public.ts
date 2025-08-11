import { AsyncPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Auth } from "../../auth/auth";
import { MainContent } from "../../../shared/main-content/main-content";

@Component({
    selector: "app-public",
    imports: [RouterOutlet, AsyncPipe, MainContent],
    templateUrl: "./public.html",
    styleUrl: "./public.scss",
})
export class Public {
    auth = inject(Auth);
}
