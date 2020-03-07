// import Select from '@/components/modal';
import { Component, Vue } from 'vue-property-decorator'

import styles from './app.css?module'

import { Modal } from '@/components/modal'
import { Select,Option } from '@/components/select'
import { Input,datePeriod,time, date  } from '@/components/input'
@Component
export default class App extends Vue {

	isShow = false

	toggleIsShow(){
		this.isShow = !this.isShow
	}

	body(){
		return (
			<div>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, 
				at vel vero quibusdam ad fuga non quaerat totam sed veritatis, 
				ipsa libero maxime amet accusantium, voluptatibus dolor nihil. 
				Ea, hic.
			</div>
		)
	}

	bottom(){
		return(
			<div class={styles.btns}>
				<button
					class={styles.btn} 
					type='button'
					onClick={()=>this.toggleIsShow()}
				>
				принять
				</button>
				<button
					type='button'
					class={[styles.btn,styles.red]}
					onClick={()=>this.toggleIsShow()}
				>
				отказаться
				</button>
			</div>
		)
	}

	options: Array<Option>=[
		{ value: 'Florida', id: 'FL' },
		{ value: 'Georgia', id: 'GA' },
		{ value: 'Nebraska', id: 'NE' },
		{ value: 'California', id: 'CA' },
		{ value: 'New York', id: 'NY' },
	]

	selected: number|string =''

	get errorSelect (){
		return this.selected ? '':'Ошибка'
	}

	val='vcxvxcvcx'

	get errorInput (){
		return this.val ? '':'Ошибка'
	}
	render() {
		return (
			<section class={['app',styles.app]}>
				<div class={styles.appInner}>
					<div class={styles.appBox}>

						<button
							type='button' 
							class={styles.btn}
							onClick={this.toggleIsShow}
						>
						показать
						</button>

						{this.isShow && (
							<Modal
								title={'Заголовок или scopedSlots.head?({})'}
								isShow={this.isShow}
								onClose={this.toggleIsShow}
								scopedSlots={{
									body: () => this.body(),
									bottom: () => this.bottom(),
								}}
							>
							</Modal>
						)}

					</div>
					<div class={styles.appBox}>
						<p>
							{this.selected}
						</p>
						<Select
							v-model={this.selected}
							options={this.options}
							selected={this.selected}
							placeholder={'Выберите'}
							label={'Селект'}
							error={this.errorSelect}
						/>
					</div>
					<div class={styles.appBox}>
						<p>
							{this.val}
						</p>
						<Input
							value={this.val}
							error={this.errorInput}
							v-model={this.val}
							label={'Инпут'}
							placeholder={'Текст'}
							iMask={date}
						>
							<span class={styles.icon}>
							x
							</span>
						</Input>
					</div>
				</div>
			</section>
		)
	}
}
