import Sqids from "sqids";

const alphabet = import.meta.env.VITE_SQIDS_ALPHABET;

const sqidsInstance = new Sqids({
  alphabet,
  minLength: 8,
});

const sqids = {
  encode: (number) => sqidsInstance.encode([number]),
  decode: (encodedId) => sqidsInstance.decode(encodedId)[0],
};

export default sqids;
