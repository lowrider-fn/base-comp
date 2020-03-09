import { Component,Prop } from 'vue-property-decorator'

import styles from '../field.css?module'

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

	label?: string
	placeholder?: string
	error?: string
	value: string | number
	
	size?: Size

	onInput?: (e: string) => void
	onFocus?: (e?: Event) => void
	onBlur?: (e?: Event) => void
	onClick?: (e?: Event) => void
	onMousedown?: (e?: Event) => void
}

@Component
export class Textarea extends VueComponent<Props> {

	@Prop({ default:false }) isDirty!: boolean
	@Prop({ default:false }) readonly!: boolean
	@Prop({ default:false }) disabled!: boolean

	@Prop() label!: Props['label']
	@Prop() placeholder!: Props['placeholder']
	@Prop() error!: Props['error']
	@Prop() value!: Props['value']

	@Prop({ default:'m' }) size!: Size

	id = `f${(~~(Math.random()*1e8)).toString(16)}`
	dirty=true
	isFocused = false

	get text(){
		return this.value
	}
	
	set text(val){
		this.$emit('input',val)
	}

	get isErr(){
		return this.error && this.dirty
	}

	get isXl(){
		return this.size === Size['xl']
	}

	setDirty(val: boolean){
		this.dirty = val
	}

	focusHandler(e?: Event){
		this.isFocused = true
		this.setDirty(true)
		this.$emit('focus',e)
	}

	blurHandler(e?: Event){
		this.isFocused = false
		this.$emit('blur',e)
	}

	mounted(){
		this.setDirty(this.isDirty)
	}

	render() {
		return (
			<div
				class={[styles.field,
					styles[this.size],
					{ [styles.fieldErr]:this.isErr },
				]}
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
					<textarea
						id={this.id}
						v-model={this.text}
						readOnly={this.readonly}
						class={[styles.textarea,
							styles.area,
							{ [styles.disabled]:this.disabled },
						]}
						placeholder={this.placeholder}
						onFocus={(e: Event)=>this.focusHandler(e)}
						onBlur={(e: Event)=>this.blurHandler(e)}
						onClick={(e: Event)=>this.$emit('click',e)}
						onMousedown={(e: Event)=>this.$emit('mousedown',e)}
					>
					</textarea>
					{this.$slots.default}	
				</div>
				{this.isErr && this.dirty && (
					<div class={styles.error}>
						{this.error}
					</div>
				)}
			</div>
			
		)
	}
}
