import { z } from "zod";

export const SchoolSchema = z.object({
  name: z.string(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  contact: z.number(),
  image: z.string(),
  email_id: z.string().email("Please provide proper email address"),
})

