import type * as prismic from "@prismicio/client";

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };


type PickContentRelationshipFieldData<
	TRelationship extends prismic.CustomTypeModelFetchCustomTypeLevel1 | prismic.CustomTypeModelFetchCustomTypeLevel2 | prismic.CustomTypeModelFetchGroupLevel1 | prismic.CustomTypeModelFetchGroupLevel2,
	TData extends Record<string, prismic.AnyRegularField | prismic.GroupField | prismic.NestedGroupField | prismic.SliceZone>,
	TLang extends string
> = |
	// Content relationship fields
	{
		[TSubRelationship in Extract<
			TRelationship["fields"][number], prismic.CustomTypeModelFetchContentRelationshipLevel1
		> as TSubRelationship["id"]]:
			ContentRelationshipFieldWithData<TSubRelationship["customtypes"], TLang>;
	} &
	// Group
	{
		[TGroup in Extract<
			TRelationship["fields"][number], prismic.CustomTypeModelFetchGroupLevel1 | prismic.CustomTypeModelFetchGroupLevel2
		> as TGroup["id"]]:
			TData[TGroup["id"]] extends prismic.GroupField<infer TGroupData>
				? prismic.GroupField<PickContentRelationshipFieldData<TGroup, TGroupData, TLang>>
				: never
	} &
	// Other fields
	{
		[TFieldKey in Extract<TRelationship["fields"][number], string>]:
			TFieldKey extends keyof TData ? TData[TFieldKey] : never;
	};

type ContentRelationshipFieldWithData<
	TCustomType extends readonly (prismic.CustomTypeModelFetchCustomTypeLevel1 | string)[] | readonly (prismic.CustomTypeModelFetchCustomTypeLevel2 | string)[],
	TLang extends string = string
> = {
	[ID in Exclude<TCustomType[number], string>["id"]]:
		prismic.ContentRelationshipField<
			ID,
			TLang,
			PickContentRelationshipFieldData<
				Extract<TCustomType[number], { id: ID }>,
				Extract<prismic.Content.AllDocumentTypes, { type: ID }>["data"],
				TLang
			>
		>
}[Exclude<TCustomType[number], string>["id"]];

type HomepageDocumentDataSlicesSlice = HearthHeroSlice | HearthTrustStripSlice | HearthServicesSlice | HearthHowItWorksSlice | HearthReviewsSlice | HearthServiceAreaSlice | HearthCtaSlice

/**
 * Content for Homepage documents
 */
interface HomepageDocumentData {
	/**
	 * Slice Zone field in *Homepage*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: homepage.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<HomepageDocumentDataSlicesSlice>;/**
	 * Meta Title field in *Homepage*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: homepage.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
	
	/**
	 * Meta Description field in *Homepage*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: homepage.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Meta Image field in *Homepage*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: homepage.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;
}

/**
 * Homepage document from Prismic
 *
 * - **API ID**: `homepage`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type HomepageDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<HomepageDocumentData>, "homepage", Lang>;

/**
 * Content for Settings documents
 */
interface SettingsDocumentData {
	/**
	 * Business name field in *Settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.business_name
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	business_name: prismic.KeyTextField;
	
	/**
	 * Logo field in *Settings*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.logo
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	logo: prismic.ImageField<never>;
	
	/**
	 * Trade field in *Settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: e.g. Plumbing
	 * - **API ID Path**: settings.trade
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	trade: prismic.KeyTextField;
	
	/**
	 * City or service area field in *Settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.city
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	city: prismic.KeyTextField;
	
	/**
	 * Phone field in *Settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.phone
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	phone: prismic.KeyTextField;
	
	/**
	 * Email field in *Settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.email
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	email: prismic.KeyTextField;
	
	/**
	 * Address field in *Settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.address
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	address: prismic.KeyTextField;
	
	/**
	 * Opening hours field in *Settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.hours
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	hours: prismic.KeyTextField;
	
	/**
	 * Brand colour field in *Settings*
	 *
	 * - **Field Type**: Color
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.primary_color
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/color
	 */
	primary_color: prismic.ColorField;
	
	/**
	 * Accent colour field in *Settings*
	 *
	 * - **Field Type**: Color
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.accent_color
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/color
	 */
	accent_color: prismic.ColorField;
	
