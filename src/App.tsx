import { useEffect, useMemo, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  ArrowRight,
  AtSign,
  CalendarDays,
  Check,
  ChevronRight,
  Clock,
  Footprints,
  Heart,
  Home,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  PawPrint,
  Phone,
  Plus,
  Search,
  Scissors,
  ShoppingBag,
  Sparkles,
  Star,
  Stethoscope,
  Syringe,
  Trash2,
  Truck,
  X,
} from 'lucide-react'
import './App.css'

type Category =
  | 'Todos'
  | 'Rações'
  | 'Petiscos'
  | 'Brinquedos'
  | 'Higiene'
  | 'Acessórios'
  | 'Medicamentos'
  | 'Gatos'

type Product = {
  id: number
  name: string
  category: Exclude<Category, 'Todos'>
  price: number
  oldPrice?: number
  rating: number
  reviews: number
  image: string
  badge?: string
  pet: string
}

type CartItem = Product & { qty: number }

type Service = {
  title: string
  description: string
  duration: string
  price: string
  icon: LucideIcon
  color: string
}

const navLinks = [
  { label: 'Início', id: 'inicio' },
  { label: 'Loja', id: 'loja' },
  { label: 'Serviços', id: 'servicos' },
  { label: 'Agendamento', id: 'agendamento' },
  { label: 'Adoção', id: 'adocao' },
  { label: 'Sobre nós', id: 'sobre' },
  { label: 'Contato', id: 'contato' },
]

const services: Service[] = [
  {
    title: 'Banho & tosa',
    description: 'Cuidado gentil, pele hidratada e acabamento que respeita cada pelagem.',
    duration: 'a partir de 1h',
    price: 'a partir de R$ 75',
    icon: Scissors,
    color: 'coral',
  },
  {
    title: 'Consulta veterinária',
    description: 'Atenção preventiva e orientação clara para a saúde do seu companheiro.',
    duration: '45 min',
    price: 'R$ 160',
    icon: Stethoscope,
    color: 'sun',
  },
  {
    title: 'Vacinação',
    description: 'Carteirinha organizada, lembretes e aplicação com muito cuidado.',
    duration: '30 min',
    price: 'a partir de R$ 95',
    icon: Syringe,
    color: 'blue',
  },
  {
    title: 'Hotel & pet sitter',
    description: 'Rotina monitorada, brincadeiras e notícias para você viajar tranquilo.',
    duration: 'diária',
    price: 'a partir de R$ 110',
    icon: Home,
    color: 'leaf',
  },
  {
    title: 'Passeio com cães',
    description: 'Passeios seguros, no ritmo do pet e com atualização em tempo real.',
    duration: '50 min',
    price: 'R$ 55',
    icon: Footprints,
    color: 'coral',
  },
  {
    title: 'Entrega expressa',
    description: 'Ração, carinho e tudo que falta aí — entregue no mesmo dia.',
    duration: 'até 2h',
    price: 'grátis acima de R$ 149',
    icon: Truck,
    color: 'blue',
  },
]

const categories: Category[] = [
  'Todos',
  'Rações',
  'Petiscos',
  'Brinquedos',
  'Higiene',
  'Acessórios',
  'Medicamentos',
  'Gatos',
]

const products: Product[] = [
  {
    id: 1,
    name: 'Ração N&D Prime Cães Adultos',
    category: 'Rações',
    price: 149.9,
    oldPrice: 169.9,
    rating: 4.9,
    reviews: 98,
    image:
      'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=900&q=85',
    badge: '-12%',
    pet: 'Cães',
  },
  {
    id: 2,
    name: 'Sachê Gourmet Gatos Adultos',
    category: 'Gatos',
    price: 8.9,
    rating: 4.8,
    reviews: 64,
    image:
      'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=900&q=85',
    pet: 'Gatos',
  },
  {
    id: 3,
    name: 'Mordedor Natural Café & Coco',
    category: 'Brinquedos',
    price: 29.9,
    rating: 4.7,
    reviews: 41,
    image:
      'https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=900&q=85',
    pet: 'Cães',
  },
  {
    id: 4,
    name: 'Tapete Higiênico Ultra Seco 30un',
    category: 'Higiene',
    price: 72.5,
    oldPrice: 84.9,
    rating: 4.9,
    reviews: 122,
    image:
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=900&q=85',
    badge: 'queridinho',
    pet: 'Cães',
  },
  {
    id: 5,
    name: 'Peitoral Conforto Brisa Azul',
    category: 'Acessórios',
    price: 64.9,
    rating: 4.8,
    reviews: 37,
    image:
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=900&q=85',
    pet: 'Cães',
  },
  {
    id: 6,
    name: 'Antipulgas Spot On — 10 a 20kg',
    category: 'Medicamentos',
    price: 89.9,
    rating: 4.9,
    reviews: 53,
    image:
      'https://images.unsplash.com/photo-1606425271394-c3ca9aa1c0be?auto=format&fit=crop&w=900&q=85',
    pet: 'Cães',
  },
  {
    id: 7,
    name: 'Biscoito Assado de Abóbora',
    category: 'Petiscos',
    price: 18.9,
    rating: 4.6,
    reviews: 29,
    image:
      'https://images.unsplash.com/photo-1541599468348-e96984315921?auto=format&fit=crop&w=900&q=85',
    pet: 'Cães',
  },
  {
    id: 8,
    name: 'Areia Biodegradável de Mandioca 4kg',
    category: 'Higiene',
    price: 54.9,
    rating: 4.8,
    reviews: 77,
    image:
      'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=900&q=85',
    pet: 'Gatos',
  },
]

