import { DynamicWidget } from "@dynamic-labs/sdk-react-core";

export default function Header() {
  return (
    <header>
      <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap" rel="stylesheet"></link>
      <div className="container">
        <nav>
          <div className="logo">Secret Quest</div>
          <div className="nav-links">
            <DynamicWidget />
          </div>
        </nav>
      </div>
    </header>
  );
}