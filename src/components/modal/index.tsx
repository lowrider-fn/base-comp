import { Component,Prop } from 'vue-property-decorator'

import { Popup } from '../popup'

import  styles  from './modal.css?module'

import { VueComponent,VNode } from '@/shims-vue'

type PopupWidth = 's' | 'm' | 'l' | 'fitContent'

interface Props {
	isShow: boolean
	title?: string
	size?: PopupWidth
	onClose: () => void
	scopedSlots?: {
		head?: () => VNode
		body?: () => VNode
		bottom?: () => VNode
	}
}

@Component
export class Modal extends VueComponent<Props> {
	@Prop() isShow!: Props['isShow']
	@Prop() title!: Props['title']
	@Prop({ default:'s' })size!: PopupWidth
  
	close(){
		this.$emit('close')
	}

	render() {
		return (
			<div class={styles.overlay}>
				<Popup
					class={[styles.modal, styles[this.size]]}
					onClose={this.close}
				>
					<button
						class={styles.close}
						onClick={()=>this.close()} 
						type="button"
					>
							+
					</button>
					<div class={styles.top}>
						{ 
							this.$scopedSlots.head?.({}) ||  (this.title && ( 
								<h2 class={styles.title}>
									{this.title}
								</h2>
							))
						}
					</div>
					<div class={styles.body}>
						{this.$scopedSlots.body?.({})}
					</div>
								
					<div class={styles.bottom}>
						{this.$scopedSlots.bottom?.({})}
					</div>			
				</Popup>
			</div>
		)
	}

}
