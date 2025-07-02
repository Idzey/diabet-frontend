import { Button } from "@/components/ui/button";
import { OctagonAlert } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-4 justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <OctagonAlert size={100} />
      <h1 className="text-lg">404 — Страница не найдена</h1>
      <NavLink to="/" end>
        <Button variant="outline" className="mt-4">
          На главную
        </Button>
      </NavLink>
    </div>
  );
}
