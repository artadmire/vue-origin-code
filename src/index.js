
    class Vue {
        constructor(options) {
            // 获取到根元素
            this.el = document.querySelector(options.el) // #root
            // 获取到数据
            this.data = options.data
            // 收集数据和订阅者，每一个数据都有很多个订阅者 myText: [订阅者1, 订阅者2, 订阅者3]
            this._derective = {}
            // 调用函数
            this.Observer(this.data)
            this.Compile(this.el)
        }
        // 负责劫持数据
        Observer(data) {
            console.log(data)
            for(let key in data) {
                this._derective[key] = []
                let value = data[key]
                const watch = this._derective[key]
                Object.defineProperty(data, key, {
                    get: () => value,
                    set: (newValue) => {
                        if(newValue !== value) {
                            value = newValue
                            watch.forEach(watcher => {
                                // watcher是订阅实例
                                watcher.update()
                            })
                        }
                    }
                }) 
            }
            // 劫持数据 更新实图
            
        }
        // 负债解析指令 发布订阅者
        Compile(el) {
            console.log(el, 'el')
            // 找到根元素下面所有的子节点
            let nodesArr = el.children
            console.log(nodesArr, 'nodesArr')
            for(let i = 0, length = nodesArr.length; i < length; i++) {
                // 如果每个字节点下面还有节点，需要再走一遍这个函数，这里用到了递归
                if(nodesArr[i].children && nodesArr[i].children.length>0) {
                    // 这里用递归处理
                    this.Compile(nodesArr[i])
                }
                // node是当前元素 先查当前元素有没有指令属性，再取属性的值 然后发布订阅者
                if(nodesArr[i].hasAttribute('v-text')) {
                    const atrributeValue = nodesArr[i].getAttribute('v-text')
                    // 发布订阅者 生成下面格式的数据，每一个订阅者 都是一个使用了该数据的元素。 收集所有的订阅者
                   // {myText: [订阅者1, 订阅者2, 订阅者3], myBox: [订阅者1, 订阅者2, 订阅者3]}
                    this._derective[atrributeValue].push(new Watcher(nodesArr[i], this, atrributeValue, 'innerHTML'))
                }
                if(nodesArr[i].hasAttribute('v-model')) {
                    const atrributeValue = nodesArr[i].getAttribute('v-model')
                    // let dataValue = this.data[atrributeValue]
                    nodesArr[i].addEventListener("input", () => {
                        this.data[atrributeValue] = nodesArr[i].value
                    })
                    this._derective[atrributeValue].push(new Watcher(nodesArr[i], this, atrributeValue, 'value'))
                    
                }
            }
        }
    }
    // 订阅者 主要作用是更新试图
    class Watcher {
        constructor(el, vm, value, op) {
            this.el = el
            this.vm = vm
            this.value = value
            this.op = op
            this.update()
        }
        update() {
            this.el[this.op] = this.vm.data[this.value]
        }
    }
    new Vue({
        el: '#root',
        data:{
            myText: "我是vue的数据双向绑定",
            myBox: "我是vue的另外一个数据双向绑定"
        }
    })