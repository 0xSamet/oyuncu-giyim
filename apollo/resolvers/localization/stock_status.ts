import { UserInputError, ValidationError } from "apollo-server-micro";
import { Country } from "../../../database/models/localization/country";
import { Language } from "../../../database/models/localization/language";
import {
  addStockStatusValidate,
  StockStatus,
  updateStockStatusValidate,
} from "../../../database/models/localization/stock_status";
import {
  addZoneValidate,
  deleteZoneValidate,
  updateZoneValidate,
  Zone,
} from "../../../database/models/localization/zone";
import { ZoneGeoZone } from "../../../database/models/localization/zone_geo_zone";

export default {
  Query: {
    stockStatussesOnAdmin: async (_parent, _args, _context, _info) => {
      const result = await StockStatus.query();
      return result;
    },
    stockStatusOnAdmin: async (_parent, { input: { id } }, _context, _info) => {
      const result = await StockStatus.query().findById(id);
      return result;
    },
    // language: async (_parent, { id }, _context, _info) => {
    //   const result = await Language.query().findById(id);
    //   return result;
    // },
  },
  Mutation: {
    addStockStatus: async (_parent, { input }, _context, _info) => {
      let validatedStockStatusses;
      try {
        validatedStockStatusses = await addStockStatusValidate.validateAsync(
          input
        );
      } catch (err) {
        throw new UserInputError(err.details[0].message);
      }

      const getLastIdRow: any = await StockStatus.query()
        .select("stock_status_id")
        .orderBy([{ column: "stock_status_id", order: "DESC" }])
        .first();

      const lastStockStatusId = getLastIdRow
        ? getLastIdRow.stock_status_id + 1
        : 1;

      //console.log(getLastIdRow);

      let response = [];

      for (const validatedStockStatus of validatedStockStatusses) {
        const getLanguage: any = await Language.query()
          .where("code", validatedStockStatus.language)
          .first();

        if (getLanguage) {
          const insertedStockStatus: any = await StockStatus.query().insertAndFetch(
            {
              stock_status_id: lastStockStatusId,
              language_id: getLanguage.id,
              name: validatedStockStatus.name,
            } as any
          );

          response.push({
            id: insertedStockStatus.stock_status_id,
            name: insertedStockStatus.name,
            language: getLanguage.code,
          });
        }
      }

      return response;
    },
    updateStockStatus: async (_parent, { input }, _context, _info) => {
      let validatedStockStatusses;
      try {
        validatedStockStatusses = await updateStockStatusValidate.validateAsync(
          input
        );
      } catch (err) {
        throw new UserInputError(err.details[0].message);
      }

      //console.log(getLastIdRow);

      let response = [];

      for (const validatedStockStatus of validatedStockStatusses) {
        const getLanguage: any = await Language.query()
          .where("code", validatedStockStatus.language)
          .first();

        if (getLanguage) {
          const findStockStatus: any = await StockStatus.query()
            .where("stock_status_id", validatedStockStatus.id)
            .andWhere("language_id", getLanguage.id)
            .first();

          if (findStockStatus) {
            const updatedStockStatus: any = await StockStatus.query()
              .where("stock_status_id", validatedStockStatus.id)
              .andWhere("language_id", getLanguage.id)
              .first()
              .update({
                name: validatedStockStatus.name,
              } as any)
              .returning("*");
            response.push({
              id: updatedStockStatus.stock_status_id,
              name: updatedStockStatus.name,
              language: getLanguage.code,
            });
          }

          // const findStockStatus: any = await StockStatus.query()
          //   .where("stock_status_id", validatedStockStatus.id)
          //   .andWhere("language_id", getLanguage.id)
          //   .first();
        }
      }

      return response;
    },
    deleteStockStatus: async (_parent, { input }, _context, _info) => {
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
