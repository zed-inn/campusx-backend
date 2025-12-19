import { Schema } from "read-excel-file/node";

const CleanString = (value: any) => {
  if (!value) return null;
  const str = String(value).trim();
  if (["-", "na", "n/a", "nil", ""].includes(str.toLowerCase())) {
    return null;
  }
  return str;
};

const CleanNumber = (value: any) => {
  if (typeof value === "number") return value;
  if (!value) return null;

  const str = String(value).trim();
  if (str === "-") return null;

  const num = Number(str);
  if (isNaN(num)) throw new Error("invalid_number");
  return num;
};

const collegeSchema: Schema = {
  aisheCode: { column: "Aishe Code", type: CleanString, required: true },
  name: { column: "Name", type: CleanString, required: true },
  state: { column: "State", type: CleanString },
  district: { column: "District", type: CleanString },
  website: { column: "Website", type: CleanString },
  yearOfEstablishment: { column: "Year Of Establishment", type: CleanNumber },
  location: { column: "Location", type: CleanString },
  collegeType: { column: "College Type", type: CleanString },
  management: { column: "Manegement", type: CleanString },
  universityName: { column: "University Name", type: CleanString },
  universityType: { column: "University Type", type: CleanString },
};

const rdSchema: Schema = {
  aisheCode: { column: "AISHE Code", type: CleanString, required: true },
  name: { column: "Institute Name", type: CleanString, required: true },
  state: { column: "State Name", type: CleanString },
  district: { column: "District Name", type: CleanString },
  administrativeMinistry: {
    column: "Administrative Ministry",
    type: CleanString,
  },
};

const standaloneSchema: Schema = {
  aisheCode: { column: "Aishe Code", type: CleanString, required: true },
  name: { column: "Name", type: CleanString, required: true },
  state: { column: "State", type: CleanString },
  district: { column: "District", type: CleanString },
  yearOfEstablishment: { column: "Year Of Establishment", type: CleanNumber },
  location: { column: "Location", type: CleanString },
  standaloneType: { column: "Standalone Type", type: CleanString },
  management: { column: "Manegement", type: CleanString },
};

const universitySchema: Schema = {
  aisheCode: { column: "Aishe Code", type: CleanString, required: true },
  name: { column: "Name", type: CleanString, required: true },
  state: { column: "State", type: CleanString },
  district: { column: "District", type: CleanString },
  website: { column: "Website", type: CleanString },
  yearOfEstablishment: { column: "Year Of Establishment", type: CleanNumber },
  location: { column: "Location", type: CleanString },
};

const vidyaSchema: Schema = {
  aisheCode: { column: "AISHE Code", type: CleanString, required: true },
  name: { column: "Institute Name", type: CleanString, required: true },
  state: { column: "State Name", type: CleanString },
  management: { column: "Management Type", type: CleanString },
};

export const FILES = [
  { name: "college.xlsx", type: "College", schema: collegeSchema },
  { name: "rd.xlsx", type: "R&D Institute", schema: rdSchema },
  { name: "standalone.xlsx", type: "Standalone", schema: standaloneSchema },
  { name: "university.xlsx", type: "University", schema: universitySchema },
  { name: "vidya.xlsx", type: "Vidyalaxmi Institute", schema: vidyaSchema },
];
