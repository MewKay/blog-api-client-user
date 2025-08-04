import validator from "validator";
import ranges from "./validationRanges";
import validateSchema, { invalidLengthMessage } from "@/lib/validateSchema";

const commentSchema = validateSchema({
  text: [
    {
      pattern: (value) => validator.isLength(value, ranges.commentText),
      message: invalidLengthMessage("Comment", ranges.commentText),
    },
  ],
});

export default commentSchema;
