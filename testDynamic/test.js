// tests with dynamicTranslation and all handled as template
// babel option when calling plugin in .babelrc
// ["../index", {forTemplate:true, dynamicTranslation:true}]

describe('babel-plugin-j6x', function(){
  var TRANS = {city:'City', name:'Name'};
  function t(code){
    return TRANS[code] || code;
  }

  function h(tag, attr, directive, ...children){
    return {tag, attr, directive, children};
  }

  it('translate deferred', () => {// because global option in .babelrc
    const vnode = <div attr={t('city')}>{t('name')}</div>
    expect(vnode.tag).toEqual('div')
    
    // translated upon evaluation of the function
    expect(vnode.children[0]()).toEqual('Name')
    expect(vnode.attr.attr()).toEqual('City')
  })

  it('should not wrap delcared function', () => {
    const vnode = <div>{function(){return 'test'}}</div>
    expect(vnode.tag).toEqual('div')
    expect(vnode.children[0]()).toEqual('test')
  })

  it('should not wrap delcared arrow function', () => {
    const vnode = <div>{()=>{return 'test2'}}</div>
    expect(vnode.tag).toEqual('div')
    expect(vnode.children[0]()).toEqual('test2')
  })

  it('should contain text', () => {
    const vnode = <div>test</div>
    expect(vnode.tag).toEqual('div')
    expect(vnode.children[0]).toEqual('test')
  })

  it('should spread attribs', () => {
    const sth = {name:'Joe'};
    const vnode = <div {...sth}>test</div>
    
    expect(vnode.tag).toEqual('div')
    expect(vnode.children[0]).toEqual('test')
    expect(vnode.attr.name).toEqual('Joe')
  })

  it('should spread and combine attribs', () => {
    const v1 = {name:'Joe1', city:'Mordor'};
    const $href= '#';
    const v2 = {name:'Joe2'};

    const vnode = <div {...v1} href={$href} id="myId" {...v2}></div>

    expect(vnode.tag).toEqual('div')
    expect(vnode.attr.name).toEqual('Joe2')
    expect(vnode.attr.href).toEqual('#')
    expect(vnode.attr.id).toEqual('myId')
    expect(vnode.attr.city).toEqual('Mordor')
  })

})

