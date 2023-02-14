"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const armaments_json_1 = __importDefault(require("./armaments.json"));
let build = {
    strength: 18,
    dexterity: 10,
    intelligence: 7,
    faith: 39,
    arcane: 10,
};
const blockList = ["Shield", "Torch", "Bow"];
const getWeaponsForBuild = (armaments, build) => {
    const weaponsForBuild = [];
    Object.values(armaments).forEach((entry) => {
        let requirementsMet = [];
        Object.entries(entry.requirements).forEach((requirement) => {
            const [key, value] = requirement;
            requirementsMet.push(build[key] >= value);
        });
        if (requirementsMet.every((cur) => cur === true)) {
            const someMatches = blockList.some((blockListEntry) => {
                const regex = new RegExp(`${blockListEntry}`, "i");
                if (entry.category.match(regex)) {
                    return true;
                }
            });
            if (!someMatches) {
                weaponsForBuild.push(entry);
            }
        }
    });
    return weaponsForBuild;
};
const main = () => {
    // sanity check that we have enough stats to get the correct weapons
    //console.log(getTypesOfRequirementsFromJson(armaments))
    const weaponsForBuild = getWeaponsForBuild(armaments_json_1.default, build);
    const readableFormat = weaponsForBuild.map(({ name, requirements, category }) => {
        return {
            name,
            category,
            requirements,
            wikiLink: `https://eldenring.wiki.fextralife.com/${encodeURIComponent(name)}`
        };
    });
    console.log("For the following build:");
    console.log(build);
    console.log(`The build will be able to use the (${readableFormat.length}) following weapons`);
    console.dir(readableFormat, { 'maxArrayLength': null });
};
main();
