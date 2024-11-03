import { TBarangay, TMunicipality, TProvince } from "@/Types/types";
import {
    getAllProvinces,
    getBarangaysByMunicipality,
    getMunicipalitiesByProvince,
} from "@aivangogh/ph-address";
import { useState } from "react";

function useAddress() {
    const provinces = getAllProvinces();
    const [cities, setCities] = useState<TMunicipality[] | undefined>(
        undefined
    );

    const [barangays, setBarangays] = useState<TBarangay[] | undefined>(
        undefined
    );

    function handleSetProvince(value: string): TProvince | undefined {
        const province = provinces.find((province) => {
            if (value === province.psgcCode) {
                return province;
            }
        });
        if (province) {
            const cities = getMunicipalitiesByProvince(province.psgcCode);
            setCities(cities);
        } else {
            undefined;
        }

        return province;
    }

    function handleSetCity(value: string): TMunicipality | undefined {
        if (!cities) {
            return undefined;
        }

        const city = cities.find((city) => {
            if (value === city.psgcCode) {
                return cities;
            }
        });

        if (city) {
            const barangays = getBarangaysByMunicipality(city.psgcCode);
            setBarangays(barangays);
        }

        return city;
    }

    function handleSetBarangay(value: string): TBarangay | undefined {
        if (!barangays) {
            return undefined;
        }

        const barangay = barangays.find((barangay) => {
            if (value === barangay.psgcCode) {
                return barangay;
            }
        });

        return barangay;
    }

    return {
        provinces,
        cities,
        barangays,
        handleSetProvince,
        handleSetCity,
        handleSetBarangay,
    };
}

export default useAddress;
