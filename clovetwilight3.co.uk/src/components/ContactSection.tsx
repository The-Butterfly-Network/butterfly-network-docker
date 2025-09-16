import { Card } from "@/components/ui/card";
import { Mail, MessageCircle, Instagram } from "lucide-react";

const ContactSection = () => {
  const contactLinks = [
    {
      icon: MessageCircle,
      label: "Discord",
      value: "@estrogenhrt",
      href: "https://discord.gg/k8HrBvDaQn",
      color: "text-[#5865F2]"
    },
    {
      icon: Mail,
      label: "Email",
      value: "clovetwilight3@outlook.com",
      href: "mailto:clovetwilight3@outlook.com",
      color: "text-[#0078D4]"
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: "@clovetwilight3",
      href: "https://instagram.com/clovetwilight3",
      color: "text-[#E4405F]"
    }
  ];

  return (
    <section id="contact" className="py-16 animate-fade-in-up">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-12 text-glow-magical">Contact</h2>
        
        <Card className="p-8 glass-effect shadow-magical text-center">
          <p className="text-lg mb-8 text-muted-foreground">
            Best way to reach me is through Discord, but here are all my socials:
          </p>
          
          <div className="grid gap-4 max-w-md mx-auto">
            {contactLinks.map((contact, index) => (
              <a
                key={index}
                href={contact.href}
                target={contact.label !== 'Email' ? '_blank' : undefined}
                rel={contact.label !== 'Email' ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-magical cursor-pointer-scheme"
              >
                <contact.icon className={`w-6 h-6 ${contact.color}`} />
                <div className="text-left flex-1">
                  <div className="font-medium text-foreground">{contact.label}</div>
                  <div className="text-sm text-muted-foreground">{contact.value}</div>
                </div>
              </a>
            ))}
          </div>
          
          <p className="mt-8 text-muted-foreground italic">
            Feel free to reach out about projects, questions about pronouns, or just to say hi! 
            I love meeting new people.
          </p>
        </Card>
      </div>
    </section>
  );
};

export default ContactSection;