import armaments from "./armaments.json";
import express from "express";
import Ajv from "ajv";
import {weaponsForBuildSchema} from "./schemas";
import {getWeaponsForBuild} from "./main";
import Build from "./types";

const ajv = new Ajv();
const validate = ajv.compile(weaponsForBuildSchema)
const app = express();
const port = 8082;

app.use(express.json())
app.use('/weapons-for-build', express.static("public"))

app.listen(port, () => {
  console.log(`Express listening on port ${port}`);
});

app.post("/api/weapons-for-build", (req, res) => {
  if(!validate(req.body)) {
    res.statusMessage = JSON.stringify(validate.errors);
    res.status(400).end();
  } else {
    const weaponsForBuild = getWeaponsForBuild(armaments, (req.body as Build));
    const readableFormat = weaponsForBuild.map(({name, requirements, category}) => {
      return {
        name,
        category,
        requirements,
        wikiLink: `https://eldenring.wiki.fextralife.com/${encodeURIComponent(name)}`
      }
    })
    res.send(readableFormat);
  }
});