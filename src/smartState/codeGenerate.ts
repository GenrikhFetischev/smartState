import fs from "fs";
import path from "path";

export const createGenericPart = (nestedNum: number) => {
  let result = "K1 extends keyof T";
  let generic = "";
  let path = "";
  for (let i = 2; i <= nestedNum; i++) {
    generic = `K${i}`;
    path += `[K${i - 1}]`;
    result += `, ${generic} extends keyof T${path}`;
  }
  return result;
};

export const createTypeBody = (nestedNum: number, currentNum = 1): any => {
  let key = `[P${currentNum} in K${currentNum}]`;
  if (currentNum === nestedNum) {
    let value = "T";
    for (let i = 1; i <= nestedNum; i++) {
      if (i === nestedNum) {
        value += `[P${i}]`;
      } else {
        value += `[K${i}]`;
      }
    }

    return {
      [key]: value,
    };
  } else {
    return {
      [key]: createTypeBody(nestedNum, currentNum + 1),
    };
  }
};

export const generateFunctionArgsType = (argsCount: number) => {
  let result = "obj: T";
  for (let i = 1; i <= argsCount; i++) {
    result += `, k${i}: K${i}`;
  }

  return result;
};

export const generateGetResultType = (pathLength: number) => {
  let res = "T";
  for (let i = 1; i <= pathLength; i++) {
    res += `[K${i}]`;
  }

  return res;
};

export const generateTypesafeFunctionCode = (functionName: string) => {
  return `
export function ${functionName}(obj: any, ...keys: any) {
    return get(obj, keys.join("."))
}

`;
};

export const generatePick = (nestedNum: number) => {
  let fileContent = "";

  for (let i = 2; i <= nestedNum; i++) {
    let result = `export type Pick${i}<T, ${createGenericPart(
      nestedNum
    )}> = ${JSON.stringify(createTypeBody(nestedNum)).replace(/"/gim, "")};`;
    fileContent += `${result}\n`;
  }
  return fileContent;
};

export const generateTypesafeGetTypes = (
  nestedNum: number,
  functionName: string
) => {
  let fileContent = 'import get from "lodash.get" \n';

  for (let i = 1; i <= nestedNum; i++) {
    let result = `export function ${functionName}<T, ${createGenericPart(
      i
    )}>(${generateFunctionArgsType(i)}):${generateGetResultType(i)};`;
    fileContent += `${result}\n`;
  }
  return fileContent + generateTypesafeFunctionCode(functionName);
};

const nestedLevelsCount = 8;

fs.writeFileSync(
  path.resolve("./src/smartState/generated/picks_generated.ts"),
  generatePick(nestedLevelsCount)
);
fs.writeFileSync(
  path.resolve("./src/smartState/generated/typesafeGet_generated.ts"),
  generateTypesafeGetTypes(nestedLevelsCount, "typesafeGet")
);
