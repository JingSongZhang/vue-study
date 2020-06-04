// 数据响应式
function defineReactive(obj, key, val) {
    observe(val)

    Object.defineProperty(obj, key, {
        get() {
            console.log('get==>', 'key:', key, '值:', val)
            return val
        },
        set(newVal) {
            // console.log(newVal)
            if(newVal !== val) {
                console.log('set==>', 'key:', key, '旧值:', val, '新值:', newVal)
                observe(newVal)
                val = newVal
            }
        }
    })
}

// 循环
function observe(obj) {
    if(typeof obj !== 'object' || obj === null) {
        return
    }
    Object.keys(obj).forEach(key => {
        defineReactive(obj, key, obj[key])
    })
}

function set(obj, key, val) {
    defineReactive(obj, key, val)
}

// let obj = {}

// defineReactive(obj, 'foo', 'foo')

// obj.foo
// obj.foo = 'fooooooo'

let obj = {foo: 'foo', baz: 'baz', rm: {a: 1}}
observe(obj)

// obj.foo
// obj.foo = 'foooooo'
// obj.baz
// obj.baz = 'bazzzzzz'
// obj.rm.a = 2
// obj.baz = {b: 1}
// obj.baz.b

set(obj, 'dong', 'dong1')
obj.dong = 'dong'