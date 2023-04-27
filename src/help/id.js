export const generateId = () => {
  // Generate a random 8-byte integer
  const randomInt8 = BigInt.asUintN(
    64,
    BigInt(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER))
  );
  return randomInt8.toString();
};
