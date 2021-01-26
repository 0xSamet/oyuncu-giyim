import DataLoader from "dataloader";
import {
  Country,
  CountryDescription,
} from "../../../database/models/localization/country";
import { TaxRule } from "../../../database/models/localization/tax_rule";
import tableNames from "../../../database/tableNames";

export const taxClassTaxRuleAdminLoader = new DataLoader(
  async (keys: Array<{ id: number }>) => {
    let response = {};
    const taxRules: any = await TaxRule.query().whereIn(
      "tax_class_id",
      keys.map((a) => a.id)
    );
    //console.log("rules", taxRules);

    keys.forEach((key) => {
      response[key.id] = taxRules.filter(
        (taxRule) => taxRule.tax_class_id == key.id
      );
    });
    //console.log("res", response);

    return keys.map((key) => response[key.id]);
  }
);
