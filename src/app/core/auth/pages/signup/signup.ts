import { Component, inject } from "@angular/core";
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    ReactiveFormsModule,
    ValidationErrors,
    Validators,
} from "@angular/forms";
import { sendEmailVerification } from "@angular/fire/auth";
import { Auth } from "../../auth";

interface SignupFormControls {
    email: FormControl<string>;
    password: FormControl<string>;
    confirmPassword: FormControl<string>;
}

@Component({
    selector: "app-signup",
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: "./signup.html",
    styleUrl: "./signup.scss",
})
export class Signup {
    private fb = inject(FormBuilder);
    form = this.fb.group<SignupFormControls>(
        {
            email: this.fb.nonNullable.control("", [
                Validators.required,
                Validators.email,
            ]),
            password: this.fb.nonNullable.control("", [
                Validators.required,
                Validators.minLength(6),
            ]),
            confirmPassword: this.fb.nonNullable.control("", [
                Validators.required,
            ]),
        },
        { validators: this.passwordMatchValidator }
    );
    error: string | null = null;
    success = false;
    isSubmitting = false;

    constructor(private auth: Auth) {}

    get email() {
        return this.form.get("email")!;
    }
    get password() {
        return this.form.get("password")!;
    }
    get confirmPassword() {
        return this.form.get("confirmPassword")!;
    }

    passwordMatchValidator(
        group: AbstractControl<SignupFormControls>
    ): ValidationErrors | null {
        const password = group.get("password")?.value;
        const confirm = group.get("confirmPassword")?.value;
        return password === confirm ? null : { passwordMismatch: true };
    }

    async onSignup() {
        this.error = "";
        this.success = false;
        if (this.form.invalid) return;
        this.isSubmitting = true;
        const { email, password } = this.form.getRawValue();
        try {
            const userCredential = await this.auth.signUp(email!, password!);
            await sendEmailVerification(userCredential.user);

            // Immediately sign out so user can't use the app yet
            await this.auth.logout();

            this.success = true;
            this.form.reset();
        } catch (err: any) {
            this.error = err.message || "Signup failed";
        }
        this.isSubmitting = false;
    }
}
