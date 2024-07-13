import { DynamicWidget } from "@dynamic-labs/sdk-react-core";

export default function Header() {
  return (
    <header>
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