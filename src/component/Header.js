import logo from "../images/logo-mesto-russia-white.svg";

export default function Header() {
  return (
    <header className="header">
      <img
        src={logo}
        alt="Место Россия"
        className="header__logo"
      />
    </header>
  );
}