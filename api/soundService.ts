import { API_CONFIG, ENDPOINTS } from "./config";
import { Track } from "./types";

class SoundService {
  private async request<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  }

  async getSoundsByTheme(theme: string): Promise<Track[]> {
    return this.request<Track[]>(ENDPOINTS.SOUNDS_BY_THEME(theme));
  }
}

export const soundService = new SoundService();
