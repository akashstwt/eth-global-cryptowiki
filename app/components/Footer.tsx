import { Github } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-border py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <img src={logo} alt="CryptoWiki" className="w-6 h-6" />
            <h3 className="text-lg font-semibold text-foreground">
              CryptoWiki
            </h3>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="https://github.com" className="hover:text-foreground transition-colors flex items-center gap-2">
              <Github className="w-4 h-4" />
              GitHub
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Documentation
            </a>
            <p>© 2024 CryptoWiki - Open Source</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;