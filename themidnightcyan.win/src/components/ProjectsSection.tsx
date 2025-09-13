const ProjectsSection = () => {
  return (
    <section id="projects" className="py-16 fade-in-up">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-bright to-lavender bg-clip-text text-transparent">
          Projects
        </h2>
        
        <p className="text-lg text-cyan-muted text-center mb-12">
          Here are some things I've been working on or am excited about:
        </p>
        
        <div className="bg-midnight-light/50 backdrop-blur-md border border-cyan-bright/20 rounded-2xl p-8 shadow-midnight">
          <div className="border-l-4 border-lavender pl-6">
            <h3 className="text-xl font-semibold text-cyan-bright mb-3 flex items-center gap-2">
              <span className="text-2xl">🪻</span>
              <a
                href="https://docs.google.com/document/d/1aMJNtITvScXE58GYoqcGVVTg4h7bvW7HorNytE3hPjw/edit?usp=sharing"
                className="hover:text-lavender transition-smooth underline decoration-lavender/50 hover:decoration-lavender"
              >
                The Walls We Build
              </a>
            </h3>
            
            <p className="text-cyan-muted leading-relaxed">
              A story about Lark's inner demons. Psychological horror book.
            </p>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-lavender-soft italic">
              More projects coming soon! I'm always designing something new.
            </p>
            <div className="flex justify-center space-x-2 mt-2">
              {['✦', '✧', '⋆'].map((diamond, index) => (
                <span
                  key={index}
                  className="text-diamond sparkle-animation"
                  style={{ animationDelay: `${index * 0.3}s` }}
                >
                  {diamond}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;