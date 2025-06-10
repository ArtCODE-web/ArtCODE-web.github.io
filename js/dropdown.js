window.dropdownInit = class dropdownInit {
    constructor(item, opt = {}) {        
        this.element = typeof item === 'string' ? document.querySelector(item) : item ;
        this.elementBtn = this.element.querySelector('[data-role="button"]');
        this.elementBody = this.element.querySelector('[data-role="dropdown"]');
        this.topPos = null;
        this.leftPos = null;
        this.transformY = 0;
        this.transformX = 0;
        this.isOpen = false;
        this.events = {};
        this.options = {
            position: 'top-start',
            autoPositions: true,
            insideoverflow: true,
            corectionx: true,
            mobileGutters: 15,            
            container: 'body',
            ...opt,
            ...this.element.dataset
        };
        this.#listeners()
    }
    #listeners() {
        this.elementBtn.addEventListener('click', this.dropdownHandler.bind(this))
        document.addEventListener('click', this.clickOutside.bind(this))
        window.addEventListener('resize', this.renderPosition.bind(this))
        document.addEventListener('scroll', this.dropdownClose.bind(this))
    }
    // getters
    get ElementReact() {
        return this.element.getBoundingClientRect()
    }
    get DropdownReact() {
        return this.elementBody.getBoundingClientRect()
    }
    on(type, callback) {
        if (this.events[type]) {
            this.events[type].push(callback)
        } else {
            this.events[type] = [callback]
        }
    }
    renderPosition() {
        if (!this.isOpen) return
        const windowHeight = window.innerHeight 
        const windowWidth = window.innerWidth        
        let syle = getComputedStyle(this.elementBody, null)
        let guttersY = parseFloat(syle.getPropertyValue('margin-top')) || 0
        let widthDrop = this.DropdownReact.width > (windowWidth - (this.options.mobileGutters * 2)) ? windowWidth - (this.options.mobileGutters * 2)  :   this.DropdownReact.width 
        if (this.options.insideoverflow != 'false') {
            this.topPos = this.ElementReact.top + this.elementBtn.clientHeight
            this.leftPos = this.ElementReact.left 
            if (this.options.position === 'top-end') {
                // this.transformX = `-${this.DropdownReact.width - this.elementBtn.clientWidth}px` 
                this.leftPos =  this.ElementReact.right - widthDrop;            
            }
            if (this.options.position === 'bottom-start') {
                this.transformY = `-${this.DropdownReact.height + this.elementBtn.clientHeight + (guttersY * 2)}px`
            }
            if (this.options.position === 'bottom-end') {                
                // this.transformX = `-${this.DropdownReact.width - this.elementBtn.clientWidth}px`
                this.leftPos =  this.ElementReact.right - widthDrop;
                this.transformY = `-${this.DropdownReact.height + this.elementBtn.clientHeight + (guttersY * 2)}px`
            }
        }
        if (this.options.autoPositions) {
            if (windowHeight - this.ElementReact.bottom - guttersY < this.DropdownReact.height && this.ElementReact.top > this.DropdownReact.height) {
                this.transformY = `-${this.DropdownReact.height + this.elementBtn.clientHeight + (guttersY * 2)}px`
            } else if(windowHeight - this.ElementReact.bottom - guttersY < this.DropdownReact.height && this.ElementReact.top < this.DropdownReact.height){
                this.transformY = 0;
                this.topPos = this.DropdownReact.height > windowHeight ? guttersY :  windowHeight - this.DropdownReact.height - (guttersY * 2)
                console.log(windowHeight , this.DropdownReact.height) 
            } else {
                this.transformY = 0;
            }
        }
        if(this.options.corectionx != "false" ) {
            if (this.ElementReact.left + this.ElementReact.width - this.options.mobileGutters < widthDrop 
                && (this.options.position === 'bottom-end' ||  this.options.position === 'top-end')) {
                this.leftPos = this.options.mobileGutters
            }           
            if (windowWidth - (this.ElementReact.left + this.options.mobileGutters) < widthDrop && (this.options.position === 'top-start' || this.options.position === 'bottom-start')) {                
                this.leftPos = windowWidth - widthDrop - this.options.mobileGutters                
            }
        }
        this.applyStyles(this.elementBody, {
            top: this.topPos + 'px',
            left: this.leftPos + 'px',
            transform: `translate(${this.transformX}, ${this.transformY})`,
            width: widthDrop + 'px',
            maxWidth: windowWidth - this.options.mobileGutters * 2 + 'px',
            maxHeight: windowHeight - this.options.mobileGutters * 2 + 'px'
        })
    }
    removeDropdouwnEl() {
        this.elementBody.remove();
    }
    pushInsideBody() {
        document.querySelector(this.options.container).append(this.elementBody)
    }
    pushInsadeEl() {
        this.element.append(this.elementBody)
    }
    dropdownHandler(e) {
        e.preventDefault()
        this.toggle()
    }
    toggle() {
        return this.isOpen ? this.dropdownClose() : this.open();
    }
    open() {
        this.isOpen = true
        if (this.events.open && this.events.open.length) this.events.open.forEach(item => item(this.isOpen))
        this.elementBody.classList.add('is-open');
        this.element.classList.add('dropdown-open')
        this.renderPosition()
        if (this.options.insideoverflow != 'false') {
            this.removeDropdouwnEl()
            this.pushInsideBody()
        }
    }
    dropdownClose() {
        this.isOpen = false
        if (this.events.close && this.events.close.length) this.events.close.forEach(item => item(this.isOpen))
        this.element.classList.remove('dropdown-open');
        this.elementBody.classList.remove('is-open');
        this.elementBody.removeAttribute('style')
        if (this.options.insideoverflow != 'false') {
            this.removeDropdouwnEl()
            this.pushInsadeEl()
        }
    }
    applyStyles(element, style) {
        Object.assign(element.style, style)
    }
    clickOutside({ target }) {
        if (target.closest('[data-dropdown="dropdown"]') != this.element 
        && this.isOpen && target.closest('[data-role="dropdown"]') != this.elementBody) {
            this.dropdownClose()
        }
    }
    destroy() {
        this.elementBtn.removeEventListener('click', this.dropdownHandler)
        document.removeEventListener('click', this.clickOutside)
        window.removeEventListener('resize', this.renderPosition)
        document.removeEventListener('scroll', this.dropdownClose)
    }
}