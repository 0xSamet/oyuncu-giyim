import { Language } from "../../../database/models/localization/language";

export const getLanguage = async (params) => {
  const validLanguageCodes = await Language.query().select(
    "code",
    "sort_order"
  );

  const primaryLanguage = validLanguageCodes.sort(
    (a, b) => a.sort_order - b.sort_order
  )[0].code;

  if (params.language) {
    const tryFound = validLanguageCodes.find((a) => a.code === params.language);
    if (tryFound) {
      return params.language;
    } else {
      return primaryLanguage;
    }
  }
};
