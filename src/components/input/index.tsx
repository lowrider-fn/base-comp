import { Component,Prop } from 'vue-property-decorator'

import styles from './input.css?module'
import { datePeriod,date,time,IMask,createMask } from './masks'

export { datePeriod,date,time }
import { VueComponent,VNode } from '@/shims-vue'

type Size = 'm' | 'l' 

interface Props {
	label?: string
	size?: Size
	value: string | number
	placeholder?: string
	error?: string
	readonly?: boolean
	iMask?: IMask.AnyMaskedOptions
	onInput?: (e: string) => void
	onFocus?: (e?: Event) => void
	onBlur?: (e?: Event) => void
	onClick?: (e?: Event) => void
	onMousedown?: (e?: Event) => void
}

@Component
export class Input extends VueComponent<Props> {
	@Prop() placeholder!: Props['placeholder']
	@Prop() value!: Props['value']
	@Prop({ default:'m' }) size!: Size
	@Prop() label!: Props['label']
	@Prop() error!: Props['error']
	@Prop() iMask!: Props['iMask']
	@Prop({ default:false }) readonly!: Props['readonly']

	get masker() {
		return this.iMask ?  createMask(this.iMask) : null
	}

	get inputVal(){
		return this.masker?.resolve(String(this.value)) || this.value 
	}

	set inputVal(val){
		this.$emit('input',this.masker?.resolve(String(val)) || val )
	}

	render() {
		return (
			<div
				class={[styles.box,
					styles[this.size]]}
			>
				{this.label &&(
					<label class={[styles.label]}>
						{this.label}
					</label>
				)}
				<div class={styles.inputBox}>
					<input
						v-model={this.inputVal}
						value={this.inputVal}
						readOnly={this.readonly}
						class={[styles.input,
							{ [styles.inputErrot]:this.error }]}
						type='text'
						placeholder={this.placeholder}
						onInput={(e: any)=>this.$emit('input',e.target.value)}
						onFocus={(e: Event)=>this.$emit('focus',e)}
						onBlur={(e: Event)=>this.$emit('blur',e)}
						onClick={(e: Event)=>this.$emit('click',e)}
						onMousedown={(e: Event)=>this.$emit('mousedown',e)}
					/>	
					{this.$slots.default}	
				</div>
				{this.error && (
					<div class={styles.error}>
						{this.error}
					</div>
				)}
			</div>
			
		)
	}
}
