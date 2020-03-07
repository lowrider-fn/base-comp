# Base comp. [Demo](https://lowrider-fn.github.io/base-comp/)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```
### Как использовать

#### Modal
```tsx
import { Component, Vue } from 'vue-property-decorator'
import { Modal } from '@/components/modal'

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

	render() {
		return (
			this.isShow && (
				<Modal
					title={'Заголовок или scopedSlots.head?.({})'}
					isShow={this.isShow}
					onClose={this.toggleIsShow}
					scopedSlots={{
						body: () => this.body(),
						bottom: () => this.bottom(),
					}}
				>
				</Modal>
			)
		)
	}
}
```

#### Select
```tsx
import { Component, Vue } from 'vue-property-decorator'
import { Select, styles, Option } from '@/components/select'

@Component
export default class App extends Vue {
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

	render() {
		return (
			<Select
				v-model={this.selected}
				options={this.options}
				selected={this.selected}
				placeholder={'Выберите'}
				label={'Селект'}
				error={this.errorSelect}
			/>
      //если нужна кастомизация options просто используйте 
      //slot default <Select> кастомные options</Select>
      //и импортируйте styles для optins
      //import { styles } from '@/components/select'
		)
	}
}
```

#### Input
```tsx
import { Component, Vue } from 'vue-property-decorator'
import { Input, datePeriod, time, date  } from '@/components/input'

@Component
export default class App extends Vue {

	val=''

	get errorInput (){
		return this.val ? '':'Ошибка'
	}

	render() {
		return (
			<Input
				value={this.val}
				error={this.errorInput}
				v-model={this.val}
				label={'Инпут'}
				placeholder={'Текст'}
				iMask={date}
			>
			//slot default для кастомизации иконку разместить например
			</Input>
		)
	}
}
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
