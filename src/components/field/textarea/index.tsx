import { Component,Prop } from 'vue-property-decorator'

import styles from '../field.css?module'

import { VueComponent } from '@/shims-vue'

type Size = 'm' | 'l' | 'xl'

interface Props {
	isDirty?: boolean
	readonly?: boolean
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

	@Prop() label!: Props['label']
	@Prop() placeholder!: Props['placeholder']
	@Prop() error!: Props['error']
	@Prop() value!: Props['value']

	@Prop({ default:'m' }) size!: Size

	get text(){
		return this.value
	}
	
	set text(val){
		console.log(val)
		this.$emit('input',val)
	}

	id = ''

	mounted(){
		this.id = `f${(~~(Math.random()*1e8)).toString(16)}`
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
					<textarea
						id={this.id}
						v-model={this.text}
						readOnly={this.readonly}
						class={[styles.textarea,styles.area]}
						placeholder={this.placeholder}
						onFocus={(e: Event)=>this.$emit('focus',e)}
						onBlur={(e: Event)=>this.$emit('blur',e)}
						onClick={(e: Event)=>this.$emit('click',e)}
						onMousedown={(e: Event)=>this.$emit('mousedown',e)}
					>
					</textarea>
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
