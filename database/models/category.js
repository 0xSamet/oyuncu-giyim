import { Model, ValidationError } from "objection";
import { tableNames } from "../tableNames";

export class Category extends Model {
  static get tableName() {
    return tableNames.category;
  }
  async $beforeInsert() {
    const isSlugExists = await Category.query()
      .where("slug", this.slug)
      .first();

    console.log(isSlugExists);
    if (isSlugExists) {
      throw new ValidationError({
        message: `Slug ${isSlugExists.name} Kategorisi tarafından kullanılıyor.`,
      });
    }
  }
  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],
      properties: {
        id: { type: "string" },
        name: { type: "string", minLength: 1, maxLength: 255 },
        age: { type: "number" },
        sort_order: { type: "number" },
        parent_id: { type: ["number", "null"] },
        status: { type: "boolean" },
        slug: { type: "string" },
      },
    };
  }
}
