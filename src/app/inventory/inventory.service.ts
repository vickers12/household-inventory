import { Injectable, inject } from "@angular/core";
import {
    Firestore,
    collection,
    doc,
    addDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    CollectionReference,
    collectionData,
    DocumentReference,
    query,
    where,
} from "@angular/fire/firestore";
import { Observable } from "rxjs";

// ----- Interfaces -----
export interface Inventory {
    name: string;
    description?: string;
    ownerUid: string;
    householdId?: string;
    createdAt: number;
    updatedAt: number;
    category?: string;
    photoUrl?: string;
}

export interface InventoryItem {
    name: string;
    description?: string;
    quantity: number;
    createdAt: number;
    updatedAt: number;
    category?: string;
    photoUrl?: string;
}

// ----- Service -----
@Injectable({ providedIn: "root" })
export class InventoryService {
    private firestore = inject(Firestore);
    // ============ INVENTORIES ============

    async addInventory(
        data: Omit<Inventory, "createdAt" | "updatedAt">
    ): Promise<string> {
        const now = Date.now();
        const docRef = await addDoc(collection(this.firestore, "inventories"), {
            ...data,
            createdAt: now,
            updatedAt: now,
        });
        return docRef.id;
    }

    listInventoriesForUser(userUid: string) {
        return collectionData(
            query(
                collection(this.firestore, "inventories"),
                where("ownerUid", "==", userUid)
            ),
            { idField: "id" }
        );
    }

    // List all inventories for a given household (by id)
    listInventoriesForHousehold(
        householdId: string
    ): Observable<(Inventory & { id: string })[]> {
        const inventoriesCol = collection(this.firestore, "inventories");
        const q = query(
            inventoriesCol,
            where("householdId", "==", householdId)
        );
        return collectionData(q, { idField: "id" }) as Observable<
            (Inventory & { id: string })[]
        >;
    }

    // ============ ITEMS (SUBCOLLECTION) ============

    async addItemToInventory(
        inventoryId: string,
        item: Omit<InventoryItem, "createdAt" | "updatedAt">
    ) {
        const now = Date.now();
        const itemsCol = collection(
            this.firestore,
            `inventories/${inventoryId}/items`
        ) as CollectionReference<InventoryItem>;
        return addDoc(itemsCol, {
            ...item,
            createdAt: now,
            updatedAt: now,
        });
    }

    getItemsForInventory(
        inventoryId: string
    ): Observable<(InventoryItem & { id: string })[]> {
        const itemsCol = collection(
            this.firestore,
            `inventories/${inventoryId}/items`
        );
        return collectionData(itemsCol, { idField: "id" }) as Observable<
            (InventoryItem & { id: string })[]
        >;
    }

    // ============ UTILS ============

    // (Optional) Update inventory (e.g. for name/description/category/photo changes)
    updateInventory(inventoryId: string, updates: Partial<Inventory>) {
        return updateDoc(doc(this.firestore, "inventories", inventoryId), {
            ...updates,
            updatedAt: Date.now(),
        });
    }

    // (Optional) Delete inventory
    deleteInventory(inventoryId: string) {
        return deleteDoc(doc(this.firestore, "inventories", inventoryId));
    }

    // (Optional) Add a user to a household (for sharing)
    async addUserToHousehold(householdId: string, userUid: string) {
        const householdRef = doc(this.firestore, "households", householdId);
        // Fetch current members, add if not present (add code as needed)
        // (You might want to use arrayUnion from Firestore for atomic updates)
    }
}
