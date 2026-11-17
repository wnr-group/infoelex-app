import { z } from "zod";
import { ENQUIRY_TYPES } from "./data";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(120),
  email: z.email("Enter a valid email address").max(200),
  organisation: z.string().trim().min(2, "Please enter your company").max(160),
  phone: z.string().trim().max(40).optional(),
  enquiry: z.enum(ENQUIRY_TYPES, { error: "Please select a discipline" }),
  /** Estimated rating or voltage level, free text (e.g. "150MW / 275kV"). */
  rating: z.string().trim().max(120).optional(),
  /** Target commissioning or FEED date, free text. */
  targetDate: z.string().trim().max(120).optional(),
  message: z.string().trim().min(20, "Please add a little more detail (20+ characters)").max(4000),
  /** Honeypot: real users never fill this in. */
  website: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
