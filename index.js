import { AnnouncementType, parquet, descriptorForAnnouncementType } from "@dsnp/schemas"; 
import { ParquetSchema, ParquetWriter } from "@dsnp/parquetjs";

// Log the memory usage every second
/*
setInterval(() => {
  const memoryUsage = process.memoryUsage();
  console.log(memoryUsage);
}, 1000);
*/

function randomBase32(length) {
  let str = "";
  for (let n = 0; n < length; n++) {
    str += "abcdefghijklmnopqrstuvwxyz123456"[Math.floor(Math.random() * 32)];
  }
  return str;
}

// Set up parquet output file
const [parquetSchema, writerOptions] = parquet.fromDSNPSchema(descriptorForAnnouncementType(AnnouncementType.Broadcast).parquetSchema);
const writer = await ParquetWriter.openFile(new ParquetSchema(parquetSchema), "./output.parquet", writerOptions);

const maxRows = Number(process.env.ROWS) || 5000;

for (let n = 0; n < maxRows; n++) {
  const row = {
    announcementType: AnnouncementType.Broadcast,
    contentHash: randomBase32(56),
    fromId: Math.floor(Math.random() * 10000000),
    url: `https://www.imadapp.com/data/posts/${randomBase32(56)}`,
  };
  writer.appendRow(row);
  if (n % 100 == 0) console.log(n);
}

console.log("Attempting to close...");
var memoryUsage = process.memoryUsage();
console.log(memoryUsage);

await writer.close();

memoryUsage = process.memoryUsage();
console.log(memoryUsage);
