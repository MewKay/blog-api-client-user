import Sqids from "sqids";

const alphabet = import.meta.env.VITE_SQIDS_ALPHABET;
const ID_LENGTH = 8;

const sqidsInstance = new Sqids({
  alphabet,
  minLength: ID_LENGTH,
});

const isCanonical = function checkIfEncodedIdIsCanonical(inputId) {
  const decodedId = sqidsInstance.decode(inputId);
  const encodedId = sqidsInstance.encode(decodedId);

  return inputId === encodedId;
};

const sqids = {
  encode: (number) => sqidsInstance.encode([number]),
  decode: (encodedId) => {
    const isLengthValid = encodedId.length === 8;

    if (!isLengthValid || !isCanonical(encodedId)) {
      throw new Response("Invalid ID", { status: 400 });
    }

    const decodedIds = sqidsInstance.decode(encodedId);

    if (decodedIds.length > 1) {
      throw new Response("Invalid ID", { status: 400 });
    }

    return decodedIds[0];
  },
};

export default sqids;
