const crypto = require("crypto");

const createHash = (data) =>  crypto.createHash("sha3-512").update(data).digest("hex");

const getCandidate = (event) => {
  const {partitionKey} = event;
  if (partitionKey) {
    return typeof partitionKey !== "string" ? JSON.stringify(partitionKey) : partitionKey;
  }
  const data = JSON.stringify(event);
  return createHash(data);
}

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  const candidate = getCandidate(event) || TRIVIAL_PARTITION_KEY;
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    return createHash(candidate);
  }
  return candidate;
};
