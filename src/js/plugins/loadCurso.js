import $ from 'jquery'
import { navegarViaAjax } from '../core/navigator'
import { loadUrl } from './loadCursos';

$('.link').click(function () {
    const url = this.href.split('#')
    navegarViaAjax(url[1], function () {
        loadCurso()
    })
})

export function loadCurso() {
    const id = window.location.href.split('?page=')
    if (id[1] != undefined) {
        $('[wm-curso]').cursoDiv(id[1])
    }
}

$.fn.cursoDiv = function (id) {
    const urlCurso = `https://cefis.com.br/api/v1/event/${id}?include=classes`
    new Promise((res, err) => {
        res(loadUrl(urlCurso))
    }).then(resp => {
        let getDuration = (d) => {
            let c = d.substring().split(":")
            return `${Math.round(c[0])} horas e ${Math.round(c[1], 1)} minutos`
        }
        let classe = ''
        resp.data.classes.map((cl, idx) => classe += (
            `<li class="list-group-item"><i class="fa fa-play-circle-o fa-1" aria-hidden="true">
            </i><span>${idx + 1} - ${cl.title}</span></li>`))
        const divCursoH = `
                    <div class="row">
                    <div class="col-12">
                        <div class="breadcrumb">
                            <a href="/" class="btn btn-default btn-secondary home"><i class="fa fa-home"></i></a>
                            <span title="${resp.data.category}" class="btn btn-default this-course">Curso da Área
                                ${resp.data.category}</span>
                            <span title="${resp.data.title}" class="btn btn-default this-course">${resp.data.title}</span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-lg-6 col-md-6 mb-4">
                        <div class="video">
                            <video controls title="Trailer do curso ${resp.data.id} - ${resp.data.title}">
                                <source src="${resp.data.video_promocional}">
                            </video>
                        </div>
                    </div>
                    <div class="col-12 col-lg-6 col-md-6 mb-4">
                        <div class="sobre-curso">
                            <div class="banner-curso mt-2">
                                <img src="${resp.data.banner}" alt="" class="img-fluid" />
                            </div>
                            <div class="titulo">
                                <h1>${resp.data.title}</h1>
                            </div>
                            <div class="nome-professor">
                                <h5><span>COM:</span> <b>${resp.data.teachers_names}</b></h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 bloco-descritivo">
                    <div class="row">
                        <div class="col-md-7 bloco-descritivo-direito">
                            <section class="classes">
                                <h5>O QUE VOCÊ VAI APRENDER</h5>
                                ${classe != null ? `<ul class="list-group" id="accordion" role="tablist">${classe}</ul>`
                : `<li class="list-group-item"><i class="fa fa-play-circle-o fa-1" aria-hidden="true"></i>
                                <span>Não foram cadastradas aulas para este módulo ainda!</span></li>`}
                            </section>
                        </div>
                        <div class="col-md-5 bloco-descritivo-esquerdo">
                            <section>
                                <h5>SOBRE O CURSO</h5>
                                <p>${resp.data.resume}</p>
                            </section>
                            <section>
                                <h5>CARGA HORÁRIA</h5>
                                <p>${getDuration(resp.data.duration)}</p>
                            </section>
                            <section>
                                <h5>OBJETIVO GERAL</h5>
                                <p>${resp.data.goal}</p>
                            </section>
                        </div>
                    </div>
                </div>`
        $(this).html(divCursoH)
    })
}