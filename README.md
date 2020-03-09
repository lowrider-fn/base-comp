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
```ts
type Width = 's' | 'm' | 'l' | 'fit'

interface Props {
	isShow: boolean
	title?: string
	size?: Width
	onClose: () => void
	scopedSlots?: {
		head?: () => VNode
		body?: () => VNode
		bottom?: () => VNode
	}
}
```

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
```ts
enum Size {
	m = 'm' 
	l = 'l' 
	xl = 'xl'
}

interface Option{
	id: number|string
	value: string
}

interface Props {
	disabled?: boolean
	size?: string
	options: Array<Option>
	error?: string
	selected: number|string
	placeholder?: string
	label?: string
	onChange?: (e: number|string) => void
	onClose?: () => void
}
```

```tsx
import { Component, Vue } from 'vue-property-decorator'
import { Select, styles, Option,FieldSize } from '@/components/select'

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
				size={FieldSize.xl}
				options={this.options}
				selected={this.selected}
				placeholder={'Выберите'}
				label={'Select'}
				error={this.errorSelect}
			>
			//$slots.default
      		</Select> 
		)
	}
}
```

#### Field

```ts
enum FieldSize {
	m = 'm' 
	l = 'l' 
	xl = 'xl'
}

enum FieldTag {
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
```

```tsx
import { Component, Vue } from 'vue-property-decorator'
import { Field, datePeriod, time, date,number,FieldSize,FieldTag  } from '@/components/field'

@Component
export default class App extends Vue {

	val=''

	get errorInput (){
		return !this.val.trim() ? '':'Ошибка'
	}

	render() {
		return (
			<Field
				tag={FieldTag.textarea}
				size={FieldSize.xl}
				value={this.val}
				error={this.errorInput}
				v-model={this.val}
				label={'Input даты со слотом'}
				placeholder={'Текст'}
				iMask={date}
			>
				//slots?.default
			</Field>
		)
	}
}
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
