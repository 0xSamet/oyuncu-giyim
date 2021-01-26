import { UserInputError, ValidationError } from "apollo-server-micro";
import { GeoZone } from "../../../database/models/localization/geo_zone";
import {
  TaxRate,
  addTaxRateValidate,
  deleteTaxRateValidate,
  updateTaxRateValidate,
} from "../../../database/models/localization/tax_rate";

export default {
  Query: {
    taxRatesOnAdmin: async (_parent, _args, _context, _info) => {
      const result = await TaxRate.query();
      return result;
    },
    taxRateOnAdmin: async (_parent, { input: { id } }, _context, _info) => {
      const result = await TaxRate.query().findById(id);
      return result;
    },
  },
  Mutation: {
    addTaxRate: async (_parent, { input }, _context, _info) => {
      let validatedTaxRate;
      try {
        validatedTaxRate = await addTaxRateValidate.validateAsync(input);
      } catch (err) {
        throw new UserInputError(err.details[0].message);
      }
      let { name, sort_order, rate, type, geo_zone_id } = validatedTaxRate;

      const isGeoZoneExists: any = await GeoZone.query()
        .where("id", geo_zone_id)
        .first();

      if (!isGeoZoneExists) {
        throw new ValidationError(`Bölge Bulunamadı.`);
      }

      let biggestSortOrder;

      if (!sort_order && sort_order != 0) {
        biggestSortOrder = await TaxRate.query()
          .select("sort_order")
          .orderBy([{ column: "sort_order", order: "DESC" }])
          .first();
      }

      const taxRateAdded = await TaxRate.query().insertAndFetch({
        name,
        sort_order: biggestSortOrder
          ? biggestSortOrder.sort_order + 1
          : sort_order || 0,
        geo_zone_id,
        type,
        rate,
      } as any);

      return taxRateAdded;
    },
    updateTaxRate: async (_parent, { input }, _context, _info) => {
      let validatedTaxRate;
      try {
        validatedTaxRate = await updateTaxRateValidate.validateAsync(input);
      } catch (err) {
        throw new UserInputError(err.details[0].message);
      }
      let { id, name, sort_order, rate, type, geo_zone_id } = validatedTaxRate;

      const isTaxRateExists: any = await TaxRate.query()
        .where("id", id)
        .first();

      if (!isTaxRateExists) {
        throw new ValidationError(`Vergi Oranı Bulunamadı.`);
      }

      const isGeoZoneExists: any = await GeoZone.query()
        .where("id", geo_zone_id)
        .first();

      if (!isGeoZoneExists) {
        throw new ValidationError(`Bölge Bulunamadı.`);
      }

      let biggestSortOrder;

      if (!sort_order && sort_order != 0) {
        biggestSortOrder = await TaxRate.query()
          .select("sort_order")
          .orderBy([{ column: "sort_order", order: "DESC" }])
          .first();
      }

      const updatedTaxRate = await TaxRate.query()
        .where("id", id)
        .first()
        .update({
          name,
          sort_order: biggestSortOrder
            ? biggestSortOrder.sort_order + 1
            : sort_order,
          rate,
          type,
          geo_zone_id,
        } as any)
        .returning("*");

      return updatedTaxRate;
    },
    deleteTaxRate: async (_parent, { input }, _context, _info) => {
      let validatedTaxRate;
      try {
        validatedTaxRate = await deleteTaxRateValidate.validateAsync(input);
      } catch (err) {
        throw new UserInputError(err.details[0].message);
      }
      let { id } = validatedTaxRate;

      const result = await TaxRate.query().deleteById(id);

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
