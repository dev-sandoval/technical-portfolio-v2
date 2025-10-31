/**
 * Badge item representing a certification or achievement
 */
export interface BadgeItem {
	/** Badge display label/title */
	label: string;
	/** Badge image URL or path */
	image: string;
	/** Optional link to credential verification */
	link?: string;
}

/**
 * Badges organized by language
 */
export type BadgesByLanguage = Record<string, BadgeItem[]>;

/**
 * Supported languages for badges
 */
export type BadgeLanguage = 'es' | 'en';
