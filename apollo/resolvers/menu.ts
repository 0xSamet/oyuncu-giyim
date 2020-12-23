import { UserInputError, ValidationError } from "apollo-server-micro";
import { Language } from "../../database/models/language";
import {
  addDesktopMenuValidate,
  deleteDesktopMenuValidate,
  DesktopMenu,
  DesktopMenuDescription,
  MobileMenu,
  updateDesktopMenuValidate,
} from "../../database/models/menu";
import { getLanguage } from "./helpers";

export default {
  DesktopMenu: {
    description: async (
      parent,
      params,
      { loaders: { desktopMenuDescriptionLoader }, req },
      _info
    ) => {
      return desktopMenuDescriptionLoader.load({
        id: parent.id,
        language: req.language,
      });
    },
  },
  DesktopMenuOnAdmin: {
    description: async (
      parent,
      params,
      { loaders: { desktopMenuDescriptionAdminLoader } },
      _info
    ) => {
      return desktopMenuDescriptionAdminLoader.load({
        id: parent.id,
      });
    },
  },
  MobileMenu: {
    description: async (
      parent,
      params,
      { loaders: { mobileMenuDescriptionLoader }, req },
      _info
    ) => {
      return mobileMenuDescriptionLoader.load({
        id: parent.id,
        language: req.language,
      });
    },
  },
  MobileMenuOnAdmin: {
    description: async (
      parent,
      params,
      { loaders: { mobileMenuDescriptionAdminLoader } },
      _info
    ) => {
      return mobileMenuDescriptionAdminLoader.load({
        id: parent.id,
      });
    },
  },
  Query: {
    desktopMenu: async (_parent, params, { req }, _info) => {
      const result = await DesktopMenu.query();
      req.language = await getLanguage(params);
      return result;
    },
    desktopMenuOnAdmin: async (_parent, _params, _ctx, _info) => {
      const result = await DesktopMenu.query();
      return result;
    },
    desktopMenuOnAdminOne: async (_parent, { input: { id } }, _ctx, _info) => {
      const result = await DesktopMenu.query().first().where("id", id);
      return result;
    },
    mobileMenu: async (_parent, params, { req }, _info) => {
      const result = await MobileMenu.query();
      req.language = await getLanguage(params);
      return result;
    },
    mobileMenuOnAdmin: async (_parent, params, { req }, _info) => {
      const result = await MobileMenu.query();
      return result;
    },
  },
  Mutation: {
    addDesktopMenu: async (_parent, { input }, { db }, _info) => {
      let validatedMenu;
      try {
        validatedMenu = await addDesktopMenuValidate.validateAsync(input);
      } catch (err) {
        throw new UserInputError(err.details[0].message);
      }

      try {
        const { status, sort_order, is_divider } = validatedMenu;

        let biggestSortOrder;

        if (!sort_order && sort_order != 0) {
          biggestSortOrder = await DesktopMenu.query()
            .select("sort_order")
            .orderBy([{ column: "sort_order", order: "DESC" }])
            .first();
        }

        const menuAdded: any = await DesktopMenu.query().insert({
          status,
          sort_order: biggestSortOrder
            ? biggestSortOrder.sort_order + 1
            : sort_order,
          is_divider,
        } as any);

        for (const description of validatedMenu.description) {
          const getLanguage: any = await Language.query()
            .where("code", description.language)
            .first();

          if (getLanguage) {
            await DesktopMenuDescription.query().insert({
              desktop_menu_id: menuAdded.id,
              language_id: getLanguage.id,
              name: description.name,
              href: description.href,
              target: description.target,
              icon_url: description.icon_url,
            } as any);
          }
        }

        return menuAdded;
      } catch (err) {
        console.log(err);
        return {
          success: false,
        };
      }
    },
    updateDesktopMenu: async (_parent, { input }, { db }, _info) => {
      let validatedMenu;
      try {
        validatedMenu = await updateDesktopMenuValidate.validateAsync(input);
      } catch (err) {
        throw new UserInputError(err.details[0].message);
      }

      try {
        const { id, status, sort_order, is_divider } = validatedMenu;

        const isMenuExists = await DesktopMenu.query().first().where("id", id);

        if (!isMenuExists) {
          throw new UserInputError(`Menü Bulunamadı.`);
        }

        let biggestSortOrder;

        if (!sort_order && sort_order != 0) {
          biggestSortOrder = await DesktopMenu.query()
            .select("sort_order")
            .orderBy([{ column: "sort_order", order: "DESC" }])
            .first();
        }

        const updatedMenu = await DesktopMenu.query()
          .update({
            sort_order: biggestSortOrder
              ? biggestSortOrder.sort_order + 1
              : sort_order,
            status,
            is_divider,
          } as any)
          .where("id", id)
          .first()
          .returning("*");

        for (const description of validatedMenu.description) {
          const getLanguage: any = await Language.query()
            .where("code", description.language)
            .first();

          if (getLanguage) {
            const isDescriptionExists = await DesktopMenuDescription.query()
              .where("desktop_menu_id", id)
              .andWhere("language_id", getLanguage.id)
              .first();
            if (isDescriptionExists) {
              await DesktopMenuDescription.query()
                .update({
                  name: description.name,
                  href: description.href,
                  target: description.target,
                  icon_url: description.icon_url,
                } as any)
                .where("desktop_menu_id", id)
                .andWhere("language_id", getLanguage.id);
            } else {
              await DesktopMenuDescription.query().insert({
                name: description.name,
                href: description.href,
                target: description.target,
                icon_url: description.icon_url,
                desktop_menu_id: id,
                language_id: getLanguage.id,
              } as any);
            }
          }
        }

        return updatedMenu;
      } catch (err) {
        console.log(err);
        return {
          success: false,
        };
      }
    },
    deleteDesktopMenu: async (_parent, { input }, { db }, _info) => {
      let validatedMenu;
      try {
        validatedMenu = await deleteDesktopMenuValidate.validateAsync(input);
      } catch (err) {
        throw new UserInputError(err.details[0].message);
      }

      let { id } = validatedMenu;

      const deletedMenu = await DesktopMenu.query()
        .deleteById(id)
        .returning("*");

      if (!deletedMenu) {
        throw new ValidationError(`Menü Bulunamadı.`);
      }

      return {
        success: true,
      };
    },
    sortDesktopMenu: async (_parent, { input }, { db }, _info) => {
      try {
        for (const menu of input) {
          await DesktopMenu.query()
            .update({
              sort_order: menu.sort_order,
            })
            .where("id", menu.id);
        }

        return {
          success: true,
        };
      } catch (err) {
        console.log(err);
        return {
          success: false,
        };
      }
    },
    addMobileMenu: async (_parent, { input }, { db }, _info) => {
      try {
        const { name, href, target, icon_url } = input;

        const biggestSortOrder = await MobileMenu.query()
          .select("sort_order")
          .orderBy([{ column: "sort_order", order: "DESC" }])
          .first();

        await MobileMenu.query().insert({
          name,
          href,
          target,
          icon_url,
          sort_order: biggestSortOrder.sort_order + 1,
        });

        return {
          success: true,
        };
      } catch (err) {
        console.log(err);
        return {
          success: false,
        };
      }
    },
    updateMobileMenu: async (_parent, { input }, { db }, _info) => {
      try {
        const { id, name, href, target, icon_url } = input;

        await MobileMenu.query().where("id", id).first().update({
          name,
          href,
          target,
          icon_url,
        });

        return {
          success: true,
        };
      } catch (err) {
        console.log(err);
        return {
          success: false,
        };
      }
    },
    deleteMobileMenu: async (_parent, { input }, { db }, _info) => {
      try {
        await MobileMenu.query().deleteById(input.id);

        return {
          success: true,
        };
      } catch (err) {
        console.log(err);
        return {
          success: false,
        };
      }
    },
    sortMobileMenu: async (_parent, { input }, { db }, _info) => {
      try {
        for (const menu of input) {
          await MobileMenu.query()
            .update({
              sort_order: menu.sort_order,
            })
            .where("id", menu.id);
        }

        return {
          success: true,
        };
      } catch (err) {
        console.log(err);
        return {
          success: false,
        };
      }
    },
  },
};
