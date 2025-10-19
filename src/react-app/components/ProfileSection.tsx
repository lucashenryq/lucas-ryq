import { MapPin, Calendar, Code2, Figma, Github, Heart, Database, Layout, MessageSquareText, Sparkles, Paintbrush, Atom, Triangle, Zap } from 'lucide-react';

// Custom Gemini Icon Component
const GeminiIcon = ({
  className
}: {
  className?: string;
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" className={className}>
    <path d="M16 2
             C17 8 22 13 28 14
             C22 15 17 20 16 26
             C15 20 10 15 4 14
             C10 13 15 8 16 2Z" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;

// Custom Claude Icon Component
const ClaudeIcon = ({
  className
}: {
  className?: string;
}) => <svg fill="none" height="16" viewBox="0 -.01 39.5 39.53" width="16" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="m7.75 26.27 7.77-4.36.13-.38-.13-.21h-.38l-1.3-.08-4.44-.12-3.85-.16-3.73-.2-.94-.2-.88-1.16.09-.58.79-.53 1.13.1 2.5.17 3.75.26 2.72.16 4.03.42h.64l.09-.26-.22-.16-.17-.16-3.88-2.63-4.2-2.78-2.2-1.6-1.19-.81-.6-.76-.26-1.66 1.08-1.19 1.45.1.37.1 1.47 1.13 3.14 2.43 4.1 3.02.6.5.24-.17.03-.12-.27-.45-2.23-4.03-2.38-4.1-1.06-1.7-.28-1.02c-.1-.42-.17-.77-.17-1.2l1.23-1.67.68-.22 1.64.22.69.6 1.02 2.33 1.65 3.67 2.56 4.99.75 1.48.4 1.37.15.42h.26v-.24l.21-2.81.39-3.45.38-4.44.13-1.25.62-1.5 1.23-.81.96.46.79 1.13-.11.73-.47 3.05-.92 4.78-.6 3.2h.35l.4-.4 1.62-2.15 2.72-3.4 1.2-1.35 1.4-1.49.9-.71h1.7l1.25 1.86-.56 1.92-1.75 2.22-1.45 1.88-2.08 2.8-1.3 2.24.12.18.31-.03 4.7-1 2.54-.46 3.03-.52 1.37.64.15.65-.54 1.33-3.24.8-3.8.76-5.66 1.34-.07.05.08.1 2.55.24 1.09.06h2.67l4.97.37 1.3.86.78 1.05-.13.8-2 1.02-2.7-.64-6.3-1.5-2.16-.54h-.3v.18l1.8 1.76 3.3 2.98 4.13 3.84.21.95-.53.75-.56-.08-3.63-2.73-1.4-1.23-3.17-2.67h-.21v.28l.73 1.07 3.86 5.8.2 1.78-.28.58-1 .35-1.1-.2-2.26-3.17-2.33-3.57-1.88-3.2-.23.13-1.11 11.95-.52.61-1.2.46-1-.76-.53-1.23.53-2.43.64-3.17.52-2.52.47-3.13.28-1.04-.02-.07-.23.03-2.36 3.24-3.59 4.85-2.84 3.04-.68.27-1.18-.61.11-1.09.66-.97 3.93-5 2.37-3.1 1.53-1.79-.01-.26h-.09l-10.44 6.78-1.86.24-.8-.75.1-1.23.38-.4 3.14-2.16z" fill="currentColor" />
  </svg>;

// Custom Grok Icon Component
const GrokIcon = ({
  className
}: {
  className?: string;
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 510" width="18" height="18" className={className}>
    <path fill="currentColor" strokeWidth="12" strokeLinejoin="round" d="M213.235 306.019l178.976-180.002v.169l51.695-51.763c-.924 1.32-1.86 2.605-2.785 3.89-39.281 54.164-58.46 80.649-43.07 146.922l-.09-.101c10.61 45.11-.744 95.137-37.398 131.836-46.216 46.306-120.167 56.611-181.063 14.928l42.462-19.675c38.863 15.278 81.392 8.57 111.947-22.03 30.566-30.6 37.432-75.159 22.065-112.252-2.92-7.025-11.67-8.795-17.792-4.263l-124.947 92.341zm-25.786 22.437l-.033.034L68.094 435.217c7.565-10.429 16.957-20.294 26.327-30.149 26.428-27.803 52.653-55.359 36.654-94.302-21.422-52.112-8.952-113.177 30.724-152.898 41.243-41.254 101.98-51.661 152.706-30.758 11.23 4.172 21.016 10.114 28.638 15.639l-42.359 19.584c-39.44-16.563-84.629-5.299-112.207 22.313-37.298 37.308-44.84 102.003-1.128 143.81z" />
  </svg>;

// Custom ChatGPT Icon Component
const ChatGPTIcon = ({
  className
}: {
  className?: string;
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2406 2406" width="18" height="18" className={className}>
    <path d="M1 578.4C1 259.5 259.5 1 578.4 1h1249.1c319 0 577.5 258.5 577.5 577.4V2406H578.4C259.5 2406 1 2147.5 1 1828.6V578.4z" fill="transparent" />
    <path id="a" d="M1107.3 299.1c-197.999 0-373.9 127.3-435.2 315.3L650 743.5v427.9c0 21.4 11 40.4 29.4 51.4l344.5 198.515V833.3h.1v-27.9L1372.7 604c33.715-19.52 70.44-32.857 108.47-39.828L1447.6 450.3C1361 353.5 1237.1 298.5 1107.3 299.1zm0 117.5-.6.6c79.699 0 156.3 27.5 217.6 78.4-2.5 1.2-7.4 4.3-11 6.1L952.8 709.3c-18.4 10.4-29.4 30-29.4 51.4V1248l-155.1-89.4V755.8c-.1-187.099 151.601-338.9 339-339.2z" fill="currentColor" />
    <use href="#a" transform="rotate(60 1203 1203)" />
    <use href="#a" transform="rotate(120 1203 1203)" />
    <use href="#a" transform="rotate(180 1203 1203)" />
    <use href="#a" transform="rotate(240 1203 1203)" />
    <use href="#a" transform="rotate(300 1203 1203)" />
  </svg>;

export default function ProfileSection() {
  const skills = [
    { name: 'UX/UI', level: 'Design', icon: Layout },
    { name: 'Prompt Engineer', level: 'IA', icon: MessageSquareText },
    { name: 'Vibe Coding', level: 'Desenvolvimento', icon: Sparkles },
    { name: 'Tailwind CSS', level: 'Estilização', icon: Paintbrush },
    { name: 'React.js', level: 'Frontend', icon: Atom },
    { name: 'Vue.js', level: 'Frontend', icon: Triangle },
    { name: 'Vite', level: 'Build Tool', icon: Zap },
    { name: 'ChatGPT', level: 'Análise', icon: ChatGPTIcon },
    { name: 'Gemini', level: 'Integração', icon: GeminiIcon },
    { name: 'Claude', level: 'Codificação', icon: ClaudeIcon },
    { name: 'Grok', level: 'Pesquisa', icon: GrokIcon }
  ];

  const tools = [
    { name: 'Lovable', level: 'Produtividade', icon: Heart },
    { name: 'Supabase', level: 'Backend', icon: Database },
    { name: 'Cursor', level: 'IDE', icon: Code2 },
    { name: 'Figma', level: 'Design', icon: Figma },
    { name: 'Github', level: 'Versionamento', icon: Github }
  ];

  return (
    <div className="space-y-4">
      {/* Profile Card */}
      <div className="bg-theme-secondary rounded-xl p-6 border border-theme">
        <div className="flex items-start space-x-4 mb-4">
          <img src="https://avatars.githubusercontent.com/u/99832653?v=4" alt="Lucas Henryq" className="w-16 h-16 rounded-xl border border-theme object-cover" />
          <div className="flex-1">
            <h2 className="text-xl font-bold text-theme-primary">Lucas Henryq</h2>
            <div className="flex items-center space-x-3 text-sm text-theme-secondary mt-1">
              <div className="flex items-center space-x-1 whitespace-nowrap">
                <MapPin className="w-3 h-3" />
                <span>Loja 22</span>
              </div>
              <div className="flex items-center space-x-1 whitespace-nowrap">
                <Calendar className="w-3 h-3" />
                <span>+2 Anos</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative">
          <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
          <p className="text-theme-secondary text-left leading-relaxed pl-4">Estudante de IA e entusiasta maximalista do Bitcoin.</p>
        </div>
      </div>

      {/* Skills and Tools */}
      <div className="grid grid-cols-1 xl:grid-cols-1 gap-4 xl:space-y-4 xl:block">
        <div className="grid grid-cols-2 xl:grid-cols-1 gap-4 xl:space-y-4 xl:block">
          {/* Habilidades */}
          <div className="bg-theme-secondary rounded-xl p-6 border border-theme">
            <h3 className="font-semibold text-theme-primary mb-4">Habilidades</h3>
            <div className="space-y-3">
              {skills.map((skill, index) => {
              const IconComponent = skill.icon;
              return <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <IconComponent className="w-4 h-4 text-theme-primary" />
                      <span className="text-sm font-medium text-theme-primary">{skill.name}</span>
                    </div>
                    <span className="text-xs text-theme-secondary bg-theme-primary/10 px-2 py-1 rounded">
                      {skill.level}
                    </span>
                  </div>;
            })}
            </div>
          </div>

          {/* Ferramentas */}
          <div className="bg-theme-secondary rounded-xl p-6 border border-theme">
            <h3 className="font-semibold text-theme-primary mb-4">Ferramentas</h3>
            <div className="space-y-2">
              {tools.map((tool, index) => {
              const IconComponent = tool.icon;
              return <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <IconComponent className="w-4 h-4 text-theme-primary" />
                      <span className="text-sm font-medium text-theme-primary">{tool.name}</span>
                    </div>
                    <span className="text-xs text-theme-secondary bg-theme-primary/10 px-2 py-1 rounded">
                      {tool.level}
                    </span>
                  </div>;
            })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}