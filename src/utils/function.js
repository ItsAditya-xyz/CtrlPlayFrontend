import { message, results, connect, result } from "@permaweb/aoconnect";
import { createDataItemSigner as nodeCDIS } from "@permaweb/aoconnect/node";

const ao = connect();
export const PROCESS_ID = "4T8COHVsKeuOa7zgMN8Jy9LhdZxr0MRMPMhP4Ml_JZY";
export const PULSE_ID = "jdRZd9pgFUIS45sO3_g-cihGA6IwaIURWBMQSZozfP0";
export function parseCustomJson(str) {
  try {
    // Replace single quotes with double quotes
    const jsonString = str.replace(/'/g, '"');
    // Parse the resulting valid JSON string
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Error parsing string:", error);
    return null; // or return {} if you prefer an empty object
  }
}


export async function getPulseProfile(address) {
  console.log("getPulseProfile called");
  // const addr = await arweaveWindow.getActiveAddress();
  const res = await ao.dryrun({
    process: "jdRZd9pgFUIS45sO3_g-cihGA6IwaIURWBMQSZozfP0",
    tags: [
      { name: "address", value: address },
      { name: "Action", value: "GET_PROFILE" },
    ],
    data: "",
  });
  // console.log(res);
  const { Messages } = res;

  const data = Messages[0].Data;

  const parsedMessages = parseCustomJson(data);

  return parsedMessages;
}


export async function createPulseProfile(username, fullName, profilePic, arweaveWalletWindow) {
  try {
    // First, send the message

    console.log(username, fullName, profilePic)
    const resultsOut = await message({
      process: PULSE_ID,
      tags: [
        { name: "username", value: username },
        { name: "name", value: fullName },
        { name: "profile_picture_url", value: profilePic },

        { name: "Action", value: "UPDATE_PROFILE" },
      ],
      signer: nodeCDIS(arweaveWalletWindow),
      data: "",
    });

    let { Messages, Spawns, Output, Error } = await result({
      // the arweave TXID of the message
      message: resultsOut,
      // the arweave TXID of the process
      process: "jdRZd9pgFUIS45sO3_g-cihGA6IwaIURWBMQSZozfP0",
    });

    console.log(Messages, Spawns, Output, Error);
    const dataTemp = Messages[0].Data;
    console.log(dataTemp);
    const parsedJsonData = parseCustomJson(dataTemp);
    return parsedJsonData;
  } catch (error) {
    console.error("Error in createPulseProfile:", error);
    throw error; // Re-throw the error so the caller can handle it
  }
}

