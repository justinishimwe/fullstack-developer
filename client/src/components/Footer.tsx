import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background border-t border-border py-12 mt-20">
      <div className="container-padding">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold font-display mb-2">Justin<span className="text-primary">.dev</span></h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              Building digital experiences with passion and precision.
            </p>
          </div>
          
          <div className="flex gap-4">
            <a href="#" className="p-3 bg-secondary rounded-full text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300">
              <Github size={20} />
            </a>
            <a href="#" className="p-3 bg-secondary rounded-full text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300">
              <Linkedin size={20} />
            </a>
            <a href="#" className="p-3 bg-secondary rounded-full text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300">
              <Twitter size={20} />
            </a>
            <a href="mailto:hello@justin.dev" className="p-3 bg-secondary rounded-full text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300">
              <Mail size={20} />
            </a>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Justin. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
