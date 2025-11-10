// src/utils/helper/db.ts
import { DataSource, EntityTarget, FindOptionsWhere } from "typeorm";

export async function checkIsExist<T>(
  dataSource: DataSource,
  entity: EntityTarget<T>,
  field: keyof T,
  value: any
): Promise<boolean> {
  const repo = dataSource.getRepository(entity);
  const existing = await repo.findOneBy({ [field]: value } as FindOptionsWhere<T>);
  return !!existing;
}
