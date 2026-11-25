// The one place a business becomes this template's content. What /sample shows and what a site is
// built from are both this. Only what the business stated, and wording that promises nothing: a
// section with nothing true to say is left out.
import type { Content, GroupField, ImageField, LinkField, RichTextField, SliceZone } from "@prismicio/client";
import type { Business } from "./business";

export type Picture = { url: string; alt: string };
type Block = { type: "heading1" | "heading2" | "heading3" | "paragraph"; text: string; spans: [] };
type WebLink = { link_type: "Web"; url: string };

// A field as it is written to Prismic, from the generated type of the field as it is read. A field
// may be left out, never set to something its model does not take.
type Written<Field> = [Field] extends [string | number | boolean | null]
  ? NonNullable<Field>
  : [Field] extends [ImageField<never> | ImageField]
    ? Picture
    : [Field] extends [RichTextField]
      ? Block[]
      : [Field] extends [LinkField]
        ? WebLink
        : [Field] extends [GroupField<infer Part>]
          ? { [Name in keyof Part]?: Written<Part[Name]> }[]
          : never;
type WrittenFields<Fields> = { [Name in keyof Fields]?: Written<Fields[Name]> };

type Section<Type extends string, Primary> = { slice_type: Type; variation: "default"; primary: WrittenFields<Primary> };
type Sections =
  | Section<"hearth_hero", Content.HearthHeroSliceDefaultPrimary>
  | Section<"hearth_trust_strip", Content.HearthTrustStripSliceDefaultPrimary>
  | Section<"hearth_services", Content.HearthServicesSliceDefaultPrimary>
  | Section<"hearth_how_it_works", Content.HearthHowItWorksSliceDefaultPrimary>
  | Section<"hearth_reviews", Content.HearthReviewsSliceDefaultPrimary>
  | Section<"hearth_service_area", Content.HearthServiceAreaSliceDefaultPrimary>
  | Section<"hearth_cta", Content.HearthCtaSliceDefaultPrimary>;

export type Settings = WrittenFields<Content.SettingsDocumentData>;
export type Homepage = Omit<WrittenFields<Content.HomepageDocumentData>, "slices"> & { slices: Sections[] };

const text = (type: Block["type"], value: string | undefined): Block[] | undefined => (value ? [{ type, text: value, spans: [] }] : undefined);
const isColour = (value: string): value is `#${string}` => /^#[0-9a-f]{6}$/i.test(value);
const colour = (value = "") => (isColour(value) ? value : undefined);
const link = (url: string | undefined): WebLink | undefined => (url?.startsWith("https://") ? { link_type: "Web", url } : undefined);
const some = <T>(list: T[] | undefined): list is T[] => list !== undefined && list.length > 0;

const FONTS: Record<string, Settings["font_pair"]> = { modern: "Modern", classic: "Classic", friendly: "Friendly" };
const DOES = { call: "Call", message: "Message", visit: "Visit", book: "Book" } as const;

/** Every answer this template shows. Nobody is asked for one it does not. */
export const USES: (keyof Business)[] = [
  "name", "headline", "about", "trade", "city", "phone", "email", "address", "hours", "license", "founded", "rating", "done",
  "action", "areas", "service", "review", "point", "step", "logo", "photos", "brand", "accent", "lettering",
];

// As useCta decides it: somewhere the main button can go.
const reachable = ({ phone, email, address, action }: Business) =>
  Boolean(phone || email || (action?.does === "visit" && address) || (action?.does === "book" && link(action.url)));

const icon = (label: string) =>
  /licen|insur|bond|guarant|warrant|certif/i.test(label) ? "shield"
  : /price|pricing|quote|cost|estimate|free/i.test(label) ? "price"
  : /hour|day|fast|same|24|quick|since|year/i.test(label) ? "clock"
  : "check";

/** Without what has no value, so nothing empty is sent. */
function filled(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(filled);
  if (typeof value !== "object" || value === null) return value;
  return Object.fromEntries(
    Object.entries(value).filter(([, part]) => part !== undefined && part !== "").map(([name, part]) => [name, filled(part)]));
}

