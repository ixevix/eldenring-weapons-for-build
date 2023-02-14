import Build from "./types"

const getTypesOfRequirementsFromJson = (armaments: any) => {
  const typesOfRequirements: Map<string, boolean> = new Map();
  Object.values(armaments).forEach((entry) => {
    Object.keys((entry as any).requirements).forEach((requirement) => {
      typesOfRequirements.set(requirement, true);
    });
  });
  const obj = Object.fromEntries(typesOfRequirements);
  return obj;
}

export default getTypesOfRequirementsFromJson;