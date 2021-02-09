const Header: React.FC<{ text: string }> = ({ text }) => {
  return (
    <header className="App-header">
      <h2>{text}</h2>
    </header>
  );
};

export default Header;
