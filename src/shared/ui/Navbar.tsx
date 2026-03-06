import Link from "next/link";

export default function Navbar() {
  return (
    <div className="navbar">
      <nav>
        <Link href="/actors">Actors</Link>
        <Link href="/crear">Create Actor</Link>
      </nav>
    </div>
  );
}