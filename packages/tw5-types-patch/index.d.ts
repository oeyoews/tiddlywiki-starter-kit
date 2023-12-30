import { ITiddlyWiki } from "tw5-typed";

export interface TiddlyWiki extends ITiddlyWiki {
	Notify: {
		name: string
	}
}


declare global {
	export const $tw: TiddlyWiki;
}