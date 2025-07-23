import { inject, Injectable } from "@angular/core";
import {
    DocumentReference,
    Firestore,
    addDoc,
    collection,
} from "@angular/fire/firestore";
import { AuthService } from "../auth/auth.service";

export interface Household {
    name: string;
    members: string[];
    createdAt: number;
}

@Injectable({
    providedIn: "root",
})
export class HouseholdService {
    private firestore = inject(Firestore);
    private auth = inject(AuthService);

    // ============ HOUSEHOLDS ============
    createHousehold(name: string): Promise<DocumentReference> {
        const userUid = this.auth.currentUser?.uid;
        if (!userUid) throw new Error("Not logged in");
        const now = Date.now();
        return addDoc(collection(this.firestore, "households"), {
            name,
            members: [userUid],
            createdAt: now,
        });
    }
}
