import { Component,Prop,Watch } from 'vue-property-decorator'

import styles from './field.css?module'
import { IMask,createMask } from './masks'

import { VueComponent } from '@/shims-vue'

export enum FieldSize {
	m='m' ,
	l='l',
	xl ='xl'
} 

export enum FieldTag {
	input = 'input',
	textarea = 'textarea',
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

	tag?: FieldTag
	size?: FieldSize
	iMask?: IMask.AnyMaskedOptions

	onInput?: (e: string) => void
	onFocus?: (e?: Event) => void
	onBlur?: (e?: Event) => void
	onClick?: (e?: Event) => void
	onMousedown?: (e?: Event) => void
}

@Component
export class Field extends VueComponent<Props> {

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

	@Prop({ default:FieldTag.input }) tag!: FieldTag
	@Prop({ default: FieldSize.l }) size!: FieldSize
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
		return this.size === FieldSize.xl
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
							{ [styles.xlFocused]:this.isXl && (this.isFocused || this.maskedValue(this.value)  && !this.isFocused) },
						]}
						// eslint-disable-next-line react/no-unknown-property
						for={this.id}
					>
						{this.label}
					</label>
				)}
				<div class={styles.fieldBox} onMousedown={(e: Event)=>this.$emit('mousedown',e)}>
					{
						this.$createElement(this.tag, {
							ref: 'input',
							class:[styles.input,
								styles.area,
								styles[this.tag],
								{ [styles.disabled]:this.disabled },
							],
							on: {
								input:(e: any)=>this.setInput(e.target.value as string),
								focus:(e: Event)=>this.focusHandler(e),
								blur:(e: Event)=> this.blurHandler(e),
								click:(e: Event)=>this.$emit('click',e),
							},
							attrs: {
							
								id:this.id,
								type:this.type,
								placeholder: this.placeholder,
								readonly:this.readonly,
							},
						})
					}
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
