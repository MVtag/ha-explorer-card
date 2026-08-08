export interface HomeAssistant {
  states: Record<string, HassEntity>;
  themes: {
    darkMode: boolean;
  };
  callWS?<T>(message: Record<string, unknown>): Promise<T>;
}

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
}

export interface AreaRegistryEntry {
  area_id: string;
  name: string;
  aliases?: string[];
  floor_id?: string | null;
  picture?: string | null;
}

declare global {
  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      description: string;
      preview?: boolean;
    }>;
  }
}
