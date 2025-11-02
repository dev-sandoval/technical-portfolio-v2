import { Language } from '../languages';

export const notFoundTranslations = {
	[Language.ENGLISH]: {
		'not-found.title': '404 - Page not found | David Sandoval',
		'not-found.description': 'The page you are looking for does not exist or has been moved.',
		'not-found.heading': 'Page not found',
		'not-found.message':
			"Looks like you've gotten lost in the code. The page you're looking for doesn't exist or has been moved to another location.",
		'not-found.home-button': 'Go to home',
		'not-found.back-button': 'Go back',
		'not-found.quote': 'In an infinite multiverse, this page exists... just not in this one.',
	},
	[Language.SPANISH]: {
		'not-found.title': '404 - Página no encontrada | David Sandoval',
		'not-found.description': 'La página que buscas no existe o ha sido movida.',
		'not-found.heading': 'Página no encontrada',
		'not-found.message':
			'Parece que te has perdido en el código. La página que buscas no existe o ha sido movida a otra ubicación.',
		'not-found.home-button': 'Ir al inicio',
		'not-found.back-button': 'Volver atrás',
		'not-found.quote': 'En un multiverso infinito, esta página existe... solo que no en este.',
	},
} as const;
