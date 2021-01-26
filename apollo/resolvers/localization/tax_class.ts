import { UserInputError, ValidationError } from "apollo-server-micro";
import { GeoZone } from "../../../database/models/localization/geo_zone";
import {
  addTaxClassValidate,
  deleteTaxClassValidate,
  TaxClass,
  updateTaxClassValidate,
} from "../../../database/models/localization/tax_class";
import {
  TaxRate,
  addTaxRateValidate,
  deleteTaxRateValidate,
  updateTaxRateValidate,
} from "../../../database/models/localization/tax_rate";
import { TaxRule } from "../../../database/models/localization/tax_rule";

export default {
  TaxClassOnAdmin: {
    tax_rules: async (
      parent,
      params,
      { loaders: { taxClassTaxRuleAdminLoader } },
      _info
    ) => {
      return taxClassTaxRuleAdminLoader.load({
        id: parent.id,
      });
    },
  },
  Query: {
    taxClassesOnAdmin: async (_parent, _args, _context, _info) => {
      const result = await TaxClass.query();
      return result;
    },
    taxClassOnAdmin: async (_parent, { input: { id } }, _context, _info) => {
      const result = await TaxClass.query().findById(id);
      return result;
    },
  },
  Mutation: {
    addTaxClass: async (_parent, { input }, _context, _info) => {
      let validatedTaxClass;
      try {
        validatedTaxClass = await addTaxClassValidate.validateAsync(input);
      } catch (err) {
        throw new UserInputError(err.details[0].message);
      }
      let { name, description, sort_order, tax_rules } = validatedTaxClass;

      for (const tax_rule of tax_rules) {
        const isTaxRateExists: any = await TaxRate.query()
          .where("id", tax_rule.tax_rate_id)
          .first();

        if (!isTaxRateExists) {
          throw new ValidationError("Belirttiğiniz Vergi Oranı Bulunamadı.");
        }
      }

      let biggestSortOrder;
      if (!sort_order && sort_order != 0) {
        biggestSortOrder = await TaxClass.query()
          .select("sort_order")
          .orderBy([{ column: "sort_order", order: "DESC" }])
          .first();
      }

      const taxClassAdded: any = await TaxClass.query().insertAndFetch({
        name,
        sort_order: biggestSortOrder
          ? biggestSortOrder.sort_order + 1
          : sort_order || 0,
        description,
      } as any);

      for (const tax_rule of tax_rules) {
        await TaxRule.query().insert({
          tax_class_id: taxClassAdded.id,
          tax_rate_id: tax_rule.tax_rate_id,
          priority: tax_rule.priority,
        } as any);
      }

      return taxClassAdded;
    },
    updateTaxClass: async (_parent, { input }, _context, _info) => {
      let validatedTaxClass;
      try {
        validatedTaxClass = await updateTaxClassValidate.validateAsync(input);
      } catch (err) {
        throw new UserInputError(err.details[0].message);
      }
      let { id, name, description, sort_order, tax_rules } = validatedTaxClass;

      const isTaxClassExists: any = await TaxClass.query()
        .where("id", id)
        .first();

      if (!isTaxClassExists) {
        throw new ValidationError(`Vergi Sınıfı Bulunamadı.`);
      }

      for (const tax_rule of tax_rules) {
        const isTaxRateExists: any = await TaxRate.query()
          .where("id", tax_rule.tax_rate_id)
          .first();

        if (!isTaxRateExists) {
          throw new ValidationError("Belirttiğiniz Vergi Oranı Bulunamadı.");
        }
      }

      let biggestSortOrder;
      if (!sort_order && sort_order != 0) {
        biggestSortOrder = await TaxClass.query()
          .select("sort_order")
          .orderBy([{ column: "sort_order", order: "DESC" }])
          .first();
      }

      const updatedTaxClass: any = await TaxClass.query()
        .where("id", id)
        .first()
        .update({
          name,
          sort_order: biggestSortOrder
            ? biggestSortOrder.sort_order + 1
            : sort_order,
          description,
        } as any)
        .returning("*");

      await TaxRule.query().delete().where("tax_class_id", updatedTaxClass.id);
      for (const tax_rule of tax_rules) {
        await TaxRule.query().insert({
          tax_class_id: updatedTaxClass.id,
          tax_rate_id: tax_rule.tax_rate_id,
          priority: tax_rule.priority,
        } as any);
      }

      return updatedTaxClass;
    },
    deleteTaxClass: async (_parent, { input }, _context, _info) => {
      let validatedTaxClass;
      try {
        validatedTaxClass = await deleteTaxClassValidate.validateAsync(input);
      } catch (err) {
        throw new UserInputError(err.details[0].message);
      }
      let { id } = validatedTaxClass;

      const result = await TaxClass.query().deleteById(id);

      if (result) {
        return {
          success: true,
        };
      } else {
        return {
          success: false,
        };
      }
    },
  },
};