const professionals = [
  { name: 'Bia Santos', role: 'Especialista em banho & tosa', initials: 'BS', color: 'coral' },
  { name: 'Dr. Caio Lemos', role: 'Médico-veterinário', initials: 'CL', color: 'blue' },
  { name: 'Maya Rocha', role: 'Cuidadora e pet sitter', initials: 'MR', color: 'sun' },
]

const adoptionPets = [
  {
    name: 'Amora', age: '1 ano', size: 'Porte médio', trait: 'Doce e brincalhona',
    image: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=1000&q=85',
  },
  {
    name: 'Nino', age: '8 meses', size: 'Porte pequeno', trait: 'Curioso e companheiro',
    image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=1000&q=85',
  },
  {
    name: 'Lua', age: '3 anos', size: 'Porte médio', trait: 'Tranquila e carinhosa',
    image: 'https://images.unsplash.com/photo-1554692918-08fa0fdc9db3?auto=format&fit=crop&w=1000&q=85',
  },
]

const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)

function CountUp({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    let frame = 0
    let hasStarted = false
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || hasStarted) return
      hasStarted = true
      const startedAt = performance.now()
      const duration = 1250
      const animate = (now: number) => {
        const progress = Math.min((now - startedAt) / duration, 1)
        setValue(Math.round(end * (1 - Math.pow(1 - progress, 3))))
        if (progress < 1) frame = requestAnimationFrame(animate)
      }
      frame = requestAnimationFrame(animate)
      observer.disconnect()
    }, { threshold: 0.35 })
    observer.observe(element)
    return () => { observer.disconnect(); cancelAnimationFrame(frame) }
  }, [end])

  return <span ref={ref}>{value.toLocaleString('pt-BR')}{suffix}</span>
}

