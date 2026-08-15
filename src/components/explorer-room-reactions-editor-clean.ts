import "./explorer-room-reactions-editor";
import { HaExplorerRoomReactionsEditor } from "./explorer-room-reactions-editor";
import { customElement } from "lit/decorators.js";

/**
 * Living Entity Points no longer creates door/window points.
 * Dynamic Doors & Windows is now the single editor for openings.
 * Existing legacy opening reactions remain readable for backwards compatibility.
 */
@customElement("ha-explorer-room-reactions-editor-clean")
export class HaExplorerRoomReactionsEditorClean extends HaExplorerRoomReactionsEditor {
  protected override updated(changed: Map<PropertyKey, unknown>): void {
    super.updated(changed);
    queueMicrotask(() => this.cleanOpeningControls());
  }

  protected override firstUpdated(): void {
    queueMicrotask(() => this.cleanOpeningControls());
  }

  private cleanOpeningControls(): void {
    const selects = Array.from(this.renderRoot.querySelectorAll("select"));
    for (const select of selects) {
      const openingOption = select.querySelector<HTMLOptionElement>('option[value="opening"]');
      if (!openingOption) continue;
      openingOption.remove();
      if (select.value === "opening") {
        select.value = "light";
        select.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
      }
    }

    const instruction = this.renderRoot.querySelector<HTMLElement>(".instruction");
    if (instruction && instruction.textContent?.includes("dør/vindue")) {
      instruction.innerHTML = "Hele rummet bliver ikke længere farvet af en enkelt entity. Hver lampe, bevægelsessensor, TV/media player og temperatursensor får sit eget punkt på plantegningen. Lamper bruger stadig <code>brightness</code>, og temperatur vises med den aktuelle værdi. Døre og vinduer konfigureres nu under <strong>Dynamic Doors & Windows</strong>.";
    }
  }
}
