/* eslint-disable @typescript-eslint/no-empty-function */

const clickOutside={
	call:()=>{},
	init(el: Element,call: () => void){
		this.call = call
		el.addEventListener('mousedown',(e: Event)=> e.stopPropagation())
		document && document.addEventListener('mousedown', call)
	},
	destroy(){
		document && document.removeEventListener('mousedown', this.call)
	},
}

export default clickOutside