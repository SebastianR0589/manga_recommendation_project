import mangaLogo from "../assets/images/manga.png";

export default function Header() {
  return (
    <header>
      <img src={mangaLogo} alt="main icon" />
      <h1>Manga Finder</h1>
    </header>
  );
}
