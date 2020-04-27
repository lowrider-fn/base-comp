import Vue from 'vue'

type CSSClass = (string | {
	[key: string]: string | boolean
})

type VModel<T> = T extends {value: any} ? T | {vModel: any} : T

export class VueComponent<P = {}> extends Vue {
	// @ts-ignore
	public $props: VModel<P> & {
		key?: string | number
		class?: CSSClass | CSSClass[]
		click?: (e: Event) => void
	}
}
export { VNode } from 'vue'
