import { db } from "../../db/db";
import { counters } from "../../db/schema";
import { eq } from "drizzle-orm";

export const CounterStore = {
  get: (name: string = "main"): number => {
    const result = db
      .select()
      .from(counters)
      .where(eq(counters.name, name))
      .get();
    return result ? result.value : 21;
  },

  set: (val: number, name: string = "main") => {
    db.insert(counters)
      .values({ name, value: val })
      .onConflictDoUpdate({ target: counters.name, set: { value: val } })
      .run();
    return val;
  },

  reset: (name: string = "main") => {
    db.insert(counters)
      .values({ name, value: 21 })
      .onConflictDoUpdate({ target: counters.name, set: { value: 21 } })
      .run();
    return 21;
  },
};
