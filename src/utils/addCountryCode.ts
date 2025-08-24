import { parsePhoneNumberFromString } from "libphonenumber-js";

export const addCountryCode = (phone: string, defaultCountry: "BD") => {
  const phoneNumber = parsePhoneNumberFromString(phone, defaultCountry);
  if (!phoneNumber) {
    return;
  }

  return phoneNumber.formatInternational().replace(/[\s-]/g, "");
};
