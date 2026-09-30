import { z } from "zod";

export const deliveryRequestSchema = z.object({
  analysisRef: z.string().min(1).max(40_000),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .max(254)
    .pipe(z.email({ error: "Bitte gib eine gültige E-Mail-Adresse ein." })),
  newsletterConsent: z.boolean(),
});

export type DeliveryRequest = z.infer<typeof deliveryRequestSchema>;