	/**
	 * Fonts field in *Settings*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **Default Value**: Modern
	 * - **API ID Path**: settings.font_pair
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	font_pair: prismic.SelectField<"Modern" | "Classic" | "Friendly", "filled">;
	
	/**
	 * Main button label field in *Settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: e.g. Get a free quote
	 * - **API ID Path**: settings.cta_label
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	cta_label: prismic.KeyTextField;
	
	/**
	 * Main button link field in *Settings*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.cta_link
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	cta_link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * Licence / insurance note field in *Settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.license_note
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	license_note: prismic.KeyTextField;
}

/**
 * Settings document from Prismic
 *
 * - **API ID**: `settings`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type SettingsDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<SettingsDocumentData>, "settings", Lang>;

export type AllDocumentTypes = HomepageDocument | SettingsDocument;

/**
 * Primary content in *Hearth Call To Action → Default → Primary*
 */
export interface HearthCtaSliceDefaultPrimary {
	/**
	 * Heading field in *Hearth Call To Action → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hearth_cta.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Text field in *Hearth Call To Action → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hearth_cta.default.primary.text
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	text: prismic.RichTextField;
}

/**
 * Default variation for Hearth Call To Action Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type HearthCtaSliceDefault = prismic.SharedSliceVariation<"default", Simplify<HearthCtaSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Hearth Call To Action*
 */
type HearthCtaSliceVariation = HearthCtaSliceDefault

/**
 * Hearth Call To Action Shared Slice
 *
 * - **API ID**: `hearth_cta`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type HearthCtaSlice = prismic.SharedSlice<"hearth_cta", HearthCtaSliceVariation>;

/**
 * Primary content in *Hearth Hero → Default → Primary*
 */
export interface HearthHeroSliceDefaultPrimary {
	/**
	 * Rating badge field in *Hearth Hero → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: e.g. 4.9 from 120 Google reviews
	 * - **API ID Path**: hearth_hero.default.primary.rating_text
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	rating_text: prismic.KeyTextField;
	
	/**
	 * Headline field in *Hearth Hero → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hearth_hero.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Description field in *Hearth Hero → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hearth_hero.default.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Left photo field in *Hearth Hero → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hearth_hero.default.primary.image_one
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image_one: prismic.ImageField<never>;
	
	/**
	 * Left photo badge field in *Hearth Hero → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: e.g. 15+ years in business
	 * - **API ID Path**: hearth_hero.default.primary.chip_one
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	chip_one: prismic.KeyTextField;
	
	/**
	 * Right photo field in *Hearth Hero → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hearth_hero.default.primary.image_two
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image_two: prismic.ImageField<never>;
	
	/**
	 * Right photo badge field in *Hearth Hero → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: e.g. 1,200+ jobs done
	 * - **API ID Path**: hearth_hero.default.primary.chip_two
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	chip_two: prismic.KeyTextField;
}

/**
 * Default variation for Hearth Hero Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type HearthHeroSliceDefault = prismic.SharedSliceVariation<"default", Simplify<HearthHeroSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Hearth Hero*
 */
type HearthHeroSliceVariation = HearthHeroSliceDefault

/**
 * Hearth Hero Shared Slice
 *
 * - **API ID**: `hearth_hero`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type HearthHeroSlice = prismic.SharedSlice<"hearth_hero", HearthHeroSliceVariation>;

/**
 * Item in *Hearth How It Works → Default → Primary → Steps*
 */
export interface HearthHowItWorksSliceDefaultPrimaryStepsItem {
	/**
	 * Step title field in *Hearth How It Works → Default → Primary → Steps*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hearth_how_it_works.default.primary.steps[].title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Step text field in *Hearth How It Works → Default → Primary → Steps*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hearth_how_it_works.default.primary.steps[].text
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	text: prismic.RichTextField;
}

/**
 * Primary content in *Hearth How It Works → Default → Primary*
 */
export interface HearthHowItWorksSliceDefaultPrimary {
	/**
	 * Heading field in *Hearth How It Works → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hearth_how_it_works.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Steps field in *Hearth How It Works → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hearth_how_it_works.default.primary.steps[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	steps: prismic.GroupField<Simplify<HearthHowItWorksSliceDefaultPrimaryStepsItem>>;
}

/**
 * Default variation for Hearth How It Works Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type HearthHowItWorksSliceDefault = prismic.SharedSliceVariation<"default", Simplify<HearthHowItWorksSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Hearth How It Works*
 */
type HearthHowItWorksSliceVariation = HearthHowItWorksSliceDefault

/**
 * Hearth How It Works Shared Slice
 *
 * - **API ID**: `hearth_how_it_works`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type HearthHowItWorksSlice = prismic.SharedSlice<"hearth_how_it_works", HearthHowItWorksSliceVariation>;

/**
 * Item in *Hearth Reviews → Default → Primary → Reviews*
 */
export interface HearthReviewsSliceDefaultPrimaryReviewsItem {
	/**
	 * Review field in *Hearth Reviews → Default → Primary → Reviews*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hearth_reviews.default.primary.reviews[].quote
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	quote: prismic.RichTextField;
	
	/**
	 * Customer name field in *Hearth Reviews → Default → Primary → Reviews*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hearth_reviews.default.primary.reviews[].name
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	name: prismic.KeyTextField;
	
	/**
	 * Neighborhood or detail field in *Hearth Reviews → Default → Primary → Reviews*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hearth_reviews.default.primary.reviews[].detail
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	detail: prismic.KeyTextField;
	
	/**
	 * Stars field in *Hearth Reviews → Default → Primary → Reviews*
	 *
	 * - **Field Type**: Number
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hearth_reviews.default.primary.reviews[].rating
	 * - **Documentation**: https://prismic.io/docs/fields/number
	 */
	rating: prismic.NumberField;
}

/**
 * Primary content in *Hearth Reviews → Default → Primary*
 */
export interface HearthReviewsSliceDefaultPrimary {
	/**
	 * Eyebrow field in *Hearth Reviews → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hearth_reviews.default.primary.eyebrow
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	eyebrow: prismic.KeyTextField;
	
	/**
	 * Heading field in *Hearth Reviews → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hearth_reviews.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Reviews field in *Hearth Reviews → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hearth_reviews.default.primary.reviews[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	reviews: prismic.GroupField<Simplify<HearthReviewsSliceDefaultPrimaryReviewsItem>>;
}

/**
 * Default variation for Hearth Reviews Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type HearthReviewsSliceDefault = prismic.SharedSliceVariation<"default", Simplify<HearthReviewsSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Hearth Reviews*
 */
type HearthReviewsSliceVariation = HearthReviewsSliceDefault

/**
 * Hearth Reviews Shared Slice
 *
 * - **API ID**: `hearth_reviews`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type HearthReviewsSlice = prismic.SharedSlice<"hearth_reviews", HearthReviewsSliceVariation>;

/**
 * Item in *Hearth Service Area → Default → Primary → Areas*
 */
export interface HearthServiceAreaSliceDefaultPrimaryAreasItem {
	/**
	 * Area name field in *Hearth Service Area → Default → Primary → Areas*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hearth_service_area.default.primary.areas[].name
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	name: prismic.KeyTextField;
}

/**
 * Primary content in *Hearth Service Area → Default → Primary*
 */
export interface HearthServiceAreaSliceDefaultPrimary {
	/**
	 * Eyebrow field in *Hearth Service Area → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hearth_service_area.default.primary.eyebrow
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	eyebrow: prismic.KeyTextField;
	
	/**
	 * Heading field in *Hearth Service Area → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hearth_service_area.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * Text field in *Hearth Service Area → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hearth_service_area.default.primary.text
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	text: prismic.RichTextField;
	
	/**
	 * Map image field in *Hearth Service Area → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hearth_service_area.default.primary.map
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	map: prismic.ImageField<never>;
	
	/**
	 * Areas field in *Hearth Service Area → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hearth_service_area.default.primary.areas[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	areas: prismic.GroupField<Simplify<HearthServiceAreaSliceDefaultPrimaryAreasItem>>;
}

/**
 * Default variation for Hearth Service Area Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type HearthServiceAreaSliceDefault = prismic.SharedSliceVariation<"default", Simplify<HearthServiceAreaSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Hearth Service Area*
 */
type HearthServiceAreaSliceVariation = HearthServiceAreaSliceDefault

/**
 * Hearth Service Area Shared Slice
 *
 * - **API ID**: `hearth_service_area`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type HearthServiceAreaSlice = prismic.SharedSlice<"hearth_service_area", HearthServiceAreaSliceVariation>;

/**
 * Item in *Hearth Services → Default → Primary → Services*
 */
export interface HearthServicesSliceDefaultPrimaryServicesItem {
	/**
	 * Service name field in *Hearth Services → Default → Primary → Services*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hearth_services.default.primary.services[].name
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	name: prismic.RichTextField;
	
	/**
	 * Description field in *Hearth Services → Default → Primary → Services*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hearth_services.default.primary.services[].description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Link field in *Hearth Services → Default → Primary → Services*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hearth_services.default.primary.services[].link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Primary content in *Hearth Services → Default → Primary*
 */
export interface HearthServicesSliceDefaultPrimary {
	/**
	 * Eyebrow field in *Hearth Services → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hearth_services.default.primary.eyebrow
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	eyebrow: prismic.KeyTextField;
	
	/**
	 * Heading field in *Hearth Services → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hearth_services.default.primary.heading
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	heading: prismic.RichTextField;
	
	/**
	 * All services link field in *Hearth Services → Default → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hearth_services.default.primary.all_services
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	all_services: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * Services field in *Hearth Services → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hearth_services.default.primary.services[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	services: prismic.GroupField<Simplify<HearthServicesSliceDefaultPrimaryServicesItem>>;
}

/**
 * Default variation for Hearth Services Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type HearthServicesSliceDefault = prismic.SharedSliceVariation<"default", Simplify<HearthServicesSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Hearth Services*
 */
type HearthServicesSliceVariation = HearthServicesSliceDefault

/**
 * Hearth Services Shared Slice
 *
 * - **API ID**: `hearth_services`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type HearthServicesSlice = prismic.SharedSlice<"hearth_services", HearthServicesSliceVariation>;

/**
 * Item in *Hearth Trust Strip → Default → Primary → Trust points*
 */
export interface HearthTrustStripSliceDefaultPrimaryPointsItem {
	/**
	 * Icon field in *Hearth Trust Strip → Default → Primary → Trust points*
	 *
	 * - **Field Type**: Select
	 * - **Placeholder**: *None*
	 * - **Default Value**: check
	 * - **API ID Path**: hearth_trust_strip.default.primary.points[].icon
	 * - **Documentation**: https://prismic.io/docs/fields/select
	 */
	icon: prismic.SelectField<"shield" | "price" | "clock" | "check", "filled">;
	
