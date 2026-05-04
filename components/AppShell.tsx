"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { FileText, MessageSquare, Mic, Plus, Scale } from "lucide-react";

const navItems = [
  { href: "/chat", label: "Chat", icon: MessageSquare },
  { href: "/doc", label: "SuperDoc", icon: FileText },
  { href: "/voice", label: "Voice", icon: Mic }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  function openChat(title?: string) {
    window.dispatchEvent(new CustomEvent("advoai:new-chat", { detail: { title } }));
    if (pathname !== "/chat") {
      router.push("/chat");
    }
  }

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            <Scale size={22} />
          </span>
          <div>
            <h1>AdvoAI</h1>
            <p>Legal AI workspace</p>
          </div>
        </div>

        <button className="new-chat-button" onClick={() => openChat()} type="button">
          <Plus size={18} />
          New chat
        </button>

        <nav className="nav" aria-label="Primary">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link className={`nav-link ${active ? "active" : ""}`} href={item.href} key={item.href}>
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <section>
          <p className="sidebar-section-title">Recent matters</p>
          <div className="session-list">
            {["Lease renewal advice", "Service agreement draft", "Client notice review"].map((session) => (
              <button className="session-item" key={session} onClick={() => openChat(session)} type="button" title={session}>
                {session}
              </button>
            ))}
          </div>
        </section>
      </aside>
      <main className="main">{children}</main>
    </div>
  );
}
