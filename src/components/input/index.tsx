import { Component,Prop,Watch } from 'vue-property-decorator'

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
	$refs!: {
		input: HTMLInputElement
	}

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

	maskedValue(value: string ) {
		if (this.masker) {
			return this.masker.resolve(value)
		}
		return value
	}

	setInput(val: string | number){
		const value = this.maskedValue(String(val).trim()) || ''
		this.$refs.input.value = value 
		console.log(value)
		
		this.$emit('input',value)
	}

	mounted(){
		this.setInput(this.value)
	}

	@Watch('value')
	onValueChange(val: string){
		this.$refs.input.value = val
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
						ref='input'
						readOnly={this.readonly}
						class={[styles.input,
							{ [styles.inputErrot]:this.error }]}
						type='text'
						placeholder={this.placeholder}
						onInput={(e: any)=>this.setInput(e.target.value as string)}
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
