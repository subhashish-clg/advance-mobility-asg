import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Hello
      <Link href="/admin">Go to Admin Page</Link>
    </main>
  );
}