	/**
	 * Label field in *Hearth Trust Strip → Default → Primary → Trust points*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hearth_trust_strip.default.primary.points[].label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	label: prismic.KeyTextField;
}

/**
 * Primary content in *Hearth Trust Strip → Default → Primary*
 */
export interface HearthTrustStripSliceDefaultPrimary {
	/**
	 * Trust points field in *Hearth Trust Strip → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hearth_trust_strip.default.primary.points[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	points: prismic.GroupField<Simplify<HearthTrustStripSliceDefaultPrimaryPointsItem>>;
}

/**
 * Default variation for Hearth Trust Strip Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type HearthTrustStripSliceDefault = prismic.SharedSliceVariation<"default", Simplify<HearthTrustStripSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Hearth Trust Strip*
 */
type HearthTrustStripSliceVariation = HearthTrustStripSliceDefault

/**
 * Hearth Trust Strip Shared Slice
 *
 * - **API ID**: `hearth_trust_strip`
 * - **Description**: *None*
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type HearthTrustStripSlice = prismic.SharedSlice<"hearth_trust_strip", HearthTrustStripSliceVariation>;

declare module "@prismicio/client" {
	interface CreateClient {
		(repositoryNameOrEndpoint: string, options?: prismic.ClientConfig): prismic.Client<AllDocumentTypes>;
	}
	
	interface CreateWriteClient {
		(repositoryNameOrEndpoint: string, options: prismic.WriteClientConfig): prismic.WriteClient<AllDocumentTypes>;
	}
	
	interface CreateMigration {
		(): prismic.Migration<AllDocumentTypes>;
	}
	
	namespace Content {
		export type {
			HomepageDocument,
			HomepageDocumentData,
			HomepageDocumentDataSlicesSlice,
			SettingsDocument,
			SettingsDocumentData,
			AllDocumentTypes,
			HearthCtaSlice,
			HearthCtaSliceDefaultPrimary,
			HearthCtaSliceVariation,
			HearthCtaSliceDefault,
			HearthHeroSlice,
			HearthHeroSliceDefaultPrimary,
			HearthHeroSliceVariation,
			HearthHeroSliceDefault,
			HearthHowItWorksSlice,
			HearthHowItWorksSliceDefaultPrimaryStepsItem,
			HearthHowItWorksSliceDefaultPrimary,
			HearthHowItWorksSliceVariation,
			HearthHowItWorksSliceDefault,
			HearthReviewsSlice,
			HearthReviewsSliceDefaultPrimaryReviewsItem,
			HearthReviewsSliceDefaultPrimary,
			HearthReviewsSliceVariation,
			HearthReviewsSliceDefault,
			HearthServiceAreaSlice,
			HearthServiceAreaSliceDefaultPrimaryAreasItem,
			HearthServiceAreaSliceDefaultPrimary,
			HearthServiceAreaSliceVariation,
			HearthServiceAreaSliceDefault,
			HearthServicesSlice,
			HearthServicesSliceDefaultPrimaryServicesItem,
			HearthServicesSliceDefaultPrimary,
			HearthServicesSliceVariation,
			HearthServicesSliceDefault,
			HearthTrustStripSlice,
			HearthTrustStripSliceDefaultPrimaryPointsItem,
			HearthTrustStripSliceDefaultPrimary,
			HearthTrustStripSliceVariation,
			HearthTrustStripSliceDefault
		}
	}
}