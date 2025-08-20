import { Head, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { 
    ArrowRight, 
    CheckCircle, 
    Star, 
    Users, 
    Award, 
    TrendingUp,
    Phone,
    Mail,
    MapPin,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Youtube,
    ShoppingCart,
    Target,
    BarChart3,
    Globe,
    Shield,
    Zap,
    CheckSquare,
    Headphones,
    Clock
} from 'lucide-react';

interface Settings {
    app_name: string;
    logo_light: string;
    logo_dark: string;
    favicon: string;
    mobile_number: string;
    whatsApp_number: string;
    email: string;
    support_email: string;
    address: string;
    facebook_url: string;
    twitter_url: string;
    instagram_url: string;
    youtube_url: string;
    linkedin_url: string;
    theme_color: string;
    meta_title: string;
    meta_description: string;
}

interface WelcomeProps {
    settings: Settings;
}

export default function Welcome({ settings }: WelcomeProps) {
    // Provide default values if settings is undefined
    const defaultSettings = {
        app_name: 'One One Solution',
        logo_light: '/assets/logo_light.png',
        logo_dark: '/assets/logo_dark.png',
        favicon: '/assets/favicon.png',
        mobile_number: '+91-7999662009',
        whatsApp_number: '+91-7999662009',
        email: 'info@oneonesolution.com',
        support_email: 'support@oneonesolution.com',
        address: 'One One Solutions',
        facebook_url: '',
        twitter_url: '',
        instagram_url: '',
        youtube_url: '',
        linkedin_url: '',
        theme_color: '#FF2D20',
        meta_title: 'One One Solution - Amazon Account Management Services',
        meta_description: 'Professional Amazon account management services in India. We manage 100+ seller accounts with expert team.'
    };

    // Use settings if available, otherwise use defaults
    const currentSettings = settings || defaultSettings;
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
        service: ''
    });

    useEffect(() => {
        setIsVisible(true);
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % 3);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/enquiry', {
            onSuccess: () => {
                reset();
            }
        });
    };

    const heroSlides = [
        {
            title: "Amazon Account Management",
            subtitle: "Professional Amazon Services in India",
            description: "We manage Amazon accounts for 100+ sellers with 20+ experienced associates",
            bgClass: "bg-gradient-to-br from-red-600 via-red-700 to-red-800"
        },
        {
            title: "Complete E-commerce Solutions",
            subtitle: "From Setup to Success",
            description: "End-to-end Amazon services including cataloging, advertising, and account management",
            bgClass: "bg-gradient-to-br from-red-700 via-red-800 to-red-900"
        },
        {
            title: "Boost Your Sales",
            subtitle: "Optimize for Maximum Growth",
            description: "Professional catalog optimization and sponsored advertising to maximize your ROI",
            bgClass: "bg-gradient-to-br from-red-800 via-red-900 to-red-950"
        }
    ];

    const services = [
        {
            icon: ShoppingCart,
            title: "Amazon Registration",
            description: "Complete seller account setup and registration process",
            features: ["Account verification", "Documentation", "Compliance check"],
            color: "from-red-500 to-red-600"
        },
        {
            icon: Target,
            title: "Account Setup",
            description: "Professional account configuration and optimization",
            features: ["Profile setup", "Payment integration", "Shipping setup"],
            color: "from-orange-500 to-orange-600"
        },
        {
            icon: BarChart3,
            title: "Imaging Services",
            description: "High-quality product photography and editing",
            features: ["Product shoots", "Model shoots", "Professional editing"],
            color: "from-yellow-500 to-yellow-600"
        },
        {
            icon: Globe,
            title: "Catalog Management",
            description: "Comprehensive listing and catalog optimization",
            features: ["Product titles", "Descriptions", "SEO optimization"],
            color: "from-green-500 to-green-600"
        },
        {
            icon: Shield,
            title: "Account Management",
            description: "Day-to-day operations and maintenance",
            features: ["Customer service", "Order processing", "Account health"],
            color: "from-blue-500 to-blue-600"
        },
        {
            icon: Zap,
            title: "Web Services",
            description: "Complete digital presence solutions",
            features: ["Website design", "SEO services", "Digital marketing"],
            color: "from-purple-500 to-purple-600"
        }
    ];

    const stats = [
        { number: "100+", label: "Amazon Sellers", icon: Users, color: "text-red-600" },
        { number: "20+", label: "Team Members", icon: Award, color: "text-orange-600" },
        { number: "5+", label: "Years Experience", icon: Clock, color: "text-yellow-600" },
        { number: "24/7", label: "Support", icon: Headphones, color: "text-green-600" }
    ];

    const testimonials = [
        {
            name: "Mr. Josef Desoja",
            position: "Director of Demo Company",
            content: "One One Solution has transformed our Amazon business. Their professional approach and attention to detail have helped us achieve remarkable growth in sales and account health.",
            rating: 5,
            avatar: "JD"
        },
        {
            name: "Rahul Infotech",
            position: "Technology Company",
            content: "The team at One One Solution is exceptional. They handle everything professionally and have significantly improved our Amazon presence.",
            rating: 5,
            avatar: "RI"
        },
        {
            name: "Manorama Jewellers",
            position: "Jewellery Business",
            content: "Outstanding service quality and results. Our Amazon sales have increased by 300% since partnering with One One Solution.",
            rating: 5,
            avatar: "MJ"
        }
    ];

    const features = [
        {
            icon: CheckSquare,
            title: "Professional Team",
            description: "20+ B-School graduates managing your accounts"
        },
        {
            icon: CheckSquare,
            title: "Proven Track Record",
            description: "100+ successful Amazon seller accounts"
        },
        {
            icon: CheckSquare,
            title: "24/7 Support",
            description: "Round-the-clock customer service and support"
        },
        {
            icon: CheckSquare,
            title: "Cost Effective",
            description: "Affordable solutions for businesses of all sizes"
        }
    ];

    return (
        <>
            <Head title={currentSettings.meta_title}>
                <meta name="description" content={currentSettings.meta_description} />
                <link rel="icon" href={currentSettings.favicon} />
            </Head>
            
            {/* Hero Section */}
            <section className="relative min-h-screen overflow-hidden">
                {/* Background with animated gradient */}
                <div className={`absolute inset-0 ${heroSlides[currentSlide].bgClass} transition-all duration-1000`}>
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
                </div>
                
                {/* Navigation */}
                <nav className="relative z-10 px-6 py-6 lg:px-8">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <img 
                                src={currentSettings.logo_light} 
                                alt={currentSettings.app_name}
                                className="h-12 w-auto"
                            />
                            <span className="text-white font-bold text-xl hidden sm:block">{currentSettings.app_name}</span>
                        </div>
                        
                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#services" className="text-white hover:text-red-200 transition-colors font-medium">Services</a>
                            <a href="#about" className="text-white hover:text-red-200 transition-colors font-medium">About</a>
                            <a href="#contact" className="text-white hover:text-red-200 transition-colors font-medium">Contact</a>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-white p-2"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>

                        <a 
                            href="/login" 
                            className="bg-white text-red-600 px-6 py-2 rounded-lg font-semibold hover:bg-red-50 transition-colors hidden sm:block"
                        >
                            Admin Login
                        </a>
                    </div>

                    {/* Mobile Menu */}
                    {isMenuOpen && (
                        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg">
                            <div className="px-6 py-4 space-y-4">
                                <a href="#services" className="block text-gray-900 hover:text-red-600 font-medium">Services</a>
                                <a href="#about" className="block text-gray-900 hover:text-red-600 font-medium">About</a>
                                <a href="#contact" className="block text-gray-900 hover:text-red-600 font-medium">Contact</a>
                                <a href="/login" className="block text-red-600 font-semibold">Admin Login</a>
                            </div>
                        </div>
                    )}
                </nav>

                {/* Hero Content */}
                <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-6">
                    <div className="text-center max-w-5xl mx-auto">
                        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                                {heroSlides[currentSlide].title}
                            </h1>
                            <p className="text-2xl md:text-3xl text-red-100 mb-4 font-medium">
                                {heroSlides[currentSlide].subtitle}
                            </p>
                            <p className="text-lg md:text-xl text-red-200 mb-8 max-w-3xl mx-auto">
                                {heroSlides[currentSlide].description}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a 
                                    href="#services" 
                                    className="bg-white text-red-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-red-50 transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
                                >
                                    Explore Services <ArrowRight className="w-5 h-5" />
                                </a>
                                <a 
                                    href="#contact" 
                                    className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-red-600 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                                >
                                    Get Started
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Slide Indicators */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
                    {[0, 1, 2].map((index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all ${
                                currentSlide === index ? 'bg-white scale-125' : 'bg-white/50'
                            }`}
                        />
                    ))}
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div 
                                key={index}
                                className="text-center group"
                            >
                                <div className={`text-4xl md:text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300 ${stat.color}`}>
                                    {stat.number}
                                </div>
                                <div className="text-gray-600 font-medium flex items-center justify-center gap-2">
                                    <stat.icon className="w-5 h-5" />
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Our Services
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Comprehensive Amazon services to help your business grow and succeed in the competitive e-commerce landscape.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div 
                                key={index}
                                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
                            >
                                <div className={`p-4 rounded-2xl bg-gradient-to-r ${service.color} mb-6 w-fit group-hover:scale-110 transition-transform duration-300`}>
                                    <service.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                                <p className="text-gray-600 mb-6">{service.description}</p>
                                <ul className="space-y-3">
                                    {service.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-center gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                            <span className="text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                                About {currentSettings.app_name}
                            </h2>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                One One Solution is a team of 20+ associates, managing Amazon accounts for more than 100 sellers on Amazon.in and more than 10 sellers on Amazon.com. We are one stop shop for all Amazon services including Cataloguing, Enhanced Brand Content, Sponsored Advertising Optimization etc.
                            </p>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                Our team owns amazon portal management for sellers so that they can focus on more important activities of their business. We ensure that your account is in good health, catalog is optimized to deliver good organic & paid sales and sponsored ads are maximizing sales at optimal ACoS.
                            </p>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {features.map((feature, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className="p-2 bg-red-100 rounded-lg">
                                            <feature.icon className="w-5 h-5 text-red-600" />
                                        </div>
                                        <span className="text-gray-700 font-medium">{feature.title}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-gradient-to-br from-red-500 to-red-700 rounded-3xl p-8 text-white shadow-2xl">
                                <div className="text-center">
                                    <TrendingUp className="w-16 h-16 mx-auto mb-4" />
                                    <h3 className="text-2xl font-bold mb-4">Why Choose Us?</h3>
                                    <ul className="text-left space-y-3">
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="w-5 h-5 text-green-300" />
                                            <span>Professional account management</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="w-5 h-5 text-green-300" />
                                            <span>24/7 customer support</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="w-5 h-5 text-green-300" />
                                            <span>Proven track record</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="w-5 h-5 text-green-300" />
                                            <span>Cost-effective solutions</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            What Our Clients Say
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Don't just take our word for it. Here's what our satisfied clients have to say about our services.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div 
                                key={index}
                                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                            >
                                <div className="flex items-center mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                                        <span className="text-red-600 font-semibold text-sm">{testimonial.avatar}</span>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">{testimonial.name}</div>
                                        <div className="text-gray-500 text-sm">{testimonial.position}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 bg-gradient-to-br from-red-600 via-red-700 to-red-800">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Get In Touch
                        </h2>
                        <p className="text-xl text-red-100 max-w-3xl mx-auto">
                            Ready to take your Amazon business to the next level? Contact us today for a free consultation.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-8">Contact Information</h3>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-red-700 rounded-lg flex items-center justify-center">
                                        <MapPin className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <div className="text-white font-semibold">Head Office</div>
                                        <div className="text-red-200">{currentSettings.address}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-red-700 rounded-lg flex items-center justify-center">
                                        <Phone className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <div className="text-white font-semibold">Phone</div>
                                        <div className="text-red-200">{currentSettings.mobile_number}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-red-700 rounded-lg flex items-center justify-center">
                                        <Mail className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <div className="text-white font-semibold">Email</div>
                                        <div className="text-red-200">{currentSettings.email}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Social Media */}
                            <div className="mt-8">
                                <h4 className="text-white font-semibold mb-4">Follow Us</h4>
                                <div className="flex space-x-4">
                                    {currentSettings.facebook_url && (
                                        <a href={currentSettings.facebook_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-red-700 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors">
                                            <Facebook className="w-5 h-5 text-white" />
                                        </a>
                                    )}
                                    {currentSettings.twitter_url && (
                                        <a href={currentSettings.twitter_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-red-700 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors">
                                            <Twitter className="w-5 h-5 text-white" />
                                        </a>
                                    )}
                                    {currentSettings.instagram_url && (
                                        <a href={currentSettings.instagram_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-red-700 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors">
                                            <Instagram className="w-5 h-5 text-white" />
                                        </a>
                                    )}
                                    {currentSettings.linkedin_url && (
                                        <a href={currentSettings.linkedin_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-red-700 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors">
                                            <Linkedin className="w-5 h-5 text-white" />
                                        </a>
                                    )}
                                    {currentSettings.youtube_url && (
                                        <a href={currentSettings.youtube_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-red-700 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors">
                                            <Youtube className="w-5 h-5 text-white" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-8 shadow-2xl">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="First Name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                            required
                                        />
                                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Company Name"
                                            value={data.company}
                                            onChange={(e) => setData('company', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        required
                                    />
                                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                                </div>
                                <div>
                                    <input
                                        type="tel"
                                        placeholder="Phone Number"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <select
                                        value={data.service}
                                        onChange={(e) => setData('service', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    >
                                        <option value="">Select a Service</option>
                                        <option value="amazon-registration">Amazon Registration</option>
                                        <option value="account-setup">Account Setup</option>
                                        <option value="imaging-services">Imaging Services</option>
                                        <option value="catalog-management">Catalog Management</option>
                                        <option value="account-management">Account Management</option>
                                        <option value="web-services">Web Services</option>
                                    </select>
                                </div>
                                <div>
                                    <textarea
                                        placeholder="Your Message"
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        rows={4}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        required
                                    ></textarea>
                                    {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                                </div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-3 mb-4">
                                <img 
                                    src={currentSettings.logo_dark} 
                                    alt={currentSettings.app_name}
                                    className="h-10 w-auto"
                                />
                                <span className="text-white font-bold text-lg">{currentSettings.app_name}</span>
                            </div>
                            <p className="text-gray-400 mb-4">
                                Professional Amazon account management services to help your business grow and succeed.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Services</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li>Amazon Registration</li>
                                <li>Account Setup</li>
                                <li>Imaging Services</li>
                                <li>Catalog Management</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                                <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Contact Info</h4>
                            <div className="space-y-2 text-gray-400">
                                <div>{currentSettings.mobile_number}</div>
                                <div>{currentSettings.email}</div>
                                <div>{currentSettings.address}</div>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 {currentSettings.app_name}. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </>
    );
}
