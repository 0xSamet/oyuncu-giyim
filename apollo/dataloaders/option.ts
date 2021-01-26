import DataLoader from "dataloader";
import {
  OptionDescription,
  OptionValue,
  OptionValueDescription,
} from "../../database/models/options";
import tableNames from "../../database/tableNames";

export const optionDescriptionAdminLoader = new DataLoader(
  async (keys: Array<{ id: number }>) => {
    let response = {};

    const descriptions: any = await OptionDescription.query()
      .select(
        "option_id",
        `${tableNames.option_description}.name`,
        "code as language"
      )
      .joinRelated(tableNames.language)
      .whereIn(
        "option_id",
        keys.map((option) => option.id)
      );

    keys.forEach((option) => {
      response[option.id] = descriptions.filter((description) => {
        return description.option_id === option.id;
      });
    });

    return keys.map((option) => {
      return response[option.id];
    });
  }
);

export const optionValueAdminLoader = new DataLoader(
  async (keys: Array<{ id: number }>) => {
    let response = {};

    const optionValues: any = await OptionValue.query()
      .select(
        "option_id",
        `${tableNames.option_value}.sort_order`,
        `${tableNames.option_value}.id`
      )
      .whereIn(
        "option_id",
        keys.map((option) => option.id)
      );

    keys.forEach((option) => {
      response[option.id] = optionValues.filter((optionValue) => {
        return optionValue.option_id === option.id;
      });
    });

    return keys.map((option) => {
      return response[option.id];
    });
  }
);

export const optionValueDescriptionAdminLoader = new DataLoader(
  async (keys: Array<{ id: number }>) => {
    let response = {};

    const optionValueDescriptions: any = await OptionValueDescription.query()
      .select(
        "option_value_id",
        `${tableNames.option_value_description}.name`,
        "code as language"
      )
      .joinRelated(tableNames.language)
      .whereIn(
        "option_value_id",
        keys.map((option) => option.id)
      );

    keys.forEach((optionValue) => {
      response[optionValue.id] = optionValueDescriptions.filter(
        (optionValueDescription) => {
          return optionValueDescription.option_value_id === optionValue.id;
        }
      );
    });

    return keys.map((optionValue) => {
      return response[optionValue.id];
    });
  }
);
