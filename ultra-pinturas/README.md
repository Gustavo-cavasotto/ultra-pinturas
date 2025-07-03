# 🎨 Ultra Pinturas Especiais - Site Institucional

Site institucional moderno e responsivo para a **Ultra Pinturas Especiais**, empresa especializada em serviços terceirizados de pintura industrial, automotiva e plásticos técnicos.

## 🚀 Características

### ✨ Design Moderno
- Interface profissional com paleta de cores corporativa
- Layout responsivo que funciona em todos os dispositivos
- Modo escuro/claro com persistência de preferência
- Animações suaves e micro-interações

### 🛠️ Tecnologias Utilizadas
- **HTML5** - Estrutura semântica
- **CSS3** - Estilos customizados e variáveis CSS
- **JavaScript Vanilla** - Funcionalidades interativas
- **Tailwind CSS** - Framework de utilidades CSS
- **Font Awesome** - Ícones profissionais
- **Google Fonts** - Tipografia moderna (Poppins)

### 📱 Experiência do Usuário
- ⚡ Carregamento rápido com loader animado
- 🔄 Scroll suave entre seções
- 📊 Barra de progresso de leitura
- 🌙 Alternador de modo escuro/claro
- 📱 Menu mobile responsivo
- ♿ Acessibilidade (WCAG 2.1)
- ⌨️ Atalhos de teclado

### 🎯 Funcionalidades Interativas
- **Seleção de Serviços**: Adicione serviços à solicitação com feedback visual
- **Integração WhatsApp**: Envio direto de orçamentos via WhatsApp
- **Formulário de Contato**: Validação em tempo real e múltiplas opções de envio
- **Galeria Filtrada**: Portfólio de projetos com filtros por categoria
- **FAQ Accordion**: Perguntas frequentes com interface intuitiva
- **Geolocalização**: Mapa integrado com Google Maps

## 📁 Estrutura do Projeto

```
ultra-pinturas/
├── index.html                 # Página principal
├── components/                 # Componentes HTML modulares
│   ├── navbar.html            # Navegação principal
│   ├── hero.html              # Seção hero/banner
│   ├── about.html             # Sobre a empresa
│   ├── services.html          # Catálogo de serviços
│   ├── diferencial.html       # Diferenciais competitivos
│   ├── clients.html           # Clientes e testimoniais
│   ├── certifications.html    # Certificações e conformidades
│   ├── gallery.html           # Galeria de projetos
│   ├── faq.html               # Perguntas frequentes
│   ├── contact.html           # Formulário de contato
│   ├── map.html               # Localização e mapa
│   └── footer.html            # Rodapé institucional
├── css/
│   └── style.css              # Estilos personalizados
├── js/                        # Scripts JavaScript
│   ├── main.js                # Funcionalidades principais
│   ├── services-interaction.js # Interação com serviços
│   ├── form-validation.js     # Validação de formulários
│   └── darkmode-toggle.js     # Alternância modo escuro
├── assets/                    # Recursos estáticos
│   ├── img/                   # Imagens
│   └── icons/                 # Ícones personalizados
└── README.md                  # Documentação
```

## 🎨 Paleta de Cores

```css
/* Cores Principais */
--primary: #0F1F3D    /* Azul escuro - Confiança */
--secondary: #1C4E80  /* Azul médio - Tecnologia */
--accent: #FFFFFF     /* Branco - Limpeza */
--light-gray: #F4F6F8 /* Cinza claro - Fundo */
--dark-gray: #333333  /* Cinza escuro - Textos */

/* Cores de Destaque */
--yellow-accent: #FCD34D  /* Amarelo - CTAs */
--green-accent: #10B981   /* Verde - Sucesso */
--red-accent: #EF4444     /* Vermelho - Alertas */
```

## 📋 Seções do Site

### 1. **Header/Navbar**
- Logo responsivo
- Navegação principal com scroll suave
- Alternador modo escuro/claro
- Menu mobile hambúrguer
- Botão CTA destacado

### 2. **Hero Section**
- Frase de impacto institucional
- Estatísticas da empresa
- CTAs principais
- Vídeo/imagem institucional
- Indicador de scroll

### 3. **Sobre Nós**
- História da empresa
- Missão, Visão e Valores
- Equipe e certificações
- Números e conquistas

### 4. **Serviços** ⭐
- **Pintura Industrial**: Estruturas, equipamentos, tanques
- **Pintura Automotiva**: Veículos, implementos, peças
- **Plásticos Técnicos**: Componentes, peças de precisão
- Botões "Adicionar à Solicitação" com feedback
- Processo de trabalho em 4 etapas

### 5. **Diferenciais**
- Qualidade garantida (ISO)
- Entrega no prazo (98%)
- Equipe qualificada (50+ especialistas)
- Equipamentos modernos
- Sustentabilidade e segurança

