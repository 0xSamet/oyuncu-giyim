import { UserInputError, ValidationError } from "apollo-server-micro";
import { Country } from "../../../database/models/localization/country";
import {
  addGeoZoneValidate,
  deleteGeoZoneValidate,
  GeoZone,
  updateGeoZoneValidate,
} from "../../../database/models/localization/geo_zone";
import { Zone } from "../../../database/models/localization/zone";
import { ZoneGeoZone } from "../../../database/models/localization/zone_geo_zone";

export default {
  GeoZoneOnAdmin: {
    zones: async (
      parent,
      params,
      { loaders: { geoZoneZonesAdminLoader } },
      _info
    ) => {
      return geoZoneZonesAdminLoader.load({
        id: parent.id,
      });
    },
  },
  Query: {
    geoZonesOnAdmin: async (_parent, _args, _context, _info) => {
      const result = await GeoZone.query();
      return result;
    },
    geoZoneOnAdmin: async (_parent, { input: { id } }, _context, _info) => {
      const result = await GeoZone.query().findById(id);
      return result;
    },
  },
  Mutation: {
    addGeoZone: async (_parent, { input }, { db }, _info) => {
      let validatedGeoZone;
      try {
        validatedGeoZone = await addGeoZoneValidate.validateAsync(input);
      } catch (err) {
        throw new UserInputError(err.details[0].message);
      }

      let { name, description, sort_order, zones } = validatedGeoZone;

      for (const zone of zones) {
        const isCountryExists: any = await Country.query()
          .where("id", zone.country_id)
          .first();

        if (!isCountryExists) {
          throw new ValidationError(
            "Ülke Bulunamadı! Bölgeleri Kontrol Ediniz."
          );
        }

        if (zone.zone_id !== 0) {
          const isZoneExists: any = await Zone.query()
            .where("id", zone.zone_id)
            .first();

          if (!isZoneExists) {
            throw new ValidationError(
              "Şehir Bulunamadı! Bölgeleri Kontrol Ediniz."
            );
          }

          const isZoneBelongToCountry = await Zone.query()
            .where("country_id", isCountryExists.id)
            .andWhere("id", isZoneExists.id)
            .first();

          if (!isZoneBelongToCountry) {
            throw new ValidationError(
              "Girdiğiniz Şehir Girdiğiniz Ülkeye Ait Değil! Bölgeleri Kontrol Ediniz."
            );
          }
        }
      }

      let biggestSortOrder;

      if (!sort_order && sort_order != 0) {
        biggestSortOrder = await GeoZone.query()
          .select("sort_order")
          .orderBy([{ column: "sort_order", order: "DESC" }])
          .first();
      }

      const geoZoneAdded: any = await GeoZone.query().insert({
        name,
        description,
        sort_order: biggestSortOrder
          ? biggestSortOrder.sort_order + 1
          : sort_order || 0,
      } as any);

      for (const zone of zones) {
        await ZoneGeoZone.query().insert({
          country_id: zone.country_id,
          zone_id: zone.zone_id,
          geo_zone_id: geoZoneAdded.id,
        } as any);
      }

      return geoZoneAdded;
    },
    updateGeoZone: async (_parent, { input }, { db }, _info) => {
      let validatedGeoZone;
      try {
        validatedGeoZone = await updateGeoZoneValidate.validateAsync(input);
      } catch (err) {
        throw new UserInputError(err.details[0].message);
      }

      let { id, name, description, sort_order, zones } = validatedGeoZone;

      const isGeoZoneExists: any = await GeoZone.query()
        .where("id", id)
        .first();

      if (!isGeoZoneExists) {
        throw new ValidationError("Bölge Bulunamadı !");
      }

      for (const zone of zones) {
        const isCountryExists: any = await Country.query()
          .where("id", zone.country_id)
          .first();

        if (!isCountryExists) {
          throw new ValidationError(
            "Ülke Bulunamadı! Bölgeleri Kontrol Ediniz."
          );
        }

        if (zone.zone_id !== 0) {
          const isZoneExists: any = await Zone.query()
            .where("id", zone.zone_id)
            .first();

          if (!isZoneExists) {
            throw new ValidationError(
              "Şehir Bulunamadı! Bölgeleri Kontrol Ediniz."
            );
          }

          const isZoneBelongToCountry = await Zone.query()
            .where("country_id", isCountryExists.id)
            .andWhere("id", isZoneExists.id)
            .first();

          if (!isZoneBelongToCountry) {
            throw new ValidationError(
              "Girdiğiniz Şehir Girdiğiniz Ülkeye Ait Değil! Bölgeleri Kontrol Ediniz."
            );
          }
        }
      }

      let biggestSortOrder;

      if (!sort_order && sort_order != 0) {
        biggestSortOrder = await GeoZone.query()
          .select("sort_order")
          .orderBy([{ column: "sort_order", order: "DESC" }])
          .first();
      }

      const geoZoneUpdated: any = await GeoZone.query()
        .update({
          name,
          description,
          sort_order: biggestSortOrder
            ? biggestSortOrder.sort_order + 1
            : sort_order || 0,
        } as any)
        .where("id", id)
        .first()
        .returning("*");

      await ZoneGeoZone.query().del().where("geo_zone_id", id);

      for (const zone of zones) {
        await ZoneGeoZone.query().insert({
          country_id: zone.country_id,
          zone_id: zone.zone_id,
          geo_zone_id: geoZoneUpdated.id,
        } as any);
      }

      return geoZoneUpdated;
    },
    deleteGeoZone: async (_parent, { input }, _context, _info) => {
      let validatedGeoZone;
      try {
        validatedGeoZone = await deleteGeoZoneValidate.validateAsync(input);
      } catch (err) {
        throw new UserInputError(err.details[0].message);
      }
      let { id } = validatedGeoZone;

      const isGeoZoneExists: any = await GeoZone.query().deleteById(id);

      if (isGeoZoneExists) {
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
