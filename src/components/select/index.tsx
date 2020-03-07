import { Component, Prop } from 'vue-property-decorator'

import { Popup } from '../popup'
import { Input } from '../input'

import styles from './select.css?module'

import { VueComponent } from '@/shims-vue'

type Size = 'm' | 'l' 

export interface Option{
	id: number|string
	value: string
}

interface Props {
	size?: string
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

	@Prop() label!: Props['label']
	@Prop() placeholder!: Props['placeholder']
	@Prop() options!: Props['options']
	@Prop() selected!: Props['selected']
	@Prop({ default:'m' }) size!: Size
	@Prop() error!: Props['error']
  
	isShow=false
	search=''

	toggleIsShow(e?: Event){
		e?.stopPropagation()
		this.isShow = !this.isShow
		if(!this.isShow ){
			const findEqualValue = this.options.find((el: Option) => el.value === this.search)
			this.search = findEqualValue?.value || ''
		}
	}
	get getOptions(){
		return this.hasOptionSearch ? 'options' : 'filteredOptions'
	}

	get hasOptionSearch(){
		return this.options.find((option: Option) => option.value.toLowerCase() === this.search.toLowerCase())
	}
	get hasOptionIs(){
		return this.options.find((option: Option) => option.id === this.search.toLowerCase())
	}
	get filteredOptions(){
		return this.options.filter((option: Option) => option.value.toLowerCase().includes(this.search.toLowerCase()))
	}

	get inputVal(): string{
		return this.options.find((option: Option) => option.id === this.selected)?.value || this.search 
	}

	set inputVal(val: string){
		this.search = val
		if(this.hasOptionSearch){
			this.$emit('input',this.hasOptionSearch.id)
			this.$emit('change',this.hasOptionSearch.id)
		}
		else{
			this.$emit('input','')
			this.$emit('change','')
		}
	}

	get isReadonly(){
		return this.options.length < 2 || !this.isShow
	}

	change(id: Option['id']){
		this.search = this.options.find((opt: Option) => opt.id === id)?.value || ''
		this.$emit('change',id)
		this.$emit('input',id)
		this.toggleIsShow()
	}
	
	render() {
		return(
			<div class={[styles.select,styles[this.size]] }>
				<Input
					error={this.error}
					value={this.inputVal}
					v-model={this.inputVal}
					label={this.label}
					placeholder={this.placeholder}
					onMousedown={this.toggleIsShow}
					readonly={ this.isReadonly}
				>
					<span class={[styles.iconArrow,{ [styles.open]:this.isShow }]}>
						{'>'}
					</span>
				</Input>
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