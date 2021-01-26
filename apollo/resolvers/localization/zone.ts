import { UserInputError, ValidationError } from "apollo-server-micro";
import { Country } from "../../../database/models/localization/country";
import {
  addZoneValidate,
  deleteZoneValidate,
  updateZoneValidate,
  Zone,
} from "../../../database/models/localization/zone";
import { ZoneGeoZone } from "../../../database/models/localization/zone_geo_zone";

export default {
  ZoneOnAdmin: {
    country: async (
      parent,
      params,
      { loaders: { zoneCountryAdminLoader } },
      _info
    ) => {
      return zoneCountryAdminLoader.load({
        id: parent.id,
        country_id: parent.country_id,
      });
    },
  },
  Query: {
    zonesOnAdmin: async (_parent, _args, _context, _info) => {
      const result = await Zone.query();
      return result;
    },
    zoneOnAdmin: async (_parent, { input: { id } }, _context, _info) => {
      const result = await Zone.query().findById(id);
      return result;
    },
    // language: async (_parent, { id }, _context, _info) => {
    //   const result = await Language.query().findById(id);
    //   return result;
    // },
  },
  Mutation: {
    addZone: async (_parent, { input }, _context, _info) => {
      let validatedZone;
      try {
        validatedZone = await addZoneValidate.validateAsync(input);
      } catch (err) {
        throw new UserInputError(err.details[0].message);
      }
      let { name, sort_order, status, country_id } = validatedZone;

      const isCountryExists: any = await Country.query()
        .where("id", country_id)
        .first();

      if (!isCountryExists) {
        throw new ValidationError(`Ülke Bulunamadı.`);
      }

      let biggestSortOrder;

      if (!sort_order && sort_order != 0) {
        biggestSortOrder = await Zone.query()
          .select("sort_order")
          .orderBy([{ column: "sort_order", order: "DESC" }])
          .first();
      }

      const zoneAdded = await Zone.query().insertAndFetch({
        name,
        sort_order: biggestSortOrder
          ? biggestSortOrder.sort_order + 1
          : sort_order || 0,
        status,
        country_id,
      } as any);

      return zoneAdded;
    },
    updateZone: async (_parent, { input }, _context, _info) => {
      let validatedZone;
      try {
        validatedZone = await updateZoneValidate.validateAsync(input);
      } catch (err) {
        throw new UserInputError(err.details[0].message);
      }
      let { id, name, sort_order, status, country_id } = validatedZone;

      const isZoneExists: any = await Zone.query().where("id", id).first();

      if (!isZoneExists) {
        throw new ValidationError(`Şehir Bulunamadı.`);
      }

      const isCountryExists: any = await Country.query()
        .where("id", country_id)
        .first();

      if (!isCountryExists) {
        throw new ValidationError(`Ülke Bulunamadı.`);
      }

      let biggestSortOrder;

      if (!sort_order && sort_order != 0) {
        biggestSortOrder = await Zone.query()
          .select("sort_order")
          .orderBy([{ column: "sort_order", order: "DESC" }])
          .first();
      }

      const updatedZone = await Zone.query()
        .where("id", id)
        .first()
        .update({
          name,
          sort_order: biggestSortOrder
            ? biggestSortOrder.sort_order + 1
            : sort_order,
          status,
          country_id,
        } as any)
        .returning("*");

      return updatedZone;
    },
    deleteZone: async (_parent, { input }, _context, _info) => {
      let validatedZone;
      try {
        validatedZone = await deleteZoneValidate.validateAsync(input);
      } catch (err) {
        throw new UserInputError(err.details[0].message);
      }
      let { id } = validatedZone;

      const result = await Zone.query().deleteById(id);

      // clear zone_geo_zone
      await ZoneGeoZone.query().del().where("zone_id", id);

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
