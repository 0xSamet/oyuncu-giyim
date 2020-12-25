import DataLoader from "dataloader";
import { PageDescription } from "../../database/models/page";
import { tableNames } from "../../database/tableNames";

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
