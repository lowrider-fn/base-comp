import Vue from 'vue'

type CSSClass = (string | {
	[key: string]: string | boolean
})

export class VueComponent<Props = {}> extends Vue {
	// @ts-ignore
	public $props: Props & {
		key?: string
		class?: CSSClass | CSSClass[]
	}
}
export { VNode } from 'vue'