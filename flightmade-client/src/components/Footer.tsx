export default function Footer() {
  return (
    <footer className="flex gap-6 flex-wrap items-center justify-center text-gray-400 text-sm py-6 border-t">
      <span>© {new Date().getFullYear()} FlightMade</span>
      <a className="hover:underline" href="mailto:peter.l.gituma@gmail.com">
        info@flightmade.com
      </a>
    </footer>
  );
}
