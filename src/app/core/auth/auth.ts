import {
    Injectable,
    DestroyRef,
    computed,
    inject,
    signal,
    EffectRef,
    effect,
} from "@angular/core";
import {
    Auth as FbAuth,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User,
} from "@angular/fire/auth";

@Injectable({ providedIn: "root" })
export class Auth {
    private readonly auth = inject(FbAuth);
    private readonly destroyRef = inject(DestroyRef);

    // undefined = not initialized yet; null = initialized but signed out
    private readonly _user = signal<User | null | undefined>(undefined);

    /** User once initialized; null if signed out */
    readonly user = computed<User | null>(() =>
        this._user() === undefined ? null : (this._user() as User | null)
    );

    /** Has the auth listener fired at least once? */
    readonly initialized = computed<boolean>(() => this._user() !== undefined);

    /** True when a user is present */
    readonly isLoggedIn = computed<boolean>(() => !!this._user());

    constructor() {
        const unsubscribe = onAuthStateChanged(this.auth, (u) =>
            this._user.set(u)
        );
        this.destroyRef.onDestroy(() => unsubscribe());
    }

    /** Await until the first auth tick completes */
    whenInitialized(): Promise<void> {
        if (this.initialized()) return Promise.resolve();
        return new Promise((resolve) => {
            let ref: EffectRef;
            ref = effect(() => {
                if (this.initialized()) {
                    ref.destroy();
                    resolve();
                }
            });
        });
    }

    // Imperative helpers
    get currentUser(): User | null {
        return this.user();
    }
    get loggedIn(): boolean {
        return this.isLoggedIn();
    }

    // Auth actions
    signUp = (email: string, password: string) =>
        createUserWithEmailAndPassword(this.auth, email, password);

    signIn = (email: string, password: string) =>
        signInWithEmailAndPassword(this.auth, email, password);

    logout = () => signOut(this.auth);
}
