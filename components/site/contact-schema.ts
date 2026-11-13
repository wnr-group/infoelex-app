import { z } from "zod";
import { ENQUIRY_TYPES } from "./data";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(120),
  email: z.email("Enter a valid email address").max(200),
  organisation: z.string().trim().max(160).optional(),
  enquiry: z.enum(ENQUIRY_TYPES),
  message: z.string().trim().min(20, "Please add a little more detail (20+ characters)").max(4000),
  /** Honeypot: real users never fill this in. */
  website: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
