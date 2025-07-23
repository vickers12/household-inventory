import { Injectable, inject } from "@angular/core";
import {
    Auth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    User,
    onAuthStateChanged,
} from "@angular/fire/auth";
import { BehaviorSubject, ReplaySubject } from "rxjs";

@Injectable({ providedIn: "root" })
export class AuthService {
    private auth = inject(Auth);
    private userSubject = new BehaviorSubject<User | null>(null);
    public user$ = this.userSubject.asObservable();
    public initialized$ = new ReplaySubject<boolean>(1);

    private _instanceId = Math.random();
    private initialized = false;

    constructor() {
        console.log("AuthService instance:", this._instanceId);
        onAuthStateChanged(this.auth, (user) => {
            this.userSubject.next(user);
            if (!this.initialized) {
                this.initialized = true;
                console.log("Setting initialized$ to TRUE");
                this.initialized$.next(true); // Only emit once
            }
        });
    }

    get currentUser() {
        return this.userSubject.value;
    }

    signUp(email: string, password: string) {
        return createUserWithEmailAndPassword(this.auth, email, password);
    }

    signIn(email: string, password: string) {
        return signInWithEmailAndPassword(this.auth, email, password);
    }

    logout() {
        return signOut(this.auth);
    }
}
