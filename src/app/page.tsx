'use client';

import { useState, useEffect } from 'react';

const packages = {
  basic: {
    name: 'Basic Package',
    amount: '1,450',
    price: '$10',
    currency: 'USDT',
    features: ['Instant Processing', 'Secure Transaction', '24/7 Support', '6 months validity']
  },
  popular: {
    name: 'Popular Package',
    amount: '4,670',
    price: '$44',
    currency: 'USDT',
    features: ['Instant Processing', 'Secure Transaction', '24/7 Support', '6 months validity']
  },
  premium: {
    name: 'Premium Package',
    amount: '7,890',
    price: '$35',
    currency: 'USDT',
    discount: 'Special Discount!',
    features: ['Instant Processing', 'Secure Transaction', '24/7 Support', '6 months validity']
  },
  mega: {
    name: 'Mega Package',
    amount: '13,000',
    price: '$99',
    originalPrice: '$149',
    currency: 'USDT',
    discount: 'Save $50',
    features: ['Instant Processing', 'Secure Transaction', '24/7 Support', '6 months validity']
  }
};

export default function Home() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<'info' | 'payment' | 'confirmation'>('info');
  const [formData, setFormData] = useState({
    walletAddress: '',
    email: '',
    telegram: '',
    transactionHash: ''
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);

  const paymentAddress = '0x729dc013c490a541a0365a73611b1f40b3186ce2';

  const openModal = (packageType: string) => {
    setSelectedPackage(packageType);
    setCurrentStep('info');
    setIsModalOpen(true);
    setErrors([]);
    setFormData({ walletAddress: '', email: '', telegram: '', transactionHash: '' });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPackage(null);
    setCurrentStep('info');
    setFormData({ walletAddress: '', email: '', telegram: '', transactionHash: '' });
    setErrors([]);
  };

  const validateInfoForm = () => {
    const newErrors: string[] = [];
    
    if (!formData.walletAddress.trim()) {
      newErrors.push('Please enter your BNB wallet address');
    } else if (!/^0x[a-fA-F0-9]{40}$/.test(formData.walletAddress.trim())) {
      newErrors.push('Please enter a valid BNB wallet address');
    }
    
    if (!formData.email.trim()) {
      newErrors.push('Please enter your email address');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.push('Please enter a valid email address');
    }
    
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const validateTransactionHash = () => {
    const newErrors: string[] = [];
    
    if (!formData.transactionHash.trim()) {
      newErrors.push('Please enter your transaction hash');
    } else if (!/^0x[a-fA-F0-9]{64}$/.test(formData.transactionHash.trim())) {
      newErrors.push('Invalid payment hash');
    }
    
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 'info' && validateInfoForm()) {
      const pkg = packages[selectedPackage as keyof typeof packages];
      setOrderData({
        ...pkg,
        userWallet: formData.walletAddress,
        email: formData.email,
        telegram: formData.telegram
      });
      setCurrentStep('payment');
      setErrors([]);
    } else if (currentStep === 'payment' && validateTransactionHash()) {
      setCurrentStep('confirmation');
      setErrors([]);
    }
  };

  const handleConfirmOrder = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      closeModal();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    }, 2000);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-200">
        <nav className="container mx-auto px-5 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img 
                src="https://i.postimg.cc/25yK8Hcy/1000051467-removebg-preview.png" 
                alt="Flash USDT Logo" 
                className="w-10 h-10 object-contain"
              />
              <span className="text-xl font-bold text-green-600">Flash USDT</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8">
              <button onClick={() => scrollToSection('packages')} className="text-gray-700 hover:text-green-600 font-medium transition-colors">
                Packages
              </button>
              <button onClick={() => scrollToSection('how-it-works')} className="text-gray-700 hover:text-green-600 font-medium transition-colors">
                How It Works
              </button>
              <a 
                href="https://t.me/flasherusdtsupport_bot" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-green-600 font-medium transition-colors flex items-center gap-2"
              >
                <i className="fab fa-telegram"></i>
                Contact
              </a>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex flex-col gap-1"
            >
              <span className={`w-6 h-0.5 bg-gray-700 transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-gray-700 transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-gray-700 transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </button>
          </div>
          
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-col gap-4">
                <button onClick={() => scrollToSection('packages')} className="text-gray-700 hover:text-green-600 font-medium transition-colors text-left">
                  Packages
                </button>
                <button onClick={() => scrollToSection('how-it-works')} className="text-gray-700 hover:text-green-600 font-medium transition-colors text-left">
                  How It Works
                </button>
                <a 
                  href="https://t.me/flasherusdtsupport_bot" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-green-600 font-medium transition-colors text-left flex items-center gap-2"
                >
                  <i className="fab fa-telegram"></i>
                  Contact
                </a>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-green-500 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-green-400 rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-green-300 rounded-full"></div>
        </div>
        
        <div className="container mx-auto px-5 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                  Flash USDT
                </span>{' '}
                Services
              </h1>
              <p className="text-xl text-gray-600 mb-8">Professional, Secure & Fast USDT Flashing</p>
              
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2 text-green-600">
                  <i className="fas fa-shield-alt"></i>
                  <span className="font-medium">100% Secure</span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <i className="fas fa-bolt"></i>
                  <span className="font-medium">Instant Flash</span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <i className="fas fa-headset"></i>
                  <span className="font-medium">24/7 Support</span>
                </div>
              </div>
              
              <button 
                onClick={() => scrollToSection('packages')}
                className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all hover:-translate-y-1 inline-flex items-center gap-2"
              >
                <span>View Packages</span>
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
            
            <div className="flex justify-center">
              <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-8 rounded-2xl shadow-xl">
                <i className="fas fa-coins text-5xl mb-4"></i>
                <div className="text-2xl font-bold">USDT</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-20 bg-white">
        <div className="container mx-auto px-5">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Package</h2>
            <p className="text-xl text-gray-600">Competitive rates with special discounts available</p>
          </div>
          
          {/* BNB Network Warning */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-8 max-w-2xl mx-auto">
            <div className="flex items-center gap-3 text-yellow-800">
              <i className="fas fa-exclamation-triangle text-2xl"></i>
              <div>
                <h4 className="font-semibold">Important Notice</h4>
                <p className="text-sm">Only BNB network is supported for payment and receive.</p>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Basic Package */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-green-600 transition-all hover:-translate-y-2 hover:shadow-lg">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-4">Basic Package</h3>
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-star text-white text-xl"></i>
                </div>
              </div>
              
              <div className="text-center mb-6">
                <div className="text-gray-600 mb-2">USDT</div>
                <div className="text-3xl font-bold text-green-600 mb-4">1,450</div>
                <div className="text-2xl font-bold">$10</div>
              </div>
              
              <ul className="space-y-3 mb-6">
                {packages.basic.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <i className="fas fa-check text-green-600"></i>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() => openModal('basic')}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold hover:shadow-md transition-all"
              >
                Select Package
              </button>
            </div>

            {/* Popular Package */}
            <div className="bg-white border-2 border-orange-400 rounded-xl p-6 hover:border-orange-500 transition-all hover:-translate-y-2 hover:shadow-lg relative md:scale-105">
              <div className="absolute -top-3 right-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-4">Popular Package</h3>
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-crown text-white text-xl"></i>
                </div>
              </div>
              
              <div className="text-center mb-6">
                <div className="text-gray-600 mb-2">USDT</div>
                <div className="text-3xl font-bold text-green-600 mb-4">4,670</div>
                <div className="text-2xl font-bold">$44</div>
              </div>
              
              <ul className="space-y-3 mb-6">
                {packages.popular.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <i className="fas fa-check text-green-600"></i>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() => openModal('popular')}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold hover:shadow-md transition-all"
              >
                Select Package
              </button>
            </div>

            {/* Premium Package */}
            <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl p-6 hover:border-green-600 transition-all hover:-translate-y-2 hover:shadow-lg">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-4">Premium Package</h3>
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-gem text-white text-xl"></i>
                </div>
              </div>
              
              <div className="text-center mb-6">
                <div className="text-gray-600 mb-2">USDT</div>
                <div className="text-3xl font-bold text-green-600 mb-4">7,890</div>
                <div className="text-2xl font-bold">$35</div>
                <div className="text-orange-500 font-semibold">Special Discount!</div>
              </div>
              
              <ul className="space-y-3 mb-6">
                {packages.premium.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <i className="fas fa-check text-green-600"></i>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() => openModal('premium')}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold hover:shadow-md transition-all"
              >
                Select Package
              </button>
            </div>
          </div>

          {/* Special Offer */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-white rounded-full"></div>
              <div className="absolute -bottom-20 -left-20 w-32 h-32 bg-white rounded-full"></div>
            </div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-4">
                <i className="fas fa-fire"></i>
                <span className="font-semibold">Limited Time Offer</span>
              </div>
              
              <h3 className="text-2xl font-bold mb-6">Mega Package</h3>
              
              <div className="mb-6">
                <div className="text-gray-200 mb-2">USDT</div>
                <div className="text-4xl font-bold mb-4">13,000</div>
                <div className="flex items-center justify-center gap-4">
                  <span className="text-xl line-through opacity-70">$149</span>
                  <span className="text-3xl font-bold">$99</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Save $50</span>
                </div>
              </div>
              
              <button 
                onClick={() => openModal('mega')}
                className="bg-white text-orange-600 px-8 py-3 rounded-lg font-bold hover:shadow-lg transition-all hover:-translate-y-1"
              >
                Get Mega Deal
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="container mx-auto px-5">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple 3-step process to flash USDT</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative mb-6">
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  1
                </div>
                <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto">
                  <i className="fas fa-shopping-cart text-white text-2xl"></i>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Choose Package</h3>
              <p className="text-gray-600">Select the USDT package that best fits your needs</p>
            </div>
            
            <div className="text-center">
              <div className="relative mb-6">
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  2
                </div>
                <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto">
                  <i className="fas fa-wallet text-white text-2xl"></i>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Provide Details</h3>
              <p className="text-gray-600">Submit your BNB wallet address and email for support</p>
            </div>
            
            <div className="text-center">
              <div className="relative mb-6">
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  3
                </div>
                <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto">
                  <i className="fas fa-bolt text-white text-2xl"></i>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Instant Flash</h3>
              <p className="text-gray-600">Receive your USDT instantly after payment confirmation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-5">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="https://i.postimg.cc/25yK8Hcy/1000051467-removebg-preview.png" 
                  alt="Flash USDT Logo" 
                  className="w-10 h-10 object-contain"
                />
                <span className="text-xl font-bold">Flash USDT</span>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                <li><a href="#packages" className="text-gray-400 hover:text-green-600 transition-colors">USDT Flashing</a></li>
                <li><a href="#packages" className="text-gray-400 hover:text-green-600 transition-colors">Package Deals</a></li>
                <li><a href="#how-it-works" className="text-gray-400 hover:text-green-600 transition-colors">How It Works</a></li>
              </ul>
            </div>
            
            <div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© 2025 Flash USDT. All rights reserved.</p>
            <div className="mt-4">
              <a 
                href="https://t.me/flasherusdtsupport_bot" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-colors"
              >
                <i className="fab fa-telegram"></i>
                <span>@flasherusdtsupport_bot</span>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Order Modal */}
      {isModalOpen && selectedPackage && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">
                  {currentStep === 'info' && 'Complete Your Order'}
                  {currentStep === 'payment' && 'Payment Required'}
                  {currentStep === 'confirmation' && 'Confirm Order'}
                </h3>
                <button 
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              
              {/* Progress Steps */}
              <div className="flex items-center justify-between mt-4">
                <div className={`flex items-center ${currentStep === 'info' ? 'text-green-600' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${currentStep === 'info' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>
                    1
                  </div>
                  <span className="ml-2 text-sm">Info</span>
                </div>
                <div className={`flex-1 h-1 mx-2 ${currentStep === 'payment' || currentStep === 'confirmation' ? 'bg-green-600' : 'bg-gray-200'}`}></div>
                <div className={`flex items-center ${currentStep === 'payment' ? 'text-green-600' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${currentStep === 'payment' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>
                    2
                  </div>
                  <span className="ml-2 text-sm">Payment</span>
                </div>
                <div className={`flex-1 h-1 mx-2 ${currentStep === 'confirmation' ? 'bg-green-600' : 'bg-gray-200'}`}></div>
                <div className={`flex items-center ${currentStep === 'confirmation' ? 'text-green-600' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${currentStep === 'confirmation' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>
                    3
                  </div>
                  <span className="ml-2 text-sm">Confirm</span>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              {/* Step 1: User Information */}
              {currentStep === 'info' && (
                <>
                  <div className="bg-gray-50 rounded-lg p-4 mb-6 text-center">
                    <h4 className="font-semibold mb-2">Selected Package:</h4>
                    <div className="text-lg font-bold text-green-600">{packages[selectedPackage as keyof typeof packages].name}</div>
                    <div className="text-gray-600 mb-1">USDT {packages[selectedPackage as keyof typeof packages].amount}</div>
                    <div className="text-xl font-bold">{packages[selectedPackage as keyof typeof packages].price}</div>
                    {packages[selectedPackage as keyof typeof packages].discount && (
                      <div className="text-orange-500 text-sm">{packages[selectedPackage as keyof typeof packages].discount}</div>
                    )}
                  </div>
                  
                  {errors.length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                      {errors.map((error, index) => (
                        <div key={index} className="flex items-center gap-2 text-red-700 text-sm">
                          <i className="fas fa-exclamation-triangle"></i>
                          <span>{error}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      <i className="fas fa-wallet mr-2"></i>
                      BNB Wallet Address *
                    </label>
                    <input
                      type="text"
                      value={formData.walletAddress}
                      onChange={(e) => setFormData({...formData, walletAddress: e.target.value})}
                      placeholder="Enter your wallet address"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                      required
                    />
                    <div className="text-xs text-gray-500 mt-1">Enter your valid BNB wallet address</div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      <i className="fas fa-envelope mr-2"></i>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="your@email.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                      required
                    />
                    <div className="text-xs text-gray-500 mt-1">For support and transaction updates</div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">
                      <i className="fab fa-telegram mr-2"></i>
                      Telegram (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.telegram}
                      onChange={(e) => setFormData({...formData, telegram: e.target.value})}
                      placeholder="@username"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    />
                    <div className="text-xs text-gray-500 mt-1">For faster support</div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="flex-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      Next
                      <i className="fas fa-arrow-right"></i>
                    </button>
                  </div>
                </>
              )}
              
              {/* Step 2: Payment */}
              {currentStep === 'payment' && (
                <>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                    <h4 className="font-semibold text-yellow-800 mb-2">Payment Instructions</h4>
                    <p className="text-yellow-700 text-sm mb-3">Send the exact amount in BNB only to the address below:</p>
                    
                    <div className="bg-white rounded-lg p-3 border border-yellow-300">
                      <div className="text-sm text-gray-600 mb-1">Payment Address:</div>
                      <div className="font-mono text-sm bg-gray-100 p-2 rounded break-all">
                        {paymentAddress}
                      </div>
                      <div className="text-sm text-gray-600 mt-2">Amount: {orderData?.price}</div>
                    </div>
                    
                    <button 
                      onClick={() => navigator.clipboard.writeText(paymentAddress)}
                      className="mt-3 text-sm bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700 transition-colors"
                    >
                      <i className="fas fa-copy mr-1"></i> Copy Address
                    </button>
                  </div>
                  
                  {errors.length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                      {errors.map((error, index) => (
                        <div key={index} className="flex items-center gap-2 text-red-700 text-sm">
                          <i className="fas fa-exclamation-triangle"></i>
                          <span>{error}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">
                      <i className="fas fa-hashtag mr-2"></i>
                      Transaction Hash *
                    </label>
                    <input
                      type="text"
                      value={formData.transactionHash}
                      onChange={(e) => setFormData({...formData, transactionHash: e.target.value})}
                      placeholder="0x..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                      required
                    />
                    <div className="text-xs text-gray-500 mt-1">Invalid payment hash</div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setCurrentStep('info')}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="flex-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      Complete
                      <i className="fas fa-check"></i>
                    </button>
                  </div>
                </>
              )}
              
              {/* Step 3: Confirmation */}
              {currentStep === 'confirmation' && (
                <>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <h4 className="font-semibold text-green-800 mb-3">Order Summary</h4>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Package:</span>
                        <span className="font-semibold">{orderData?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Amount:</span>
                        <span className="font-semibold">USDT {orderData?.amount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Price:</span>
                        <span className="font-semibold">{orderData?.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Your Wallet:</span>
                        <span className="font-mono text-xs">{orderData?.userWallet?.slice(0, 6)}...{orderData?.userWallet?.slice(-4)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email:</span>
                        <span className="font-semibold">{orderData?.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Transaction Hash:</span>
                        <span className="font-mono text-xs">{formData.transactionHash?.slice(0, 6)}...{formData.transactionHash?.slice(-4)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <h4 className="font-semibold text-blue-800 mb-2">
                      <i className="fas fa-info-circle mr-2"></i>
                      Important Information
                    </h4>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• Your USDT will be flashed within 5-10 minutes</li>
                      <li>• You will receive a confirmation email</li>
                      <li>• For support, contact @flasherusdtsupport_bot</li>
                    </ul>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setCurrentStep('payment')}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleConfirmOrder}
                      disabled={isLoading}
                      className="flex-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-md transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-check"></i>
                          Confirm Order
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-600 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm">
          <div className="flex items-center gap-3">
            <i className="fas fa-check-circle text-2xl"></i>
            <div>
              <h4 className="font-semibold">Order Confirmed!</h4>
              <p className="text-sm">Your order has been successfully processed. Check your email for details.</p>
            </div>
          </div>
        </div>
      )}

      {/* Font Awesome */}
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />

      {/* Floating Telegram Support Button */}
      <a 
        href="https://t.me/flasherusdtsupport_bot" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 z-40"
        title="Telegram Support"
      >
        <i className="fab fa-telegram text-xl"></i>
      </a>
    </div>
  );
}
