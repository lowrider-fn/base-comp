import { Component,Prop,Watch } from 'vue-property-decorator'

import styles from '../field.css?module'

import { datePeriod,date,time,IMask,createMask } from './masks'

export { datePeriod,date,time }
import { VueComponent } from '@/shims-vue'

export enum Size {
	m='m' ,
	l='l',
	xl ='xl'
} 

interface Props {
	isDirty?: boolean
	readonly?: boolean
	disabled?: boolean

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
	@Prop({ default:false }) disabled!: boolean

	@Prop({ default:'text' }) type!: string
	@Prop() label!: Props['label']
	@Prop() placeholder!: Props['placeholder']
	@Prop() error!: Props['error']
	@Prop() value!: Props['value']

	@Prop({ default:Size.xl }) size!: Size
	@Prop() iMask!: Props['iMask']

	id = `f${(~~(Math.random()*1e8)).toString(16)}`
	dirty = false
	isFocused = false

	get masker() {
		return this.iMask ?  createMask(this.iMask) : null
	}
	
	get isErr(){
		return this.error && this.dirty
	}
	
	get isXl(){
		return this.size === Size.xl
	}

	mounted(){
		this.setDirty(this.isDirty)
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

	setDirty(val: boolean){
		this.dirty = val
	}
	
	focusHandler(e?: Event){
		this.setDirty(true)
		this.isFocused = true
		this.$emit('focus',e)
	}

	blurHandler(e?: Event){
		this.isFocused = false
		this.$emit('blur',e)
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
					{ [styles.fieldErr]:this.isErr }]}
			>
				{this.label && (
					<label
						class={[styles.label,
							{ [styles.xlFocused]:this.isXl && this.isFocused },
						]}
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
						class={[styles.input,
							styles.area,
							{ [styles.disabled]:this.disabled },
						]}
						type={this.type}
						placeholder={this.placeholder}
						onInput={(e: any)=>this.setInput(e.target.value as string)}
						onFocus={(e: Event)=>this.focusHandler(e)}
						onBlur={(e: Event)=> this.blurHandler(e)}
						onClick={(e: Event)=>this.$emit('click',e)}
						onMousedown={(e: Event)=>this.$emit('mousedown',e)}
					/>	
					{this.$slots.default}	
				</div>
				{this.isErr && (
					<div class={styles.error}>
						{this.error}
					</div>
				)}
			</div>
			
		)
	}
}
