window.dom = {
    // 创建元素
    template(string) {
        let container = document.createElement('template')
        container.innerHTML = string.trim()
        return container.content.firstChild
    },
    create(tagName) {
        return document.createElement(tagName)
    },
    after(node, newNode) {
        console.log('node.nextSibling', node.nextSibling);
        return node.parentNode.insertBefore(newNode, node.nextSibling)
    },
    before(node, newNode) {
        return node.parentNode.insertBefore(newNode, node)
    },
    wrap(node, parent) {
        dom.before(node, parent)
        dom.append(parent, node)
    },
    // 插入元素
    append(parent, child) {
        parent.append(child)
    },
    // 获取元素
    qs(element) {
        return document.querySelector(element)
    },
    find(selector, scope) {
        return  (scope || document).querySelectorAll(selector)
    },
    parent(node) {
        return node.parentNode
    },
    child(node) {
        return node.childNodes
    },
    siblings(node) {
        let child = node.parentNode.children
        return Array.from(child).filter(n=>n!==node)
    },
    next(node) {
        let n = node.nextSibling
        while (n && n.nodeType === 3) {
            n = n.nextSibling
        }
        return n
    },
    previous(node) {
        let n = node.previousSibling
        while (n && n.nodeType === 3) {
            n = n.previousSibling
        }
        return n
    },
    each(nodeList, fn) {
        for (let i = 0; i < nodeList.length; i++) {
            let n = nodeList[i]
            fn.call(null, n)
        }
    },
    index(node) {
        let list = dom.children(node.parentNode)
        let i
        for (i = 0; i < list.length; i++) {
            let l = list[i];
            if (l === node) {
                break
            }
        }
        return i
    },
    // 删除元素
    remove(node) {
        node.parentNode.removeChild(node)
        return node
    },
    empty(node) {
        let {childNodes} = node
        let array = []
        let x = node.firstChild
        while (x) {
            let n = dom.remove(node.firstChild)
            array.push(n)
            x = node.firstChild
        }
        return array
    },
    // 修改元素
    attr(node, name, value) {
        let l = arguments.length
        if (l === 3) {
            node.setAttribute(name, value)
        } else if (l === 2) {
            return node.getAttribute(name)
        }
    },
    text(node, string) {
        let l = arguments.length
        if (l === 2) {
            node.textContent = string
        } else if (l === 1)  {
            return node.textContent
        }
    },
    html(node, string) {
        let l = arguments.length
        if (l === 2) {
            node.innerHTML = string
        } else if (l === 1)  {
            return node.innerHTML
        }
    },
    style(node, name, value) {
        let l = arguments.length
        if (l === 3) {
            node.style[name] = value
        } else if (l === 2) {
            if (typeof name === 'string') {
                return node.style[name]
            } else if (name instanceof Object) {
                let object = name
                for (let key in object) {
                    node.style[key] = object[key]
                }
            }
        }
    },
    class: {
        add(node, className) {
            node.classList.add(className)
        },
        remove(node, className) {
            node.classList.remove(className)
        },
        has(node, className) {
            return node.classList.contains(className)
        },
    },
    on(node, eventName, fn) {
        node.addEventListener(eventName, fn)
    },
    off(node, eventName, fn) {
        node.removeEventListener(eventName, fn)
    },
}
