import linkedinLogo from "../../imgs/linkedin-logo.png";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container-footer">
        Pour accéder à mon profil Linkedin, cliquez sur le logo.
        <a href="https://www.linkedin.com/in/nils-oporto-47b5b4267/">
          <img className="right-footer" src={linkedinLogo} alt="" />
        </a>
      </div>
    </div>
  );
};
export default Footer;
