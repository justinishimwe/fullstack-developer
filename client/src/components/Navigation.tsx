import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { Menu, X, Code2, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/hooks/use-theme";

const navItems = [
  { name: "About", to: "about" },
  { name: "Skills", to: "skills" },
  { name: "Projects", to: "projects" },
  { name: "Experience", to: "experience" },
  { name: "Contact", to: "contact" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container-padding flex justify-between items-center">
        <Link 
          to="hero" 
          smooth={true} 
          duration={500} 
          className="cursor-pointer flex items-center gap-2 group"
        >
          <div className="bg-primary text-primary-foreground p-2 rounded-lg group-hover:rotate-12 transition-transform duration-300">
            <Code2 size={24} />
          </div>
          <span className="font-display font-bold text-xl tracking-tight">Justin<span className="text-primary">.dev</span></span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              smooth={true}
              duration={500}
              spy={true}
              offset={-100}
              className="text-muted-foreground hover:text-primary font-medium text-sm cursor-pointer transition-colors relative group"
              activeClass="!text-primary font-semibold"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="relative inline-flex items-center justify-center p-2.5 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all duration-300 group"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <motion.div
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center"
              >
                <Moon size={18} />
              </motion.div>
            ) : (
              <motion.div
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center"
              >
                <Sun size={18} />
              </motion.div>
            )}
          </button>
          
          <Link
            to="contact"
            smooth={true}
            duration={500}
            offset={-100}
          >
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2.5 rounded-full font-medium text-sm transition-all shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 active:translate-y-0">
              Hire Me
            </button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all duration-300"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon size={18} />
            ) : (
              <Sun size={18} />
            )}
          </button>
          <button 
            className="text-foreground p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border absolute w-full"
          >
            <div className="container-padding py-6 flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  smooth={true}
                  duration={500}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium py-2 border-b border-border/40 hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="flex items-center gap-3 py-4 px-3 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all duration-300 font-medium"
              >
                {theme === "light" ? (
                  <>
                    <Moon size={20} />
                    Dark Mode
                  </>
                ) : (
                  <>
                    <Sun size={20} />
                    Light Mode
                  </>
                )}
              </button>
              
              <Link
                to="contact"
                smooth={true}
                duration={500}
                onClick={() => setIsOpen(false)}
              >
                <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-3 rounded-lg font-semibold text-center transition-all shadow-lg hover:shadow-primary/25">
                  Hire Me
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
