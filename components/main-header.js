import Link from "next/link";
import NavLink from "./nav-link";

export default function MainHeader() {
  return (
    <header id="main-header">
      <div id="logo">
        <Link href="/">NextNews</Link>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink href="/news" text="News" />
          </li>
          <li>
            <NavLink href="/archive" text="Archive" />
          </li>
        </ul>
      </nav>
    </header>
  );
}