function App() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [activeCategory, setActiveCategory] = useState<Category>('Todos')
  const [query, setQuery] = useState('')
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [activeService, setActiveService] = useState<Service | null>(null)
  const [adoptionPet, setAdoptionPet] = useState<(typeof adoptionPets)[number] | null>(null)
  const [toast, setToast] = useState('')
  const [orderComplete, setOrderComplete] = useState(false)
  const [appointmentStep, setAppointmentStep] = useState(1)
  const [appointmentDone, setAppointmentDone] = useState(false)
  const [appointmentError, setAppointmentError] = useState('')
  const [appointment, setAppointment] = useState({
    service: 'Banho & tosa', petName: 'Luna', petType: 'Cachorra · vira-lata', professional: 'Bia Santos',
    date: 'Sábado, 12 de setembro', time: '10:30', transport: 'Busca e leva',
  })
  const [contact, setContact] = useState({ name: '', email: '', message: '' })
  const [contactState, setContactState] = useState<'idle' | 'error' | 'success'>('idle')

  const displayedProducts = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase('pt-BR')
    return products.filter((product) => {
      const categoryMatch = activeCategory === 'Todos' || product.category === activeCategory
      const textMatch = !normalized || `${product.name} ${product.category} ${product.pet}`.toLocaleLowerCase('pt-BR').includes(normalized)
      return categoryMatch && textMatch
    })
  }, [activeCategory, query])

  const cartQuantity = cart.reduce((total, item) => total + item.qty, 0)
  const subtotal = cart.reduce((total, item) => total + item.price * item.qty, 0)

  useEffect(() => {
    if (!toast) return
    const timeout = window.setTimeout(() => setToast(''), 2800)
    return () => window.clearTimeout(timeout)
  }, [toast])

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setIsMenuOpen(false)
  }
  const addToCart = (product: Product) => {
    setCart((items) => {
      const current = items.find((item) => item.id === product.id)
      return current
        ? items.map((item) => item.id === product.id ? { ...item, qty: item.qty + 1 } : item)
        : [...items, { ...product, qty: 1 }]
    })
    setToast(`${product.name} foi adicionado ao carrinho.`)
  }
  const changeQuantity = (id: number, change: number) => setCart((items) => items.map((item) => item.id === id ? { ...item, qty: item.qty + change } : item).filter((item) => item.qty > 0))
  const selectService = (service: string) => {
    setAppointment((current) => ({ ...current, service }))
    setActiveService(null); setAppointmentDone(false); goTo('agendamento')
  }
  const advanceAppointment = () => {
    setAppointmentError('')
    if (appointmentStep === 2 && (!appointment.petName.trim() || !appointment.petType.trim())) {
      setAppointmentError('Conte o nome e o tipo do seu pet para continuar.')
      return
    }
    if (appointmentStep === 5) {
      setAppointmentDone(true); setToast('Agendamento confirmado. Enviamos os detalhes para você!'); return
    }
    setAppointmentStep((step) => step + 1)
  }
  const resetAppointment = () => { setAppointmentDone(false); setAppointmentStep(1); setAppointmentError('') }
  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!contact.name.trim() || !contact.email.trim() || !contact.message.trim()) { setContactState('error'); return }
    setContactState('success'); setContact({ name: '', email: '', message: '' })
  }
  const openCart = () => { setOrderComplete(false); setIsCartOpen(true) }

  return (
    <div className="site-shell">
      <a className="skip-link" href="#conteudo">Ir para o conteúdo</a>
      <header className="site-header">
        <button className="brand" onClick={() => goTo('inicio')} aria-label="Voltar ao início">
          <span className="brand-mark" aria-hidden="true"><PawPrint size={23} strokeWidth={2.6} /></span>
          <span><strong>Pata</strong><em>& Companhia</em></span>
        </button>
        <nav className="desktop-nav" aria-label="Navegação principal">
          {navLinks.map((link) => <button key={link.id} onClick={() => goTo(link.id)}>{link.label}</button>)}
        </nav>
        <div className="header-actions">
          <button className="icon-button search-button" onClick={() => setIsSearchOpen(true)} aria-label="Buscar produtos"><Search size={20} /></button>
          <button className="icon-button cart-button" onClick={openCart} aria-label={`Abrir carrinho, ${cartQuantity} itens`}><ShoppingBag size={20} />{cartQuantity > 0 && <span className="cart-count">{cartQuantity}</span>}</button>
          <button className="header-cta" onClick={() => goTo('agendamento')}>Agendar serviço <CalendarDays size={16} /></button>
          <button className="mobile-menu-button" onClick={() => setIsMenuOpen((open) => !open)} aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={isMenuOpen}>{isMenuOpen ? <X size={24} /> : <Menu size={24} />}</button>
        </div>
      </header>
      {isMenuOpen && <nav className="mobile-nav" aria-label="Navegação mobile">
        {navLinks.map((link) => <button key={link.id} onClick={() => goTo(link.id)}>{link.label}<ChevronRight size={18} /></button>)}
        <button className="mobile-nav-cta" onClick={() => goTo('agendamento')}>Agendar serviço <ArrowRight size={18} /></button>
      </nav>}

      <main id="conteudo">
        <section className="hero-section" id="inicio">
          <div className="hero-copy reveal">
            <span className="eyebrow eyebrow-dark"><Sparkles size={15} /> Seu pet, bem cuidado</span>
            <h1>Tudo o que seu <span>melhor amigo</span> precisa, em um só lugar.</h1>
            <p>Produtos escolhidos com carinho, banho e tosa, atendimento veterinário e acompanhamento de verdade — sem complicar a rotina de quem ama um pet.</p>
            <div className="hero-buttons"><button className="button button-coral" onClick={() => goTo('loja')}>Comprar agora <ArrowRight size={19} /></button><button className="button button-ghost" onClick={() => goTo('agendamento')}><CalendarDays size={19} /> Agendar banho e tosa</button></div>
            <div className="hero-review"><div className="mini-avatars" aria-hidden="true"><span className="avatar-one">M</span><span className="avatar-two">L</span><span className="avatar-three">T</span></div><div><div className="stars" aria-label="Avaliação de 4,9 estrelas">{[1,2,3,4,5].map((star) => <Star key={star} size={14} fill="currentColor" />)}</div><p><strong>4,9/5</strong> por mais de 1.200 famílias</p></div></div>
          </div>
          <div className="hero-art reveal delay-1">
            <div className="hero-sun" aria-hidden="true" /><div className="hero-sticker hero-sticker-top"><span>♥</span> Cuidado que se vê</div>
            <div className="hero-image-frame"><img src="https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=1600&q=90" alt="Cão feliz na Pata & Companhia" /></div>
            <div className="hero-float-card hero-float-card-bottom"><span className="float-icon"><Truck size={17} /></span><span><strong>Entrega hoje</strong><small>para pedidos até 16h</small></span></div>
            <span className="paw-orbit paw-orbit-one" aria-hidden="true">✦</span><span className="paw-orbit paw-orbit-two" aria-hidden="true"><PawPrint size={26} /></span>
          </div>
        </section>

        <section className="trust-strip" aria-label="Diferenciais da Pata & Companhia">
          <div><Truck size={22} /><span><strong>Entrega rápida</strong> no mesmo dia</span></div><div><Sparkles size={22} /><span><strong>Profissionais</strong> especializados</span></div><div><MessageCircle size={22} /><span><strong>Atendimento</strong> pelo WhatsApp</span></div><div><Heart size={22} /><span><strong>+8 mil pets</strong> bem cuidados</span></div>
        </section>

        <section className="services-section section-space" id="servicos">
          <div className="section-heading split-heading reveal"><div><span className="eyebrow"><PawPrint size={15} /> Serviços pensados para cada fase</span><h2>Mais tempo de qualidade <i>juntos.</i></h2></div><p>Do banho da semana à primeira vacina, nossa equipe cuida das pequenas rotinas que deixam a vida do seu pet mais leve.</p></div>
          <div className="service-list reveal delay-1">{services.map((service, index) => { const Icon = service.icon; return <article className="service-row" key={service.title}><span className="service-number">0{index + 1}</span><span className={`service-icon ${service.color}`}><Icon size={24} /></span><div className="service-content"><h3>{service.title}</h3><p>{service.description}</p></div><div className="service-meta"><span>{service.duration}</span><strong>{service.price}</strong></div><button className="round-arrow" onClick={() => setActiveService(service)} aria-label={`Ver ${service.title}`}><ArrowRight size={19} /></button></article>})}</div>
        </section>

        <section className="shop-section" id="loja">
          <div className="shop-top section-space"><div className="section-heading shop-heading reveal"><span className="eyebrow eyebrow-light"><ShoppingBag size={15} /> Loja selecionada a patinha</span><h2>O que faz bem, chega <i>até você.</i></h2><p>Marcas confiáveis, preços transparentes e uma seleção que a gente realmente ofereceria para os nossos próprios pets.</p></div><div className="shop-search-wrap reveal delay-1"><Search size={19} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="O que seu pet precisa hoje?" aria-label="Buscar produtos na loja" />{query && <button onClick={() => setQuery('')} aria-label="Limpar busca"><X size={17} /></button>}</div></div>
          <div className="category-scroller" role="tablist" aria-label="Categorias da loja">{categories.map((category) => <button key={category} role="tab" aria-selected={activeCategory === category} className={activeCategory === category ? 'active' : ''} onClick={() => setActiveCategory(category)}>{category}</button>)}</div>
          <div className="products-wrap"><div className="product-results"><span>Seleção da semana</span><span>{displayedProducts.length} {displayedProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}</span></div>{displayedProducts.length > 0 ? <div className="product-grid">{displayedProducts.map((product) => <article className="product-card" key={product.id}><div className="product-image"><img src={product.image} alt={product.name} loading="lazy" />{product.badge && <span className="product-badge">{product.badge}</span>}<span className="product-pet">para {product.pet.toLowerCase()}</span><button className="quick-add" onClick={() => addToCart(product)} aria-label={`Adicionar ${product.name} ao carrinho`}><Plus size={19} /></button></div><div className="product-info"><div className="product-rating"><Star size={14} fill="currentColor" /> {product.rating.toFixed(1)} <span>({product.reviews})</span></div><h3>{product.name}</h3><div className="product-prices"><strong>{formatCurrency(product.price)}</strong>{product.oldPrice && <del>{formatCurrency(product.oldPrice)}</del>}</div><button className="product-add" onClick={() => addToCart(product)}>Adicionar <ShoppingBag size={16} /></button></div></article>)}</div> : <div className="empty-products"><span><Search size={30} /></span><h3>Nenhum produto por aqui</h3><p>Tente outro termo ou veja todos os itens da nossa seleção.</p><button onClick={() => { setQuery(''); setActiveCategory('Todos') }}>Ver toda a loja</button></div>}</div>
          <div className="shop-delivery-banner"><div className="delivery-wheel" aria-hidden="true"><Truck size={32} /></div><p><strong>Frete por nossa conta</strong> em compras acima de R$ 149 para a região central.</p><button onClick={() => goTo('contato')}>Ver áreas atendidas <ArrowRight size={17} /></button></div>
        </section>

        <section className="appointment-section section-space" id="agendamento">
          <div className="appointment-intro reveal"><span className="eyebrow"><CalendarDays size={15} /> Agenda descomplicada</span><h2>Seu tempo é precioso.<br /><i>O bem-estar dele também.</i></h2><p>Escolha o serviço, conte um pouquinho sobre o seu pet e encontre o horário que encaixa na rotina de vocês.</p><div className="appointment-benefits"><span><Check size={16} /> Confirmação imediata</span><span><Check size={16} /> Lembrete no WhatsApp</span><span><Check size={16} /> Busca e leva disponível</span></div><div className="appointment-paw" aria-hidden="true"><PawPrint size={135} /></div></div>
          <div className="booking-panel reveal delay-1">
            {appointmentDone ? <div className="booking-success"><span className="success-check"><Check size={31} /></span><span className="eyebrow"><Sparkles size={15} /> Está marcado!</span><h3>Até já, {appointment.petName || 'amiguinho'}!</h3><p>{appointment.service} com {appointment.professional} no dia {appointment.date}, às {appointment.time}.</p><div className="success-summary"><span><CalendarDays size={17} /> {appointment.date}</span><span><Clock size={17} /> {appointment.time}</span></div><button className="button button-teal" onClick={resetAppointment}>Fazer outro agendamento <ArrowRight size={18} /></button></div> : <>
              <div className="booking-progress" aria-label={`Etapa ${appointmentStep} de 5`}>{[1,2,3,4,5].map((step) => <span key={step} className={step <= appointmentStep ? 'done' : ''}>{step}</span>)}</div>
              <div className="booking-head"><span>Etapa {appointmentStep} de 5</span><h3>{appointmentStep === 1 && 'O que vamos cuidar hoje?'}{appointmentStep === 2 && 'Agora, vamos conhecer seu pet'}{appointmentStep === 3 && 'Quem combina mais com vocês?'}{appointmentStep === 4 && 'Encontre o melhor horário'}{appointmentStep === 5 && 'Confira antes de confirmar'}</h3></div>
              {appointmentStep === 1 && <div className="booking-options service-options">{services.slice(0, 4).map((service) => <button key={service.title} className={appointment.service === service.title ? 'selected' : ''} onClick={() => setAppointment((current) => ({ ...current, service: service.title }))}><span className={`small-service-icon ${service.color}`}><service.icon size={18} /></span><span><strong>{service.title}</strong><small>{service.price}</small></span><span className="selected-dot"><Check size={13} /></span></button>)}</div>}
              {appointmentStep === 2 && <div className="booking-fields"><label><span>Nome do pet</span><input value={appointment.petName} onChange={(event) => setAppointment((current) => ({ ...current, petName: event.target.value }))} placeholder="Ex.: Luna" /></label><label><span>Espécie, raça ou porte</span><input value={appointment.petType} onChange={(event) => setAppointment((current) => ({ ...current, petType: event.target.value }))} placeholder="Ex.: Cachorro de porte médio" /></label><label className="check-field"><input type="checkbox" defaultChecked /><span>Quero receber atualizações e fotos pelo WhatsApp.</span></label></div>}
              {appointmentStep === 3 && <div className="booking-options professional-options">{professionals.map((professional) => <button key={professional.name} className={appointment.professional === professional.name ? 'selected' : ''} onClick={() => setAppointment((current) => ({ ...current, professional: professional.name }))}><span className={`professional-avatar ${professional.color}`}>{professional.initials}</span><span><strong>{professional.name}</strong><small>{professional.role}</small></span><span className="selected-dot"><Check size={13} /></span></button>)}</div>}
              {appointmentStep === 4 && <div className="booking-fields time-fields"><label><span>Data preferida</span><select value={appointment.date} onChange={(event) => setAppointment((current) => ({ ...current, date: event.target.value }))}><option>Sábado, 12 de setembro</option><option>Segunda, 14 de setembro</option><option>Terça, 15 de setembro</option></select></label><div className="time-selector"><span>Horário disponível</span><div>{['09:00','10:30','13:30','15:00'].map((time) => <button key={time} className={appointment.time === time ? 'selected' : ''} onClick={() => setAppointment((current) => ({ ...current, time }))}>{time}</button>)}</div></div><div className="transport-selector"><span>Como ele vai?</span><div>{['Eu levo','Busca e leva'].map((transport) => <button key={transport} className={appointment.transport === transport ? 'selected' : ''} onClick={() => setAppointment((current) => ({ ...current, transport }))}>{transport === 'Busca e leva' ? <Truck size={16} /> : <PawPrint size={16} />} {transport}</button>)}</div></div></div>}
              {appointmentStep === 5 && <div className="booking-review"><div><span>Serviço</span><strong>{appointment.service}</strong></div><div><span>Pet</span><strong>{appointment.petName} · {appointment.petType}</strong></div><div><span>Profissional</span><strong>{appointment.professional}</strong></div><div><span>Quando</span><strong>{appointment.date} · {appointment.time}</strong></div><div><span>Chegada</span><strong>{appointment.transport}</strong></div></div>}
              {appointmentError && <p className="form-error" role="alert">{appointmentError}</p>}
              <div className="booking-actions">{appointmentStep > 1 && <button className="back-button" onClick={() => { setAppointmentStep((step) => step - 1); setAppointmentError('') }}>Voltar</button>}<button className="button button-teal" onClick={advanceAppointment}>{appointmentStep === 5 ? 'Confirmar agendamento' : 'Continuar'} <ArrowRight size={18} /></button></div>
            </>}
          </div>
        </section>

        <section className="pet-profile-section section-space">
          <div className="profile-visual reveal"><div className="profile-photo"><img src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1000&q=85" alt="Luna, cachorro caramelo de porte médio" loading="lazy" /><span className="profile-live"><span /> Perfil atualizado</span></div><div className="profile-tag tag-one"><Heart size={16} fill="currentColor" /> Ama biscoitos</div><div className="profile-tag tag-two"><PawPrint size={16} /> 142 pontos</div></div>
          <div className="profile-content reveal delay-1"><span className="eyebrow"><PawPrint size={15} /> Um cuidado que acompanha</span><h2>Conheça o espaço <i>Meu Pet.</i></h2><p>Em um só lugar, você acompanha a rotina, saúde e os mimos do seu companheiro.</p><div className="pet-panel"><div className="pet-panel-head"><div><span>Meu Pet</span><h3>Luna <small>· SRD caramelo</small></h3></div><button aria-label="Editar perfil de Luna"><ChevronRight size={18} /></button></div><div className="pet-details"><span>3 anos</span><span>12,4 kg</span><span>Alergia a frango</span></div><div className="pet-timeline"><div><span className="timeline-icon coral"><Scissors size={16} /></span><p><strong>Banho & tosa</strong><small>concluído em 05 set</small></p><Check size={17} /></div><div><span className="timeline-icon sun"><Syringe size={16} /></span><p><strong>Próxima vacina</strong><small>V10 · em 22 set</small></p><CalendarDays size={17} /></div><div><span className="timeline-icon blue"><CalendarDays size={16} /></span><p><strong>Próximo horário</strong><small>banho em 12 set, 10:30</small></p><ArrowRight size={17} /></div></div></div></div>
        </section>

        <section className="loyalty-section"><div className="loyalty-copy reveal"><span className="eyebrow eyebrow-light"><Sparkles size={15} /> Clube de patinhas</span><h2>Seu carinho volta em <i>mimos.</i></h2><p>A cada compra e serviço, seu pet acumula pontos para trocar por experiências que ele ama.</p><button className="button button-sun" onClick={() => setToast('Seu saldo de demonstração é de 142 pontos.')}>Ver meus pontos <ArrowRight size={18} /></button></div><div className="loyalty-card reveal delay-1"><div className="loyalty-card-top"><span>Saldo da Luna</span><strong>142 <small>pts</small></strong></div><div className="loyalty-progress"><span style={{ width: '71%' }} /></div><p>Faltam <strong>58 pontos</strong> para o próximo mimo.</p><div className="reward-steps"><div className="unlocked"><span><Check size={15} /></span><strong>5% OFF</strong><small>100 pts</small></div><div className="current"><span>★</span><strong>Brinquedo</strong><small>200 pts</small></div><div><span>♥</span><strong>Banho grátis</strong><small>350 pts</small></div></div></div></section>

        <section className="adoption-section section-space" id="adocao"><div className="section-heading adoption-heading reveal"><div><span className="eyebrow"><Heart size={15} fill="currentColor" /> Adoção responsável</span><h2>Uma nova história <i>pode começar hoje.</i></h2></div><p>Adotar é um encontro para a vida toda. Conheça os pets que estão esperando uma família com tempo, cuidado e afeto.</p></div><div className="adoption-grid reveal delay-1">{adoptionPets.map((pet, index) => <article className={`adoption-card adoption-${index + 1}`} key={pet.name}><img src={pet.image} alt={`${pet.name}, disponível para adoção`} loading="lazy" /><div className="adoption-card-content"><span>{pet.age} · {pet.size}</span><h3>{pet.name}</h3><p>{pet.trait}</p><button onClick={() => setAdoptionPet(pet)}>Quero conhecer <ArrowRight size={17} /></button></div></article>)}</div><div className="adoption-note"><Heart size={18} fill="currentColor" /> Cada adoção passa por uma conversa de compatibilidade. Assim, a chegada fica mais feliz para todo mundo.</div></section>

        <section className="social-proof-section"><div className="metrics-row reveal"><div><strong><CountUp end={8} suffix=" mil+" /></strong><span>pets atendidos</span></div><div><strong><CountUp end={32} suffix=" mil+" /></strong><span>pedidos entregues</span></div><div><strong><CountUp end={12} suffix=" anos" /></strong><span>de experiência</span></div><div><strong>4,9 <Star size={20} fill="currentColor" /></strong><span>média das avaliações</span></div></div><div className="testimonial-wrap section-space"><div className="testimonial-intro reveal"><span className="eyebrow"><Star size={15} fill="currentColor" /> Quem confia, conta</span><h2>Carinho que vira <i>recomendação.</i></h2><button className="round-arrow" onClick={() => setToast('Mais avaliações estarão disponíveis em breve.')} aria-label="Ver mais avaliações"><ArrowRight size={19} /></button></div><div className="testimonial-card reveal delay-1"><div className="quote-mark">“</div><p>O cuidado com a Luna sempre me deixa tranquila. Eles avisam cada etapa, mandam foto e ela volta feliz, cheirosa e com a bandana mais linda.</p><div className="testimonial-author"><span className="author-avatar">CM</span><div><strong>Camila Martins</strong><span>Tutora da Luna</span></div><div className="stars" aria-label="5 estrelas">{[1,2,3,4,5].map((star) => <Star key={star} size={14} fill="currentColor" />)}</div></div></div></div></section>

        <section className="about-section section-space" id="sobre"><div className="about-photo reveal"><img src="https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=85" alt="Profissional acolhendo um cão em um ambiente confortável" loading="lazy" /><div className="about-photo-label"><PawPrint size={18} /><span>Desde 2014,<br />por mais bem-estar.</span></div></div><div className="about-copy reveal delay-1"><span className="eyebrow"><PawPrint size={15} /> De pet lovers para pet lovers</span><h2>Mais que uma pet shop: uma extensão do <i>seu cuidado.</i></h2><p>A Pata & Companhia nasceu pequena, com uma prateleira de produtos e uma vontade enorme de tornar o dia a dia de cada família mais leve.</p><p>Hoje somos uma equipe de veterinários, tosadores, cuidadores e apaixonados por animais que acredita em atendimento próximo, seguro e cheio de verdade.</p><div className="values-list"><div><span><Heart size={18} fill="currentColor" /></span><p><strong>Carinho sem pressa</strong><small>respeitamos o tempo de cada pet.</small></p></div><div><span><Check size={18} /></span><p><strong>Segurança em cada detalhe</strong><small>equipe treinada e ambiente preparado.</small></p></div></div><button className="text-link" onClick={() => goTo('contato')}>Venha nos visitar <ArrowRight size={18} /></button></div></section>

        <section className="contact-section" id="contato"><div className="contact-details reveal"><span className="eyebrow eyebrow-light"><MapPin size={15} /> Perto de você</span><h2>Passa aqui.<br /><i>Tem café, petisco e afeto.</i></h2><div className="contact-list"><div><MapPin size={19} /><p><strong>Rua das Acácias, 142</strong><span>Jardim das Patas · Rio de Janeiro, RJ</span></p></div><div><Clock size={19} /><p><strong>Seg a sex · 8h às 19h</strong><span>Sábado · 9h às 17h</span></p></div><div><Phone size={19} /><p><strong>(21) 99999-2345</strong><span>Atendimento e agendamentos</span></p></div></div><div className="map-card" aria-label="Mapa ilustrativo da localização da loja"><div className="map-road road-one" /><div className="map-road road-two" /><div className="map-park park-one" /><div className="map-park park-two" /><span className="map-pin"><PawPrint size={22} /></span><span className="map-label">Pata & Companhia</span></div></div><form className="contact-form reveal delay-1" onSubmit={submitContact}><span className="eyebrow"><MessageCircle size={15} /> Fale com a gente</span><h3>Como podemos ajudar?</h3><label><span>Seu nome</span><input value={contact.name} onChange={(event) => setContact((current) => ({ ...current, name: event.target.value }))} placeholder="Como podemos te chamar?" /></label><label><span>Seu e-mail</span><input type="email" value={contact.email} onChange={(event) => setContact((current) => ({ ...current, email: event.target.value }))} placeholder="voce@email.com" /></label><label><span>Mensagem</span><textarea value={contact.message} onChange={(event) => setContact((current) => ({ ...current, message: event.target.value }))} placeholder="Conte um pouquinho do que você precisa" rows={4} /></label>{contactState === 'error' && <p className="form-error" role="alert">Preencha os três campos para enviar sua mensagem.</p>}{contactState === 'success' && <p className="form-success" role="status"><Check size={16} /> Mensagem recebida! Retornaremos em breve.</p>}<button className="button button-coral" type="submit">Enviar mensagem <ArrowRight size={18} /></button></form></section>
      </main>

      <footer className="site-footer"><div className="footer-top"><div className="footer-brand"><button className="brand brand-light" onClick={() => goTo('inicio')}><span className="brand-mark"><PawPrint size={23} strokeWidth={2.6} /></span><span><strong>Pata</strong><em>& Companhia</em></span></button><p>O seu ponto de apoio para uma vida mais leve, saudável e feliz ao lado do seu pet.</p><div className="social-links"><a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><AtSign size={18} /></a><a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><MessageCircle size={18} /></a><a href="mailto:oi@pataecompanhia.com.br" aria-label="E-mail"><Mail size={18} /></a></div></div><div className="footer-links"><div><strong>Atalhos</strong>{navLinks.slice(0,4).map((link) => <button key={link.id} onClick={() => goTo(link.id)}>{link.label}</button>)}</div><div><strong>Para você</strong><button onClick={() => goTo('adocao')}>Adoção responsável</button><button onClick={() => goTo('agendamento')}>Meu agendamento</button><button onClick={() => setToast('O Clube de Patinhas é gratuito para clientes cadastrados.')}>Clube de patinhas</button></div><div><strong>Atendimento</strong><button onClick={() => goTo('contato')}>Fale conosco</button><button onClick={() => goTo('contato')}>Entrega e regiões</button><button onClick={() => setToast('Estamos preparando a página de dúvidas frequentes.')}>Dúvidas frequentes</button></div></div></div><div className="footer-bottom"><span>© 2026 Pata & Companhia. Feito para quem ama cuidar.</span><div><button onClick={() => setToast('Política de privacidade: este é um MVP demonstrativo.')}>Privacidade</button><button onClick={() => setToast('Termos de uso: este é um MVP demonstrativo.')}>Termos de uso</button><span className="payment-icons"><b>VISA</b><b>PIX</b><b>elo</b></span></div></div></footer>

      <a className="whatsapp-button" href="https://wa.me/5521999992345?text=Ol%C3%A1!%20Quero%20falar%20sobre%20a%20Pata%20%26%20Companhia." target="_blank" rel="noreferrer" aria-label="Conversar pelo WhatsApp"><MessageCircle size={24} /> <span>Fale conosco</span></a>
      {toast && <div className="toast" role="status"><Check size={18} /> {toast}</div>}

      {isSearchOpen && <div className="modal-backdrop" onMouseDown={() => setIsSearchOpen(false)}><div className="search-modal" role="dialog" aria-modal="true" aria-label="Buscar produtos" onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setIsSearchOpen(false)} aria-label="Fechar busca"><X size={20} /></button><span className="eyebrow"><Search size={15} /> Busca rápida</span><h2>O que seu pet está procurando?</h2><div className="modal-search-input"><Search size={20} /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ex.: ração, brinquedo, gato..." /></div><div className="search-suggestions"><span>Mais buscados:</span>{['Rações','Petiscos','Gatos'].map((term) => <button key={term} onClick={() => { setQuery(term); setActiveCategory('Todos'); setIsSearchOpen(false); goTo('loja') }}>{term}</button>)}</div></div></div>}
      {activeService && <div className="modal-backdrop" onMouseDown={() => setActiveService(null)}><div className="service-modal" role="dialog" aria-modal="true" aria-label={`Detalhes do serviço ${activeService.title}`} onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setActiveService(null)} aria-label="Fechar"><X size={20} /></button><span className={`modal-service-icon ${activeService.color}`}><activeService.icon size={30} /></span><span className="eyebrow">Cuidado sob medida</span><h2>{activeService.title}</h2><p>{activeService.description}</p><div className="modal-service-info"><span><Clock size={17} /> {activeService.duration}</span><span><Sparkles size={17} /> {activeService.price}</span></div><button className="button button-coral" onClick={() => selectService(activeService.title)}>Escolher este serviço <ArrowRight size={18} /></button></div></div>}
      {adoptionPet && <div className="modal-backdrop" onMouseDown={() => setAdoptionPet(null)}><div className="adoption-modal" role="dialog" aria-modal="true" aria-label={`Conhecer ${adoptionPet.name}`} onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setAdoptionPet(null)} aria-label="Fechar"><X size={20} /></button><img src={adoptionPet.image} alt="" /><div><span className="eyebrow"><Heart size={15} fill="currentColor" /> Adoção responsável</span><h2>Você e {adoptionPet.name} podem se conhecer.</h2><p>Vamos organizar uma conversa tranquila para entender a rotina da sua família e preparar uma visita cheia de carinho.</p><button className="button button-teal" onClick={() => { setAdoptionPet(null); setToast(`Recebemos seu interesse em conhecer ${adoptionPet.name}!`) }}>Tenho interesse <ArrowRight size={18} /></button></div></div></div>}
      {isCartOpen && <div className="cart-overlay" onMouseDown={() => setIsCartOpen(false)}><aside className="cart-drawer" aria-label="Seu carrinho" onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setIsCartOpen(false)} aria-label="Fechar carrinho"><X size={20} /></button>{orderComplete ? <div className="cart-success"><span className="success-check"><Check size={29} /></span><h2>Pedido encaminhado!</h2><p>Seu pedido está separado. Vamos confirmar os detalhes pelo WhatsApp em instantes.</p><button className="button button-teal" onClick={() => { setIsCartOpen(false); setCart([]) }}>Continuar navegando <ArrowRight size={18} /></button></div> : <><div className="cart-head"><span>Seu carrinho</span><h2>{cartQuantity} {cartQuantity === 1 ? 'item' : 'itens'} para o seu pet</h2></div>{cart.length === 0 ? <div className="empty-cart"><span><ShoppingBag size={31} /></span><h3>Seu carrinho está esperando</h3><p>Encontre um mimo ou uma necessidade para o seu melhor amigo.</p><button onClick={() => { setIsCartOpen(false); goTo('loja') }}>Ir para a loja <ArrowRight size={17} /></button></div> : <><div className="cart-items">{cart.map((item) => <article key={item.id} className="cart-item"><img src={item.image} alt="" /><div><h3>{item.name}</h3><strong>{formatCurrency(item.price)}</strong><div className="cart-quantity"><button onClick={() => changeQuantity(item.id, -1)} aria-label={`Diminuir ${item.name}`}><Minus size={14} /></button><span>{item.qty}</span><button onClick={() => changeQuantity(item.id, 1)} aria-label={`Aumentar ${item.name}`}><Plus size={14} /></button></div></div><button className="remove-item" onClick={() => setCart((items) => items.filter((cartItem) => cartItem.id !== item.id))} aria-label={`Remover ${item.name}`}><Trash2 size={17} /></button></article>)}</div><div className="cart-footer"><div><span>Subtotal</span><strong>{formatCurrency(subtotal)}</strong></div><small>Frete calculado no próximo passo.</small><button className="button button-coral" onClick={() => setOrderComplete(true)}>Finalizar pedido <ArrowRight size={18} /></button></div></>}</>}</aside></div>}
    </div>
  )
}

export default App
