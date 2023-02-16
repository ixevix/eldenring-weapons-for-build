# eldenring-weapons-for-build
Takes stats as input and gives all usable items for that build.

# Requirements
* Nodejs
* Note that erdb and the unpacker have their own requirements
* You need the `armaments.json` that you can get by using https://www.nexusmods.com/eldenring/mods/1651 and then generating it with https://github.com/EldenRingDatabase/erdb
Put the file in `./src`. After that just `git clone` `npm i` and `npm start`

It will start an express web server on port 8082

You will need to use the route `/weapons-for-build` as well so `http://localhost/weapons-for-build:8082` to check it out.
