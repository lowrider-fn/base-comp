import { Component } from 'vue-property-decorator'

import { VueComponent } from '@/shims-vue'

export const clickOutside={
	init(context: VueComponent,call: () => void){
		context.$el.addEventListener('mousedown',(e: Event)=> e.stopPropagation())
		document && document.addEventListener('mousedown', call)
	},
	destroy(call: () => void){
		document && document.removeEventListener('mousedown', call)
	},
}

interface Props {
	onClose?: () => void
}

@Component

export class Popup extends VueComponent<Props> {
	
	close(){
		this.$emit('close')
	}

	destroyed() {
		clickOutside.destroy(this.close)
	}

	mounted( ) {
		clickOutside.init(this,this.close)
	}

	render()  {
		return (
			<div>
				{this.$slots.default}
			</div>
		)
	}
}
