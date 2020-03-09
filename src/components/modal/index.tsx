import { Component,Prop } from 'vue-property-decorator'

import { Popup } from '../popup'

import  styles  from './modal.css?module'

import { VueComponent,VNode } from '@/shims-vue'

export enum ModalWidth{
	s='s',
	m='m',
	l='l',
	fit='fit'
}
interface Props {
	title?: string

	size?: ModalWidth

	onClose: () => void
	scopedSlots?: {
		head?: () => VNode
		body?: () => VNode
		bottom?: () => VNode
	}
}

@Component
export class Modal extends VueComponent<Props> {

	@Prop() title!: Props['title']

	@Prop({ default:'s' })size!: ModalWidth
  
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
