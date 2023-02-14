import armaments from "./armaments.json";
import Build from "./types"
import getTypesOfRequirementsFromJson from "./tests";

let build: Build = {
  strength: 18,
  dexterity: 10,
  intelligence: 7,
  faith: 39,
  arcane: 10,
}

//const blockList = ["Shield", "Torch", "Bow"]
const blockList: string[] = [];

const getWeaponsForBuild = (armaments: any, build: Build) => {
  const weaponsForBuild: any[] = [];
  Object.values(armaments).forEach((entry) => {
    let requirementsMet: boolean[] = [];
    Object.entries((entry as any).requirements).forEach((requirement) => {
      const [key, value] = requirement;
      requirementsMet.push((build as any)[key] >= (value as number));
    });
    if (requirementsMet.every((cur) => cur === true)) {
      const someMatches = blockList.some((blockListEntry) => {
        const regex = new RegExp(`${blockListEntry}`, "i");
        if((entry as any).category.match(regex)) {
          return true
        }
      })
      if (!someMatches) {
        weaponsForBuild.push(entry);
      }
    }
  });
  return weaponsForBuild;
}

const main = () => {
  // sanity check that we have enough stats to get the correct weapons
  //console.log(getTypesOfRequirementsFromJson(armaments))

  const weaponsForBuild = getWeaponsForBuild(armaments, build);
  const readableFormat = weaponsForBuild.map(({name, requirements, category}) => {
    return {
      name,
      category,
      requirements,
      wikiLink: `https://eldenring.wiki.fextralife.com/${encodeURIComponent(name)}`
    }
  })
  console.log("For the following build:")
  console.log(build);
  console.log(`The build will be able to use the (${readableFormat.length}) following weapons`)
  console.dir(readableFormat, {'maxArrayLength': null})
};

export {
  getWeaponsForBuild
}