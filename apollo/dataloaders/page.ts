import DataLoader from "dataloader";
import { PageDescription } from "../../database/models/page";
import { tableNames } from "../../database/tableNames";

export const pageDescriptionLoader = new DataLoader(
  async (keys: Array<{ id: number; language: "string" }>) => {
    const language = keys[0].language;

    let response = {};

    const descriptions: any = await PageDescription.query()
      .select(
        "page_id",
        `${tableNames.page_description}.name`,
        "description",
        "meta_title",
        "meta_description",
        "meta_keywords",
        "slug"
      )
      .joinRelated(tableNames.language)
      .where("code", language);

    descriptions.forEach((description) => {
      response[description.page_id] = description;
    });

    return keys.map((page) => {
      return response[page.id];
    });
  }
);

export const pageSlugsLoader = new DataLoader(
  async (keys: Array<{ id: number }>) => {
    let response = {};

    const slugs: any = await PageDescription.query()
      .select("page_id", "slug", "code as language")
      .joinRelated(tableNames.language)
      .whereIn(
        "page_id",
        keys.map((a) => a.id)
      );

    keys.forEach((page) => {
      response[page.id] = slugs.filter((slug) => slug.page_id == page.id);
    });

    return keys.map((page) => {
      return response[page.id];
    });
  }
);

export const pageDescriptionAdminLoader = new DataLoader(async (keys) => {
  let response = {};

  const descriptions = await PageDescription.query()
    .select(
      "page_id",
      `${tableNames.page_description}.name`,
      "description",
      "meta_title",
      "meta_description",
      "meta_keywords",
      "slug",
      "code as language"
    )
    .joinRelated(tableNames.language)
    .whereIn(
      "page_id",
      keys.map((page: any) => page.id)
    );

  keys.forEach((page: any) => {
    response[page.id] = descriptions.filter((description: any) => {
      return description.page_id === page.id;
    });
  });

  return keys.map((page: any) => {
    return response[page.id];
  });
});
