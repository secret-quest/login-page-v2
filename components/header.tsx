import { DynamicWidget } from "@dynamic-labs/sdk-react-core";

export default function Header() {
  return (
    <header>
      <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap" rel="stylesheet"></link>
      <div className="container">
        <nav>
          <a href="https://login-page-v2-blue.vercel.app/" className="logo">Secret Quest</a>
          <div className="nav-links">
            <DynamicWidget />
          </div>
        </nav>
      </div>
    </header>
  );
}