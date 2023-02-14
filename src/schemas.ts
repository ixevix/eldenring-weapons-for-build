const weaponsForBuildSchema = {
  type: "object",
  properties: {
    strength: {type: "integer"},
    dexterity: {type: "integer"},
    intelligence: {type: "integer"},
    faith: {type: "integer"},
    arcane: {type: "integer"}
  },
  additionalProperties: false
}

export {
  weaponsForBuildSchema
}