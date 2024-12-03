import { connect } from "@permaweb/aoconnect";
import { createDataItemSigner as nodeCDIS } from "@permaweb/aoconnect/node";
import { message } from "@permaweb/aoconnect";
export const GAME_ID = "4T8COHVsKeuOa7zgMN8Jy9LhdZxr0MRMPMhP4Ml_JZY";

const AppVersion = "1.0.0";

const CommonTags = [
  { name: "App-Name", value: "4Cards" },
  { name: "App-Version", value: AppVersion },
];

/**
 * Runs Lua code through the AO network
 * @param {string} code - The Lua code to run
 * @param {string} process - The process identifier
 * @param {Array<{name: string, value: string}>} tags - Optional additional tags
 * @returns {Promise<any>} The result of running the code
 */
export async function runLua(code = "", process, tags) {
  const ao = connect();

  if (tags) {
    tags = [...CommonTags, ...tags];
  } else {
    tags = CommonTags;
  }

  tags = [...tags, { name: "Action", value: "Eval" }];

  const message = await ao.message({
    process,
    data: code,
    signer: nodeCDIS(window.arweaveWallet),
    tags,
  });

  const result = await ao.result({ process, message });
  return result;
}


/**
 * Gets results from the AO network
 * @param {string} process - The process identifier
 * @param {string} cursor - Pagination cursor
 * @returns {Promise<{cursor: string, results: Array<any>}>} The results and next cursor
 */
export async function getResults(process, cursor = "") {
  const ao = connect();

  const r = await ao.results({
    process,
    from: cursor,
    sort: "ASC",
    limit: 999999,
  });

  if (r.edges.length > 0) {
    const newCursor = r.edges[r.edges.length - 1].cursor;
    const results = r.edges.map((e) => e.node);
    return { cursor: newCursor, results };
  } else {
    return { cursor, results: [] };
  }
}

/**
 * Parses the output from the AO network
 * @param {any} out - The output to parse
 * @returns {any} The parsed output
 */
export function parseOutupt(out) {
  if (!out.Output) return out;
  const data = out.Output.data;
  const { json, output } = data;
  if (json != "undefined") {
    return json;
  }
  try {
    return JSON.parse(output);
  } catch (e) {
    return output;
  }
}