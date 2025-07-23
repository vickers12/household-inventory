import { Component, inject, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";

@Component({
    selector: "app-login",
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: "./login.component.html",
    styleUrl: "./login.component.scss",
})
export class LoginComponent implements OnInit {
    private fb = inject(FormBuilder);
    form = this.fb.group({
        email: [""],
        password: [""],
    });
    error = "";
    isSubmitting = false;

    constructor(
        private auth: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        const emailVerificationRequired = this.route.snapshot.queryParamMap.get(
            "emailVerificationRequired"
        );
        if (emailVerificationRequired) {
            this.error = "Please verify your email address to access the app.";
        }
    }

    async onLogin() {
        this.error = "";
        this.isSubmitting = true;
        const { email, password } = this.form.value;
        try {
            const userCredential = await this.auth.signIn(email!, password!);
            if (!userCredential.user.emailVerified) {
                await this.auth.logout();
                this.error = "Please verify your email before logging in.";
                return;
            }
            // else: continue to app
            const returnUrl =
                this.route.snapshot.queryParamMap.get("returnUrl") ||
                "/inventory";
            this.router.navigateByUrl(returnUrl);
        } catch (err: any) {
            this.error = err.message || "Login failed";
        }
        this.isSubmitting = false;
    }
}
