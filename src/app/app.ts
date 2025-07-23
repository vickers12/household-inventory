import { Component, inject, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { AuthService } from "./auth/auth.service";
import { AsyncPipe } from "@angular/common";

@Component({
    selector: "app-root",
    imports: [RouterOutlet, AsyncPipe],
    templateUrl: "./app.html",
    styleUrl: "./app.scss",
})
export class App {
    protected readonly title = signal("household-inventory");
    auth = inject(AuthService);
}
