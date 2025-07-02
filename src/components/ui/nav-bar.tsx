import { BriefcaseMedical } from "lucide-react";

export function NavBar({ activeSection }: { activeSection?: string }) {
  const items = [
    {
      text: "Почему это важно?",
      href: "#why-this-need",
    },
    {
      text: "Проверьте себя",
      href: "#check-yourself",
    },
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center">
      <nav className="flex w-fit py-1 px-2 md:py-3 md:px-4 rounded-b-4xl border-1 shadow-md bg-white/80 dark:bg-gray-900/90 backdrop-blur border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-center mr-4">
          <BriefcaseMedical />
        </div>
        <div className="flex gap-2">
          {items.map((item, index) => (
            <NavBarItem key={index} text={item.text} href={item.href} active={activeSection === item.href} />
          ))}
        </div>
      </nav>
    </div>
  );
}

function NavBarItem({ text, href, active }: { text: string; href: string; active?: boolean }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  return (
    <a href={href} onClick={handleClick}>
      <p className={`p-2 text-sm md:text-md border-1 rounded-4xl transition-colors ${active ? 'bg-blue-500 text-white border-blue-500' : ''}`}>{text}</p>
    </a>
  );
}
