// import Logo from "./src/img/logotb.svg";
// import Banner from "../img/banner.png";
import { Link } from "react-router-dom";
import "../styles/main.css";

export default function Home() {
  return (
    <div>
      <header className="">
        <div className="header_content container">
          <div id="title">
            <h1>TalentBridge</h1>
          </div>

          <ul>
            <li><Link href="#">Saiba mais</Link></li>
            <li><Link href="#">Institucional</Link></li>
            <li><Link href="#">Fale conosco</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </div>
      </header>


      <section className="banner_home">
        <img className="img_banner" src="/img/logotb.svg" alt="Logo marca" />
      </section>


      <section className="box__atividades container">

        <img className="box__atividades-img" src="/img/aperto-banner.svg"  alt="Banner " />

        <div className="box__atividades-conteudo">
          <h2>Encontre seu match profissional</h2>
          <p>Com a TalentBridge, ficou mais fácil encontrar seu emprego ideal</p>

          <Link to="/login" className="box__atividades-button">Acesse agora</Link>
        </div>
      </section>

      <section className="box__info-candidato">
        <div className="box__info-content container">
          <h3>Saiba o que a TalentBridge pode fazer por você, candidato</h3>
          <ul>
            <li>Podcasts</li>
            <li>Palestras</li>
            <li>Workshops</li>
            <li>e muito mais...</li>
          </ul>
        </div>

      </section>
      <section className="box__info-recrutador">
        <div className="box__info-content container">
          <h3>Saiba o que a TalentBridge pode fazer por você, recrutador</h3>
          <ul>
            <li>Ferramentas de seleção avançada</li>
            <li>Eventos para recrutamento</li>
            <li>Conexão com os maiores talentos do mercado</li>
            <li>e muito mais...</li>
          </ul>
        </div>

      </section>
      <footer>
        <span>TalentBridge - Todos os direitos reservados 2025</span>
      </footer>
    </div>
  );
}