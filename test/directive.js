(function(){
describe('babel-plugin-j6x', () => {

  var TRANS = {city:'City', name:'Name'};
  function t(code){
    return TRANS[code] || code;
  }

  function h(tag, attr, directive, ...children){
    return {tag, attr, directive, children};
  }

  it('directive and attribute', () => {
    let vnode = <template><button name="test" x-click={()=>this.saveFile()}>{'save'}</button></template>
    vnode=vnode.children[0]

    expect(vnode.tag).toEqual('button')
    expect(vnode.attr.name).toEqual('test')
    
    expect(typeof vnode.directive).toEqual('object')
    expect(typeof vnode.directive.x).toEqual('object')
    expect(typeof vnode.directive.x.click).toEqual('function')

  })

  it('directive', () => {
    let vnode =  <template><button x-click={this.saveFile()} x-click-more>{'save'}</button></template>
    vnode=vnode.children[0]

    expect(vnode.tag).toEqual('button')
    expect(typeof vnode.directive).toEqual('object')
    expect(typeof vnode.directive.x).toEqual('object')
    expect(typeof vnode.directive.x.click).toEqual('function')
    expect(vnode.directive.x['click-more']).toEqual(true)

  })

  it('directive on-click', () => {
    let vnode =  <template><button on-click={this.saveFile()}>{'save'}</button></template>
    vnode=vnode.children[0]

    expect(vnode.tag).toEqual('button')
    expect(typeof vnode.directive).toEqual('object')
    expect(typeof vnode.directive.on).toEqual('object')
    expect(typeof vnode.directive.on.click).toEqual('function')
  })

  it('directive onclick', () => {
    let vnode =  <template><button onclick={this.saveFile()}>{'save'}</button></template>
    vnode=vnode.children[0]

    expect(vnode.tag).toEqual('button')
    expect(typeof vnode.directive).toEqual('object')
    expect(typeof vnode.directive.on).toEqual('object')
    expect(typeof vnode.directive.on.click).toEqual('function')
  })

})


})()