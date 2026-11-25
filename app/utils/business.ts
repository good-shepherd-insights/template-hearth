// What whoever embeds /sample sends, and gets back. Nothing in it is specific to this template.

export type Item = { title?: string; text?: string; person?: string; stars?: number };
export type ListKind = "service" | "review" | "point" | "step";

/** A list left out has not been asked about. An empty one was, and there is nothing. */
export type Business = {
  name: string;
  headline?: string;
  about?: string;
  trade?: string;
  city?: string;
  phone?: string;
  email?: string;
  address?: string;
  hours?: string;
  license?: string;
  founded?: string;
  rating?: string;
  done?: string;
  action?: { does: "call" | "message" | "visit" | "book"; label: string; url?: string };
  areas?: string[];
  service?: Item[];
  review?: Item[];
  point?: Item[];
  step?: Item[];
  logo?: string;
  photos?: string[];
  brand?: string;
  accent?: string;
  lettering?: string;
};

/** Something typed on the page itself: one of the business's own texts, or one of its lists. */
export type Change = { field: string; value: string | string[] } | { list: ListKind; items: Item[] };

export const VERSION = 1;