export function contentOf(business: Business): { settings: Settings; homepage: Homepage } {
  const { name, headline, about, trade, city, areas, service, review, point = [], step, photos = [], founded, done } = business;
  const picture = (url: string | undefined): Picture | undefined => (url?.startsWith("https://") ? { url, alt: name } : undefined);
  const [first, second] = photos.map(picture);
  const since = founded && (/^\d{4}$/.test(founded) ? `Since ${founded}` : founded);
  // The photos carry these two. Without a photo they are reasons to trust the business like any other.
  const points = [...point.map(({ title }) => title), first ? undefined : since, second ? undefined : done].filter((label) => label !== undefined);

  const settings: Settings = {
    business_name: name,
    logo: picture(business.logo),
    trade,
    city,
    phone: business.phone,
    email: business.email,
    address: business.address,
    hours: business.hours,
    primary_color: colour(business.brand),
    accent_color: colour(business.accent),
    font_pair: FONTS[business.lettering ?? ""] ?? "Modern",
    cta_label: business.action?.label,
    cta_action: business.action && DOES[business.action.does],
    cta_link: business.action?.does === "book" ? link(business.action.url) : undefined,
    license_note: business.license && (/licen/i.test(business.license) ? business.license : `License ${business.license}`),
  };

  const slices: Sections[] = [
    {
      slice_type: "hearth_hero",
      variation: "default",
      primary: {
        rating_text: business.rating,
        heading: text("heading1", headline ?? name),
        description: text("paragraph", about),
        image_one: first,
        chip_one: first && since,
        image_two: second,
        chip_two: second && done,
      },
    },
  ];
  if (some(points)) {
    slices.push({ slice_type: "hearth_trust_strip", variation: "default", primary: { points: points.map((label) => ({ icon: icon(label), label })) } });
  }
  if (some(service)) {
    slices.push({
      slice_type: "hearth_services",
      variation: "default",
      primary: {
        eyebrow: "Our services",
        heading: text("heading2", "What we do"),
        services: service.map(({ title, text: words }) => ({ name: text("heading3", title), description: text("paragraph", words) })),
      },
    });
  }
  if (some(step)) {
    slices.push({
      slice_type: "hearth_how_it_works",
      variation: "default",
      primary: { heading: text("heading2", "How it works"), steps: step.map((part) => ({ title: text("heading3", part.title), text: text("paragraph", part.text) })) },
    });
  }
  if (some(review)) {
    slices.push({
      slice_type: "hearth_reviews",
      variation: "default",
      primary: {
        eyebrow: "Reviews",
        heading: text("heading2", "What customers say"),
        reviews: review.map(({ text: quote, person, title, stars }) => ({ quote: text("paragraph", quote), name: person, detail: title, rating: stars })),
      },
    });
  }
  if (some(areas)) {
    slices.push({
      slice_type: "hearth_service_area",
      variation: "default",
      primary: {
        eyebrow: "Service area",
        heading: text("heading2", "Where we work"),
        text: text("paragraph", reachable(business) ? "Not sure about your address? Get in touch and ask." : undefined),
        areas: areas.map((area) => ({ name: area })),
      },
    });
  }
  if (reachable(business)) {
    slices.push({
      slice_type: "hearth_cta",
      variation: "default",
      primary: { heading: text("heading2", "Ready to talk?"), text: text("paragraph", "Tell us what you need.") },
    });
  }

  const what = [trade, city && `in ${city}`].filter(Boolean).join(" ");
  const homepage: Homepage = {
    meta_title: [name, what].filter(Boolean).join(" · "),
    meta_description: about ?? headline ?? name,
    meta_image: first ?? picture(business.logo),
    slices,
  };
  return { settings, homepage };
}

/** As Prismic documents. */
export const documentsOf = (business: Business) => {
  const { settings, homepage } = contentOf(business);
  return [
    { type: "settings", lang: "en-us", title: "Settings", data: filled(settings) },
    { type: "homepage", lang: "en-us", title: "Homepage", data: filled(homepage) },
  ];
};

// What Prismic adds when content is read back: what a component needs, and no repository knows yet.
function asRead(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(asRead);
  if (typeof value !== "object" || value === null) return value;
  if ("alt" in value && "url" in value) return { id: "", copyright: null, edit: {}, dimensions: { width: 800, height: 600 }, ...value };
  const read = Object.fromEntries(Object.entries(value).map(([name, part]) => [name, asRead(part)]));
  return "slice_type" in value ? { id: value.slice_type, version: "", slice_label: null, items: [], ...read } : read;
}

export function previewOf(business: Business) {
  const { settings, homepage } = contentOf(business);
  return {
    settings: asRead(filled(settings)) as Content.SettingsDocumentData,
    slices: asRead(filled(homepage.slices)) as SliceZone<Content.HomepageDocumentDataSlicesSlice>,
  };
}