### 6. **Clientes**
- Grid de logos de empresas atendidas
- Testimoniais com avaliações
- Estatísticas de satisfação
- Cases de sucesso

### 7. **Certificações**
- ISO 9001, 14001, 45001
- ABNT NBR
- Prêmios e reconhecimentos
- Downloads de documentos

### 8. **Galeria**
- Projetos antes/depois
- Filtros por categoria
- Layout responsivo em grid
- Animações hover

### 9. **FAQ**
- Accordion interativo
- 8 perguntas mais frequentes
- Busca dentro das perguntas
- Links para contato

### 10. **Contato** ⭐
- Formulário completo com validação
- Múltiplas opções de contato
- Integração WhatsApp
- Horários de funcionamento

### 11. **Localização**
- Google Maps integrado
- Botões para direções
- Informações de transporte
- Agendamento de visitas

### 12. **Rodapé**
- Links institucionais
- Redes sociais
- Newsletter signup
- Informações legais

## 🚀 Como Usar

### 1. **Instalação Local**
```bash
# Clone ou baixe os arquivos
# Abra index.html em qualquer navegador moderno
# Ou use um servidor local:

# Python
python -m http.server 8000

# Node.js
npx serve .

# VS Code Live Server
# Clique direito em index.html > "Open with Live Server"
```

### 2. **Deploy Estático**

#### GitHub Pages
1. Faça upload dos arquivos para um repositório GitHub
2. Vá em Settings > Pages
3. Selecione a branch main como source
4. Acesse via: `https://username.github.io/repository-name`

#### Netlify
1. Arraste a pasta do projeto para netlify.com/drop
2. Ou conecte com repositório GitHub
3. Deploy automático em segundos

#### Vercel
```bash
npx vercel
# Siga as instruções para deploy
```

## ⚙️ Configuração

### 1. **Personalização de Conteúdo**
Edite os arquivos em `/components/` para alterar:
- Textos e informações da empresa
- Números e estatísticas
- Serviços oferecidos
- Informações de contato

### 2. **WhatsApp Integration**
No arquivo `js/services-interaction.js`, altere:
```javascript
const phone = '5551995273661'; // Seu número do WhatsApp
```

### 3. **Google Maps**
No arquivo `components/map.html`, substitua:
```html
<!-- Substitua a URL do iframe pelo seu endereço -->
<iframe src="https://www.google.com/maps/embed?pb=...">
```

### 4. **Cores Personalizadas**
No arquivo `css/style.css`, altere as variáveis CSS:
```css
:root {
  --primary: #SuaCor;
  --secondary: #SuaCor;
  /* ... */
}
```

### 5. **Analytics**
Adicione seu código do Google Analytics no `<head>` do `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🎯 Funcionalidades Especiais

### **Sistema de Solicitação de Serviços**
- Clique em "Adicionar à Solicitação" nos cards de serviços
- Visualize serviços selecionados no painel lateral
- Envie tudo via WhatsApp formatado automaticamente
- Persistência local dos serviços selecionados

### **Validação de Formulários**
- Validação em tempo real
- Mensagens de erro contextuais
- Auto-formatação de telefone
- Auto-save de dados do formulário

### **Acessibilidade**
- Navegação por teclado (Tab, Enter, Esc)
- Atalhos: Alt+H (Home), Alt+S (Serviços), Alt+C (Contato)
- Ctrl+Shift+D (Alternar modo escuro)
- ARIA labels e semantic HTML
- Alto contraste opcional

## 📱 Responsividade

O site é totalmente responsivo com breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

Todos os componentes se adaptam automaticamente ao tamanho da tela.

## 🔧 Manutenção

### **Atualizações de Conteúdo**
1. **Textos**: Edite os arquivos `.html` em `/components/`
2. **Imagens**: Substitua em `/assets/img/`
3. **Estilos**: Modifique `/css/style.css`
4. **Funcionalidades**: Ajuste os arquivos `.js` em `/js/`

### **Performance**
- Imagens otimizadas (WebP recomendado)
- CSS e JS minificados para produção
- Lazy loading implementado
- Cache de recursos estáticos

### **SEO**
- Meta tags configuradas
- Schema.org markup
- Sitemap.xml (criar manualmente)
- robots.txt (criar manualmente)

## 📞 Suporte

Para dúvidas sobre implementação ou customização:

1. Consulte a documentação inline nos códigos
2. Verifique os comentários nos arquivos JavaScript
3. Teste todas as funcionalidades antes do deploy
4. Use ferramentas de debug do navegador (F12)

## 📄 Licença

Este projeto é de uso livre para a empresa Ultra Pinturas Especiais.

---

**Desenvolvido com ❤️ para Ultra Pinturas Especiais**

*Site profissional, moderno e otimizado para conversão de leads em clientes.*
