import { Component } from 'vue-property-decorator'

import { VueComponent } from  '@/shims-vue'

interface Props {
	onClick?: () => void
}

@Component
export class IconArrow extends VueComponent<Props>  {

	render()  {
		return (
			<svg
				width="8" height="6"
				viewBox="0 0 10 6" fill="none"
				xmlns="http://www.w3.org/2000/svg"
				onClick={()=>this.$emit('click')}
			>
				<path d="M8.80013 1.60016L5.8001 5.60016C5.40011 6.13347 4.60014 6.13349 4.20013 5.60018L1.19988 1.60018C0.705419 0.940952 1.1758 0.000152588 1.99986 0.000152588L8.00014 0.000152588C8.82419 0.000152588 9.29457 0.940921 8.80013 1.60016Z" fill="#001A34"/>
			</svg>

		)
	}
}
