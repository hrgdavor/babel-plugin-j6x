

describe('babel-plugin-j6x', () => {
  var TRANS = {city:'City', name:'Name'};
  function t(code){
    return TRANS[code] || code;
  }

  function h(tag, attr, directive, ...children){
    return {tag, attr, directive, children};
  }

  it('translate deferred', () => {// because wrapped in template tag
    let vnode = <template><div attr={t('city')}>{'name'}</div></template>
    vnode = vnode.children[0];
    expect(vnode.tag).toEqual('div')
    // translated upon evaluation of the function

    expect(vnode.children[0]).toEqual('Name')
    expect(vnode.attr.attr).toEqual('City')
  })

  it('translate immediate', () => {
    // also use the translation transformer {'city'} -> {t('city')} builtin into jsx transformation plugin
    const vnode = <div attr={'city'}>{t('name')}</div>
    expect(vnode.tag).toEqual('div')

    // translated immediately by calling t('name') inline
    expect(vnode.children[0]).toEqual('Name')
    expect(vnode.attr.attr).toEqual('City')
  })

  it('static attr', () => {
    // also use the translation transformer {'city'} -> {t('city')} builtin into jsx transformation plugin
    let vnode = <template><div attr$={TRANS['city']}>{t('name')}</div></template>
    vnode = vnode.children[0];
    expect(vnode.tag).toEqual('div')

    // translated immediately by calling t('name') inline
    expect(vnode.children[0]).toEqual('Name')
    expect(vnode.attr.attr).toEqual('City')
  })

})

