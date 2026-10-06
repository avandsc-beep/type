import { fonts, MYFONTS_URL, ACADEMY_URL, CONTACT_EMAIL } from '../lib/fonts'
import LabProvider from './components/LabProvider'
import Cursor from './components/Cursor'
import Archive from './components/Archive'
import Tester from './components/Tester'
import LetterSpecimen from './components/LetterSpecimen'

export default function Home() {
  return (
    <LabProvider>
      <Cursor />
      <a className="skip" href="#archive">Saltar al archivo</a>

      <header className="nav">
        <a className="brand" href="#archive" data-cursor="ARCHIVO">AVAND / TYPE</a>
        <nav aria-label="Principal">
          <a href="#archive" data-cursor="VER">ARCHIVO</a>
          <a href="#experiment" data-cursor="PROBAR">EXPERIMENTAR</a>
          <a href="#academy" data-cursor="ACADEMIA">ACADEMIA</a>
          <a href="#about" data-cursor="AVAND">AVAND</a>
        </nav>
        <span className="open-tag">USO ABIERTO</span>
      </header>

      <main>
        <section id="archive" className="archive" aria-labelledby="archive-title">
          <div className="section-head">
            <span>ARCHIVO TIPOGRÁFICO</span>
            <span>{fonts.length + 1} TIPOGRAFÍAS</span>
          </div>

          <div className="archive-intro">
            <div className="archive-title">
              <span>AVAND / TYPE</span>
              <h1 id="archive-title">LETRAS<br />PARA<br />USAR.</h1>
            </div>
            <div className="archive-manifest">
              <p>Tipografías de AVAND. Abiertas para experimentar, utilizar y transformar.</p>
              <small className="hover-only">PASA EL CURSOR SOBRE LA LÍNEA.</small>
            </div>
          </div>

          <Archive />

          <div className="archive-statement">
            <span>APRENDER</span>
            <strong style={{ fontFamily: 'CruzSanta, sans-serif' }}>TAMBIÉN ES HACER.</strong>
          </div>

          <article className="font-card paid-card">
            <div className="card-top">
              <h3><b>{String(fonts.length + 1).padStart(3, '0')}</b> / CRUZ SANTA</h3>
              <span>LICENCIA COMERCIAL</span>
            </div>
            <div className="specimen-frame paid-specimen">
              <LetterSpecimen family="CruzSanta" text="CRUZ SANTA" size={120} tracking={-3} leading={0.8} className="paid-letter-specimen" />
            </div>
            <div className="paid-info">
              <div>
                <strong>CRUZ SANTA</strong>
                <span>2024 · por Marco Antonio Ramirez Murga · 1 estilo · desde US$ 5</span>
              </div>
              <a href={MYFONTS_URL} target="_blank" rel="noopener noreferrer" data-cursor="MYFONTS">
                COMPRAR EN MYFONTS<span className="sr-only"> (se abre en otra pestaña)</span> ↗
              </a>
            </div>
          </article>
        </section>

        <Tester />

        <section id="academy" className="academy" aria-labelledby="academy-title">
          <div className="section-head">
            <span>ACADEMIA</span>
            <span>EXPLORANDO LETRAS</span>
          </div>
          <div className="academy-grid">
            <h2 id="academy-title">APRENDER<br />TAMBIÉN<br />ES HACER.</h2>
            <div>
              <p>Un espacio de exploración tipográfica para estudiantes y diseñadores. Ejercicios, experimentos y herramientas para comprender las letras haciéndolas.</p>
              <a className="academy-link" href={ACADEMY_URL} target="_blank" rel="noopener noreferrer" data-cursor="EXPLORAR">
                EXPLORAR ACADEMIA<span className="sr-only"> (se abre en otra pestaña)</span> ↗
              </a>
            </div>
          </div>
        </section>

        <section id="about" className="about" aria-labelledby="about-title">
          <span>AVAND</span>
          <div>
            <h2 id="about-title">TIPOGRAFÍA<br />COMO<br />MATERIA.</h2>
            <p>AVAND / TYPE reúne investigaciones, alfabetos y tipografías desarrolladas desde la práctica del diseño. Un archivo abierto para probarlas, usarlas y llevarlas más lejos.</p>
          </div>
          <a href={`mailto:${CONTACT_EMAIL}`} className="about-mail" data-cursor="ESCRIBIR">{CONTACT_EMAIL}</a>
        </section>
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} AVAND / TYPE</span>
        <div>
          <a href="#archive">ARCHIVO</a>
          <a href="#experiment">EXPERIMENTA</a>
          <a href={`mailto:${CONTACT_EMAIL}`}>CONTACTO</a>
        </div>
      </footer>
    </LabProvider>
  )
}
