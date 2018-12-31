import $ from 'jquery'

import { loadIncludes, onLoadHtmlSuccess } from './includes'

export function carregaSite() {
    function navegacaoInicial() {
        if (location.hash) {
            navegarViaAjax(location.hash)
        } else {
            const primeiroLink = $('[wm-link]').attr('href')
            navegarViaAjax(primeiroLink)
        }
    }
        
    window.onhashchange = e => navegarViaAjax(location.hash)

    configurarLinks()
    navegacaoInicial()
}
export function marcarLinkComoSelecionado(hash) {
    const links = $('[wm-link]')
    links.each(function(i, e) {
        $(e).removeClass('selecionado')
        
    })
    
    const link = $(`[wm-link='${hash}']`)
    link.addClass('selecionado')
}

export function configurarLinks() {
    $('[wm-link]').each(function(i, e){
        $(e).attr('href', $(e).attr('wm-link'))
    })
}

export function navegarViaAjax(hash, callback = null) {
    if (!hash) return

    const destino = $('[wm-link-destino]')

    const url = hash.substring(1)
    
    destino.attr('wm-include', url)
    loadIncludes()

    if(callback != null) {
        onLoadHtmlSuccess(callback)
    }
}

carregaSite()