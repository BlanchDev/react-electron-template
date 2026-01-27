import { db } from "../../../db/db";
import { settings } from "../../../db/schema";
import { eq } from "drizzle-orm";

interface WindowBounds {
  width: number;
  height: number;
  x?: number;
  y?: number;
  isMinimized: boolean;
  isMaximized: boolean;
}

const DEFAULT_BOUNDS: WindowBounds = {
  width: 1200,
  height: 860,
  isMinimized: false,
  isMaximized: false,
};

export const WindowStore = {
  getBounds: (): WindowBounds => {
    try {
      const result = db
        .select()
        .from(settings)
        .where(eq(settings.key, "window-bounds"))
        .get();
      if (!result) return DEFAULT_BOUNDS;
      return JSON.parse(result.value);
    } catch (e) {
      console.error("Window bounds read error:", e);
      return DEFAULT_BOUNDS;
    }
  },

  saveBounds: (bounds: WindowBounds) => {
    try {
      db.insert(settings)
        .values({ key: "window-bounds", value: JSON.stringify(bounds) })
        .onConflictDoUpdate({
          target: settings.key,
          set: { value: JSON.stringify(bounds) },
        })
        .run();
    } catch (e) {
      console.error("Window bounds save error:", e);
    }
  },
};
