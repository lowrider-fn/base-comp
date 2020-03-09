import { Component } from 'vue-property-decorator'

import { VueComponent } from '@/shims-vue'
import clickOutside  from '@/components/click-outside'

interface Props {
	onClose?: () => void
}

@Component

export class Popup extends VueComponent<Props> {
	
	close(){
		this.$emit('close')
	}

	destroyed() {
		clickOutside.destroy()
	}

	mounted( ) {
		clickOutside.init(this.$el,this.close)
	}

	render()  {
		return (
			<div>
				{this.$slots.default}
			</div>
		)
	}
}
