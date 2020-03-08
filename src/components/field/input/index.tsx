import { Component,Prop,Watch } from 'vue-property-decorator'

import styles from '../field.css?module'

import { datePeriod,date,time,IMask,createMask } from './masks'

export { datePeriod,date,time }
import { VueComponent } from '@/shims-vue'

type Size = 'm' | 'l' | 'xl'

interface Props {
	isDirty?: boolean
	readonly?: boolean
	type?: string
	label?: string
	placeholder?: string
	error?: string
	value: string | number
	
	size?: Size
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

	@Prop({ default:false }) isDirty!: boolean
	@Prop({ default:false }) readonly!: boolean

	@Prop({ default:'text' }) type!: string
	@Prop() label!: Props['label']
	@Prop() placeholder!: Props['placeholder']
	@Prop() error!: Props['error']
	@Prop() value!: Props['value']

	@Prop({ default:'m' }) size!: Size
	@Prop() iMask!: Props['iMask']

	id = ''
	
	get masker() {
		return this.iMask ?  createMask(this.iMask) : null
	}

	mounted(){
		this.id = `f${(~~(Math.random()*1e8)).toString(16)}`
		this.setInput(this.value)
	}

	setInput(val: string | number){
		const value = this.maskedValue(val) || ''
		this.$refs.input.value = value 
		this.$emit('input',value)
	}

	maskedValue(val: string | number) {
		if (this.masker) {
			return this.masker.resolve(String(val).trim())
		}
		return String(val)
	}

	@Watch('value')
	onValueChange(val: string){
		this.setInput(val)
	}

	render() {
		return (
			<div
				class={[styles.field,
					styles[this.size],
					{ [styles.fieldErr]:!!this.error },
				]}
			>
				{this.label &&(
					<label
						class={[styles.label]}
						// eslint-disable-next-line react/no-unknown-property
						for={this.id}
					>
						{this.label}
					</label>
				)}
				<div class={styles.fieldBox}>
					<input
						id={this.id}
						ref='input'
						readOnly={this.readonly}
						class={[styles.input,styles.area]}
						type={this.type}
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
