import { waitForAsync, ComponentFixture, TestBed } from "@angular/core/testing";

import { Authenticated } from "./authenticated";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";

describe("SidebarComponent", () => {
    let component: Authenticated;
    let fixture: ComponentFixture<Authenticated>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [Authenticated],
            imports: [
                MatButtonModule,
                MatIconModule,
                MatListModule,
                MatSidenavModule,
                MatToolbarModule,
            ],
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(Authenticated);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should compile", () => {
        expect(component).toBeTruthy();
    });
});
