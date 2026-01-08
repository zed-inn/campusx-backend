import { OldDataCollection } from "./get-data";

export type OldDataMaps = {
  [K in keyof OldDataCollection]: Record<string, OldDataCollection[K][number]>;
};

const toMap = <T extends { id: string }>(items: T[]): Record<string, T> => {
  return items.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {} as Record<string, T>);
};

export function mapAllData(data: OldDataCollection): OldDataMaps {
  //   console.log("🔄 Indexing data by ID...");

  const result: any = {};

  for (const key of Object.keys(data) as (keyof OldDataCollection)[]) {
    const items = data[key];

    if (items.length > 0 && !("id" in items[0])) {
      console.warn(`⚠️ Skipping ${key}: Items do not have an 'id' property.`);
      result[key] = {};
      continue;
    }

    result[key] = toMap(items as any[]);
  }

  console.log("Mapped all data.");
  return result as OldDataMaps;
}
