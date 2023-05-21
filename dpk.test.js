const { deterministicPartitionKey, createSha3Hash } = require("./dpk");

describe("createSha3Hash", () => {
  it("hashes correctly using the default algorithm", () => {
    const input = "hello world";
    const hash = createSha3Hash(input);
    expect(hash).toBe("840006653e9ac9e95117a15c915caab81662918e925de9e004f774ff82d7079a40d4d27b1b372657c61d46d470304c88c788b3a4527ad074d1dccbee5dbaa99a");
  });
});

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("hashes correctly using the default algorithm", () => {
    const input = "hello world";
    const hash = deterministicPartitionKey(input);
    const hashedJson = createSha3Hash(JSON.stringify(input));
    expect(hash).toBe(hashedJson);
  });

  it("returns partitionKey if provided", () => {
    const input = { partitionKey: "hello world" };
    const hash = deterministicPartitionKey(input);
    expect(hash).toBe("hello world");
  });
});
