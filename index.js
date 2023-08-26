Object.defineProperty(Array.prototype, "groupBy", {
    value: function (f) {
        return this.reduce((g, v) => {g[f(v)] ? g[f(v)].push(v) : g[f(v)] = [v]; return g;}, {});
    }
});

const fs = require("fs");

const romsFolder = `C:\\`; // set your rom collection directory here (snes/genesis/etc)

const roms = fs.readdirSync(romsFolder, { withFileTypes: true }).filter(dirent => dirent.isFile()).map(r => ({
    romName: r.name,
    titleName: r.name.replace(/\ \(.*?\.zip/, "") // used to identify duplicates
}));    

const groupedRoms = roms.groupBy(r => r.titleName);

console.log();

console.log(`True total number of titles: ${Object.keys(groupedRoms).length} (${roms.length} roms)`);
console.log(`True total number of unique roms: ${Object.values(groupedRoms).filter(g => g.length === 1).length}`);
console.log(`True number of duplicate titles: ${Object.values(groupedRoms).filter(g => g.length > 1).length} (${Object.values(groupedRoms).filter(g => g.length > 1).reduce((sum, group) => sum += group.length, 0)} roms)`);

console.log();

// unique roms
const unique = Object.values(groupedRoms).filter(g => g.length === 1);

// (World)
const world = Object.values(groupedRoms).filter(g => 
    g.length > 1 && 
    g.some(r => r.romName.includes("(World).zip"))
);
console.log(`duplicated (World) titles = ${Object.keys(world).length} (${world.reduce((sum, group) => sum += group.length, 0)} roms)`);

// (USA)
const usa = Object.values(groupedRoms).filter(g => 
    g.length > 1 && 
    !g.some(r => r.romName.includes("(World).zip")) &&
    g.some(r => r.romName.includes("(USA).zip"))
);
console.log(`duplicated (USA) titles = ${Object.keys(usa).length} (${usa.reduce((sum, group) => sum += group.length, 0)} roms)`);

// (USA, Europe)
const usaEurope = Object.values(groupedRoms).filter(g => 
    g.length > 1 && 
    !g.some(r => r.romName.includes("(World).zip")) &&
    !g.some(r => r.romName.includes("(USA).zip")) &&
    g.some(r => r.romName.includes("(USA, Europe).zip"))
);
console.log(`duplicated (USA, Europe) titles = ${Object.keys(usaEurope).length} (${usaEurope.reduce((sum, group) => sum += group.length, 0)} roms)`);

// (Europe, USA)
const europeUsa = Object.values(groupedRoms).filter(g => 
    g.length > 1 && 
    !g.some(r => r.romName.includes("(World).zip")) &&
    !g.some(r => r.romName.includes("(USA).zip")) &&
    !g.some(r => r.romName.includes("(USA, Europe).zip")) &&
    g.some(r => r.romName.includes("(Europe, USA).zip"))
);
console.log(`duplicated (Europe, USA) titles = ${Object.keys(europeUsa).length} (${europeUsa.reduce((sum, group) => sum += group.length, 0)} roms)`);

// (USA, Japan)
const usaJapan = Object.values(groupedRoms).filter(g => 
    g.length > 1 && 
    !g.some(r => r.romName.includes("(World).zip")) &&
    !g.some(r => r.romName.includes("(USA).zip")) &&
    !g.some(r => r.romName.includes("(USA, Europe).zip")) &&
    !g.some(r => r.romName.includes("(Europe, USA).zip")) &&
    g.some(r => r.romName.includes("(USA, Japan).zip"))
);
console.log(`duplicated (USA, Japan) titles = ${Object.keys(usaJapan).length} (${usaJapan.reduce((sum, group) => sum += group.length, 0)} roms)`);

// (Japan, USA)
const japanUsa = Object.values(groupedRoms).filter(g => 
    g.length > 1 && 
    !g.some(r => r.romName.includes("(World).zip")) &&
    !g.some(r => r.romName.includes("(USA).zip")) &&
    !g.some(r => r.romName.includes("(USA, Europe).zip")) &&
    !g.some(r => r.romName.includes("(Europe, USA).zip")) &&
    !g.some(r => r.romName.includes("(USA, Japan).zip")) &&
    g.some(r => r.romName.includes("(Japan, USA).zip"))
);
console.log(`duplicated (Japan, USA) titles = ${Object.keys(japanUsa).length} (${japanUsa.reduce((sum, group) => sum += group.length, 0)} roms)`);

// (Europe)
const europe = Object.values(groupedRoms).filter(g => 
    g.length > 1 && 
    !g.some(r => r.romName.includes("(World).zip")) &&
    !g.some(r => r.romName.includes("(USA).zip")) &&
    !g.some(r => r.romName.includes("(USA, Europe).zip")) &&
    !g.some(r => r.romName.includes("(Europe, USA).zip")) &&
    !g.some(r => r.romName.includes("(USA, Japan).zip")) &&
    !g.some(r => r.romName.includes("(Japan, USA).zip")) &&
    g.some(r => r.romName.includes("(Europe).zip"))
);
console.log(`duplicated (Europe) titles = ${Object.keys(europe).length} (${europe.reduce((sum, group) => sum += group.length, 0)} roms)`);

// (Europe, Japan)
const europeJapan = Object.values(groupedRoms).filter(g => 
    g.length > 1 && 
    !g.some(r => r.romName.includes("(World).zip")) &&
    !g.some(r => r.romName.includes("(USA).zip")) &&
    !g.some(r => r.romName.includes("(USA, Europe).zip")) &&
    !g.some(r => r.romName.includes("(Europe, USA).zip")) &&
    !g.some(r => r.romName.includes("(USA, Japan).zip")) &&
    !g.some(r => r.romName.includes("(Japan, USA).zip")) &&
    !g.some(r => r.romName.includes("(Europe).zip")) &&
    g.some(r => r.romName.includes("(Europe, Japan).zip"))
);
console.log(`duplicated (Europe, Japan) titles = ${Object.keys(europeJapan).length} (${europeJapan.reduce((sum, group) => sum += group.length, 0)} roms)`);

// (Japan, Europe)
const japanEurope = Object.values(groupedRoms).filter(g => 
    g.length > 1 && 
    !g.some(r => r.romName.includes("(World).zip")) &&
    !g.some(r => r.romName.includes("(USA).zip")) &&
    !g.some(r => r.romName.includes("(USA, Europe).zip")) &&
    !g.some(r => r.romName.includes("(Europe, USA).zip")) &&
    !g.some(r => r.romName.includes("(USA, Japan).zip")) &&
    !g.some(r => r.romName.includes("(Japan, USA).zip")) &&
    !g.some(r => r.romName.includes("(Europe).zip")) &&
    g.some(r => r.romName.includes("(Japan, Europe).zip"))
);
console.log(`duplicated (Japan, Europe) titles = ${Object.keys(japanEurope).length} (${japanEurope.reduce((sum, group) => sum += group.length, 0)} roms)`);

// (Japan)
const japan = Object.values(groupedRoms).filter(g => 
    g.length > 1 && 
    !g.some(r => r.romName.includes("(World).zip")) &&
    !g.some(r => r.romName.includes("(USA).zip")) &&
    !g.some(r => r.romName.includes("(USA, Europe).zip")) &&
    !g.some(r => r.romName.includes("(Europe, USA).zip")) &&
    !g.some(r => r.romName.includes("(USA, Japan).zip")) &&
    !g.some(r => r.romName.includes("(Japan, USA).zip")) &&
    !g.some(r => r.romName.includes("(Europe).zip")) &&
    !g.some(r => r.romName.includes("(Japan, Europe).zip")) &&
    g.some(r => r.romName.includes("(Japan).zip"))
);
console.log(`duplicated japan titles = ${Object.keys(japan).length} (${japan.reduce((sum, group) => sum += group.length, 0)} roms)`);

// unidentified
const unidentified = Object.values(groupedRoms).filter(g => 
    g.length > 1 && 
    !g.some(r => r.romName.includes("(World).zip")) &&
    !g.some(r => r.romName.includes("(USA).zip")) &&
    !g.some(r => r.romName.includes("(USA, Europe).zip")) &&
    !g.some(r => r.romName.includes("(Europe, USA).zip")) &&
    !g.some(r => r.romName.includes("(USA, Japan).zip")) &&
    !g.some(r => r.romName.includes("(Japan, USA).zip")) &&
    !g.some(r => r.romName.includes("(Europe).zip")) &&
    !g.some(r => r.romName.includes("(Japan, Europe).zip")) &&
    !g.some(r => r.romName.includes("(Japan).zip"))
);
console.log(`duplicated unidentified titles (manual decide) = ${Object.keys(unidentified).length} (${unidentified.reduce((sum, group) => sum += group.length, 0)} roms)`);

const parsedRomsFolder = `${romsFolder}/parsed`;
const notParsedRomsFolder = `${romsFolder}/not-parsed`;

if (fs.existsSync(parsedRomsFolder)) fs.rmSync(parsedRomsFolder, { recursive: true, force: true });
if (fs.existsSync(notParsedRomsFolder)) fs.rmSync(notParsedRomsFolder, { recursive: true, force: true });

fs.mkdirSync(parsedRomsFolder);
fs.mkdirSync(notParsedRomsFolder);

// move unique roms to parsed folder
for (const romGroup of unique) {
    for (const rom of romGroup) {
        fs.copyFileSync(`${romsFolder}/${rom.romName}`, `${parsedRomsFolder}/${rom.romName}`);
    }
}

// selects the correct rom in each duplicated group based on name pattern
function moveToParsed(groups, pattern) {
    for (const romGroup of groups) {
        const correctRom = romGroup.filter(r => r.romName.indexOf(`${pattern}.zip`) >= 0)[0];
        fs.copyFileSync(`${romsFolder}/${correctRom.romName}`, `${parsedRomsFolder}/${correctRom.romName}`);
    }
}

moveToParsed(world, "(World)");
moveToParsed(usa, "(USA)");
moveToParsed(usaEurope, "(USA, Europe)");
moveToParsed(europeUsa, "(Europe, USA)");
moveToParsed(usaJapan, "(USA, Japan)");
moveToParsed(japanUsa, "(Japan, USA)");
moveToParsed(europe, "(Europe)");
moveToParsed(europeJapan, "(Europe, Japan)");
moveToParsed(japanEurope, "(Japan, Europe)");
moveToParsed(japan, "(Japan)");

// move uindentified roms to not-parsed folder
for (const romGroup of unidentified) {
    for (const rom of romGroup) {
        fs.copyFileSync(`${romsFolder}/${rom.romName}`, `${notParsedRomsFolder}/${rom.romName}`);
    }
}

