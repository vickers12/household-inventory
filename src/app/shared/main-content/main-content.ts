import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "app-main-content",
    imports: [],
    template: `<ng-content />`,
    styleUrl: "./main-content.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainContent {}
