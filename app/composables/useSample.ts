import type { Business } from "~/utils/business";

// The business shown on /sample. Null until whoever embeds the page sends one.
export const useSample = () => useState<Business | null>("sample", () => null);
