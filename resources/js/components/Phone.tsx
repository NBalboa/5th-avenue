import "react-international-phone/style.css";
import {
    defaultCountries,
    parseCountry,
    PhoneInput,
} from "react-international-phone";
import { PhoneNumberUtil } from "google-libphonenumber";
import { useState } from "react";

const phoneUtil = PhoneNumberUtil.getInstance();

const Phone = ({
    phone,
    setPhone,
    setIsValid,
    isValid,
}: {
    phone: string;
    isValid: boolean;
    setIsValid: (valid: boolean) => void;
    setPhone: (phone: string) => void;
}) => {
    const countries = defaultCountries.filter((country) => {
        const { iso2 } = parseCountry(country);
        return ["ph"].includes(iso2);
    });

    const validatePhoneNumber = (phone: string) => {
        try {
            const parsedNumber = phoneUtil.parse(phone, "PH"); // Parse for PH region
            const valid = phoneUtil.isValidNumberForRegion(parsedNumber, "PH"); // Validate for PH
            setIsValid(valid);
            return valid;
        } catch (error) {
            setIsValid(false);
            return false;
        }
    };

    const handlePhoneChange = (phone: string) => {
        setPhone(phone);
        validatePhoneNumber(phone); // Validate as the input changes
    };

    return (
        <div>
            <PhoneInput
                defaultCountry="ph"
                countries={countries}
                value={phone}
                inputClassName="w-full"
                onChange={handlePhoneChange}
            />
            {!isValid && (
                <p className="text-red-500 mt-2">Invalid phone number</p>
            )}
        </div>
    );
};

export default Phone;
