import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      id: "gender-identity",
      question: "What is your gender and identity? Why use neopronouns?",
      answer: (
        <div className="space-y-4">
          <p>
            My gender is "genderfae", a gender where a person experiences a fluid gender identity, 
            but never as a man or a masculine-aligned gender. This means my gender can fluctuate 
            among various feminine, neutral, or unaligned genders, but it will not include anything 
            masculine or male-aligned.
          </p>
          <p>
            My sexuality is faesexual, which is sexual attraction to all genders except masculine ones.
          </p>
          <p>
            I use neopronouns as after a joke with a friend, saying they'd be using them with me, 
            I then realized fae/faer made me feel more gender euphoric and that's why I use them today.
          </p>
        </div>
      )
    },
    {
      id: "pronoun-mistakes",
      question: "What if I mess up your pronouns?",
      answer: (
        <p>
          No worries! Just correct yourself and move on. Everyone makes mistakes when learning 
          something new. I appreciate the effort to get them right, and practice makes it easier over time.
        </p>
      )
    },
    {
      id: "collaborations",
      question: "Are you open to collaborations?",
      answer: (
        <p>
          Absolutely! I love working on projects that align with my values of inclusivity and creativity! 
          Feel free to reach out through Discord or email to discuss ideas.
        </p>
      )
    }
  ];

  return (
    <section id="faq" className="py-16 animate-fade-in-up">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-12 text-glow-magical">FAQ</h2>
        
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq) => (
            <AccordionItem 
              key={faq.id} 
              value={faq.id}
              className="border border-border/50 rounded-lg glass-effect px-6"
            >
              <AccordionTrigger className="text-left hover:text-primary transition-magical cursor-pointer-scheme">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;