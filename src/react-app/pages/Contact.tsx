import { Mail, Phone, MapPin, Linkedin, Github, Download } from 'lucide-react';

export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-theme-primary mb-4">Entre em Contato</h1>
        <p className="text-theme-secondary text-lg">
          Vamos conversar sobre oportunidades de trabalho em reposição e varejo
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="bg-theme-secondary rounded-xl p-6 border border-theme">
          <h2 className="text-xl font-semibold text-theme-primary mb-6">Informações de Contato</h2>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-theme-accent rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-theme-accent-text" />
              </div>
              <div>
                <p className="text-theme-secondary text-sm">Email</p>
                <p className="text-theme-primary font-medium">repositor@email.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-theme-accent rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-theme-accent-text" />
              </div>
              <div>
                <p className="text-theme-secondary text-sm">Telefone</p>
                <p className="text-theme-primary font-medium">(11) 99999-9999</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-theme-accent rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-theme-accent-text" />
              </div>
              <div>
                <p className="text-theme-secondary text-sm">Localização</p>
                <p className="text-theme-primary font-medium">São Paulo, SP</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-theme">
            <h3 className="text-lg font-medium text-theme-primary mb-4">Redes Sociais</h3>
            <div className="flex space-x-3">
              <a 
                href="#" 
                className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <Linkedin className="w-5 h-5 text-white" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-900 transition-colors"
              >
                <Github className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-theme-secondary rounded-xl p-6 border border-theme">
          <h2 className="text-xl font-semibold text-theme-primary mb-6">Enviar Mensagem</h2>
          
          <form className="space-y-4">
            <div>
              <label className="block text-theme-secondary text-sm font-medium mb-2">
                Nome
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-theme-primary border border-theme rounded-lg text-theme-primary placeholder-theme-secondary focus:outline-none focus:border-theme-accent"
                placeholder="Seu nome completo"
              />
            </div>

            <div>
              <label className="block text-theme-secondary text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 bg-theme-primary border border-theme rounded-lg text-theme-primary placeholder-theme-secondary focus:outline-none focus:border-theme-accent"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label className="block text-theme-secondary text-sm font-medium mb-2">
                Empresa
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-theme-primary border border-theme rounded-lg text-theme-primary placeholder-theme-secondary focus:outline-none focus:border-theme-accent"
                placeholder="Nome da empresa"
              />
            </div>

            <div>
              <label className="block text-theme-secondary text-sm font-medium mb-2">
                Mensagem
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 bg-theme-primary border border-theme rounded-lg text-theme-primary placeholder-theme-secondary focus:outline-none focus:border-theme-accent resize-none"
                placeholder="Conte sobre sua oportunidade..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-theme-accent hover:bg-theme-accent-hover text-theme-accent-text py-3 rounded-lg font-medium transition-colors"
            >
              Enviar Mensagem
            </button>
          </form>
        </div>
      </div>

      {/* Resume Download */}
      <div className="bg-theme-secondary rounded-xl p-6 border border-theme text-center">
        <div className="max-w-md mx-auto">
          <Download className="w-12 h-12 text-theme-accent mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-theme-primary mb-2">Currículo</h3>
          <p className="text-theme-secondary mb-4">
            Baixe meu currículo completo com toda experiência em reposição
          </p>
          <button className="bg-theme-accent hover:bg-theme-accent-hover text-theme-accent-text px-6 py-3 rounded-lg font-medium transition-colors">
            Baixar Currículo PDF
          </button>
        </div>
      </div>
    </div>
  );
}
