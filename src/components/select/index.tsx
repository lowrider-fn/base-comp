import { Component, Prop,Watch } from 'vue-property-decorator'

import { Popup } from '../popup'
import { Field,FieldSize } from '../field'

import { IconArrow } from './icon-arrow'
import styles from './select.css?module'

export{ styles ,FieldSize }
import { VueComponent } from '@/shims-vue'

export interface Option{
	id: number|string
	value: string
}

interface Props {
	disabled?: boolean
	
	size?: FieldSize
	options: Array<Option>

	error?: string
	selected: number|string
	placeholder?: string
	label?: string

	onChange?: (e: number|string) => void
	onClose?: () => void
}

@Component
export class Select extends VueComponent<Props> {
	
	@Prop({ default:false }) disabled!: boolean

	@Prop() label!: Props['label']
	@Prop() placeholder!: Props['placeholder']
	@Prop() options!: Props['options']
	@Prop() selected!: Props['selected']
	@Prop() error!: Props['error']

	@Prop({ default:FieldSize.l }) size!: FieldSize
  
	isShow=false
	search=''

	get filteredOptions(){
		return this.options.filter((option: Option) => option.value.toLowerCase().includes(this.search.toLowerCase()))
	}

	get foundSearchInOption(){
		return this.options.find((option: Option) => option.value.toLowerCase() === this.search.toLowerCase())
	}
	
	get getOptions(){
		return this.foundSearchInOption ? 'options' : 'filteredOptions'
	}

	get isReadonly(){
		return !(this.isShow && this.options.length <25)
	}

	@Watch('search') onSearchChange(val: string){
		if(this.foundSearchInOption){
			this.change(this.foundSearchInOption.id)
		}
		if(!val){
			this.change('')
		}
	}
	
	mounted(){
		this.search = this.findForId(this.selected)
	}

	findForId(id: number | string ){
		return this.options.find((option: Option) => option.id === id)?.value || ''
	}

	toggleIsShow(e?: Event){
		e?.stopPropagation()
		this.isShow = !this.isShow
		if(!this.isShow && !this.foundSearchInOption ){
			this.search = this.findForId(this.selected)
		}
	}
	
	change(id: Option['id']){
		if(id){
			this.search = this.findForId(id)
			this.isShow && this.toggleIsShow()
		}

		this.$emit('change',id)
		this.$emit('input',id)
	}

	render() {
		return(
			<div class={[styles.select,styles[this.size]] }>
				<Field
					size={this.size}
					disabled={this.disabled}
					error={this.error}
					value={this.search}
					v-model={this.search}
					label={this.label}
					placeholder={this.placeholder}
					onMousedown={this.toggleIsShow}
					readonly={this.isReadonly}
				>
					<IconArrow class={[styles.iconArrow,{ [styles.open]:this.isShow } ]}/>
				</Field>
				{
					this.isShow && (
						<Popup
							class={styles.dropdown} 
							onClose={this.toggleIsShow}
						>
							{
								this.$slots.default ||
								this[this.getOptions].map((option: Option)=>(
									<div
										class={[
											styles.option,
											{ [styles.active]:this.selected === option.id },
										]}
										key={option.id}
										onClick={()=>this.change(option.id)}
									>
										{option.value}
									</div>
								))
							}
						
							{
								this.filteredOptions.length === 0 && (
									<div class={styles.option}>Ничего не найденно</div>
								)
							}
						</Popup>
					)
				}
			</div>
			
		)
	}
}