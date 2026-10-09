import './Header.css';

function Header() {
  return (
    <header className="header">
      <img className="header-logo" src={`${process.env.PUBLIC_URL}/skycast-logo.svg`} alt="" />
      <h1 className="header-title">SkyCast</h1>
    </header>
  );
}

export default Header;
