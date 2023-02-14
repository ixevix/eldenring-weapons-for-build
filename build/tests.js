"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getTypesOfRequirementsFromJson = (armaments) => {
    const typesOfRequirements = new Map();
    Object.values(armaments).forEach((entry) => {
        Object.keys(entry.requirements).forEach((requirement) => {
            typesOfRequirements.set(requirement, true);
        });
    });
    const obj = Object.fromEntries(typesOfRequirements);
    return obj;
};
exports.default = getTypesOfRequirementsFromJson;
