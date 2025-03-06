import React from 'react'
import '../Config/Config.css'
import NavsConfig from '../../components/buttonConfig'

export const Config = () => {
  return (
    <>
      <div className='container1'>
        <main className='main'>
          <h2 className="tConfig">Configuração</h2>
        <nav className='nav-configs'>
          <NavsConfig alt={'NotifLogo'} title={'Notificação'} src={'src/assets/img/not.png'}>Altere suas prefêrencias de notificações</NavsConfig>
          <NavsConfig alt={'NotifLogo'} title={'Tema'} src={'src/assets/img/tema.png'}>Altere as cores do App</NavsConfig>
          <NavsConfig alt={'NotifLogo'} title={'Feedback'} src={'src/assets/img/feedback.png'}>Informe erros ou recomende algo</NavsConfig>
          <NavsConfig alt={'NotifLogo'} title={'Contato'} src={'src/assets/img/contato.png'}>Entre em contato com a escola</NavsConfig>
        </nav>
        </main>
 
      </div>
      </>

      )
}
