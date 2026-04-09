import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Phone, Mail, Instagram, Scissors, Star, CheckCircle, XCircle, FacebookIcon } from 'lucide-react';
import StyleSelector from './StyleSelector';

// API Configuration
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const BarberWebsite = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [bookedTimes, setBookedTimes] = useState([]);
  const [gallery, setGallery] = useState([
    { id: 1, style: 'Fade', url: '/images/gallery/16 Guard.jpg', filename: '16 Guard.jpg' },
    { id: 2, style: 'Pompadour', url: '/images/gallery/Burst Fade.jpg', filename: 'Burst Fade.jpg' },
    { id: 3, style: 'Undercut', url: '/images/gallery/Buzz Cut.jpg', filename: 'Buzz Cut.jpg' },
    { id: 4, style: 'Curtains', url: '/images/gallery/Curtains.jpg', filename: 'Curtains.jpg' },
    { id: 5, style: 'French Crop', url: '/images/gallery/French Crop.jpg', filename: 'French Crop.jpg' },
    { id: 6, style: 'High Fade', url: '/images/gallery/High Fade.jpg', filename: 'High Fade.jpg' },
    { id: 7, style: 'High Taper', url: '/images/gallery/High Taper.jpg', filename: 'High Taper.jpg' },
    { id: 8, style: 'Low Fade', url: '/images/gallery/Low Fade.jpg', filename: 'Low Fade.jpg' },
    { id: 9, style: 'Low Taper', url: '/images/gallery/Low Taper.jpg', filename: 'Low Taper.jpg' },
    { id: 10, style: 'Mid Fade', url: '/images/gallery/Mid Fade.jpg', filename: 'Mid Fade.jpg' },
    { id: 11, style: 'Mid Taper', url: '/images/gallery/Mid Taper.jpg', filename: 'Mid Taper.jpg' },
    { id: 12, style: 'Modern Mullet', url: '/images/gallery/Modern Mullet.jpg', filename: 'Modern Mullet' },
    { id: 13, style: 'Slick Back', url: '/images/gallery/Slick Back.jpg', filename: 'Slick Back' }
  ]);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    date: '',
    time: ''
  });
  const [bookingStatus, setBookingStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showStyleSelector, setShowStyleSelector] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch gallery images
  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    try {
      const response = await fetch(`${API_URL}/gallery`);
      const data = await response.json();
      
      if (data.success && data.images.length > 0) {
        // If API has images, use them
        setGallery(data.images);
      }
      // Otherwise, keep the static images from initialization
    } catch (error) {
      console.log('Using static gallery images');
      // Keep the static images - no need to update state
    }
  };

  // Fetch booked times when date changes
  useEffect(() => {
    if (bookingForm.date) {
      fetchBookedTimes(bookingForm.date);
    }
  }, [bookingForm.date]);

  const fetchBookedTimes = async (date) => {
    try {
      const response = await fetch(`${API_URL}/appointments/date/${date}`);
      const data = await response.json();
      
      if (data.success) {
        setBookedTimes(data.bookedTimes);
      }
    } catch (error) {
      console.error('Error fetching booked times:', error);
    }
  };

  const services = [
    { id: 1, name: 'Premium Cut & Style', price: '₱250', duration: '60 min', description: 'Cut and premium styling' },
    { id: 2, name: 'Cut + Beard Combo', price: '₱300', duration: '60 min', description: 'Complete grooming experience' },
  ];

  

  const timeSlots = ['10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];

  const handleBooking = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setBookingStatus({ type: '', message: '' });

  console.log('🔄 Attempting to book...', bookingForm);
  console.log('📡 API URL:', API_URL);

  try {
    console.log('📤 Sending request to:', `${API_URL}/appointments`);
    
    const response = await fetch(`${API_URL}/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingForm)
    });

    console.log('📥 Response status:', response.status);
    
    const data = await response.json();
    console.log('📦 Response data:', data);

    if (data.success) {
      setBookingStatus({
        type: 'success',
        message: `Booking confirmed! Appointment ID: ${data.appointmentId}. We'll contact you at ${bookingForm.phone} to confirm.`
      });
      
      // Reset form
      setBookingForm({
        name: '',
        phone: '',
        email: '',
        service: '',
        date: '',
        time: ''
      });
      
      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.error('❌ Booking failed:', data.error);
      setBookingStatus({
        type: 'error',
        message: data.error || 'Booking failed. Please try again.'
      });
    }
  } catch (error) {
    console.error('❌ Booking error:', error);
    setBookingStatus({
      type: 'error',
      message: `Unable to connect to server: ${error.message}. Please check if the backend is running.`
    });
  } finally {
    setIsSubmitting(false);
  }
};    

  const scrollToSection = (section) => {
    setActiveSection(section);
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  };

  const isTimeSlotBooked = (time) => {
    return bookedTimes.includes(time);
  };

  return (
    <div style={{ fontFamily: '"Bebas Neue", "Arial Black", sans-serif', backgroundColor: '#0a0a0a', color: '#f5f5f5', minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: scrolled ? 'rgba(10, 10, 10, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        borderBottom: scrolled ? '2px solid #d4af37' : 'none',
        transition: 'all 0.3s ease',
        padding: '1rem 2rem'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 'bold', color: '#ffffff', letterSpacing: '2px' }}>
            {/*<img src="/images/Logo.png" style={{width: '50px', height: '50px'}}/>*/}
            <Scissors style={{ display: 'inline', marginRight: '0.5rem' }} />
            JTCUTZ
          </div>
          <div style={{ display: 'flex', gap: 'clamp(1rem, 2vw, 2rem)', fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)', letterSpacing: '1px', flexWrap: 'wrap' }}>
            {['home', 'services', 'gallery', 'booking', 'contact'].map(section => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: activeSection === section ? '#d4af37' : '#f5f5f5',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  transition: 'color 0.3s ease',
                  fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
                  padding: '0.5rem 0',
                  borderBottom: activeSection === section ? '2px solid #d4af37' : '2px solid transparent'
                }}
                onMouseEnter={(e) => e.target.style.color = '#d4af37'}
                onMouseLeave={(e) => e.target.style.color = activeSection === section ? '#d4af37' : '#f5f5f5'}
              >
                {section}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(212, 175, 55, 0.03) 2px, rgba(212, 175, 55, 0.03) 4px)`,
          pointerEvents: 'none'
        }} />
        <div style={{ textAlign: 'center', zIndex: 1, padding: '2rem' }}>
          <h1 style={{
            fontSize: 'clamp(3rem, 10vw, 8rem)',
            fontWeight: 'bold',
            marginBottom: '1rem',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            background: 'linear-gradient(135deg, #d4af37 0%, #f5f5f5 50%, #d4af37 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'shine 3s ease-in-out infinite'
          }}>
            JT CUTZ
          </h1>
          <p style={{
            fontSize: 'clamp(1.2rem, 3vw, 2rem)',
            color: '#cccccc',
            marginBottom: '3rem',
            letterSpacing: '3px',
            textTransform: 'uppercase'
          }}>
            Your neighborhood barbershop for modern cuts
          </p>
          <button
            onClick={() => scrollToSection('booking')}
            style={{
              backgroundColor: '#d4af37',
              color: '#0a0a0a',
              border: 'none',
              padding: '1.2rem 3rem',
              fontSize: 'clamp(1rem, 2vw, 1.3rem)',
              fontWeight: 'bold',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 20px rgba(212, 175, 55, 0.4)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 6px 30px rgba(212, 175, 55, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 4px 20px rgba(212, 175, 55, 0.4)';
            }}
          >
            Book Now
          </button>

          <button
            onClick={() => setShowStyleSelector(true)}
            style={{
              backgroundColor: 'transparent',
              color: '#d4af37',
              border: '2px solid #d4af37',
              padding: '1.2rem 3rem',
              fontSize: 'clamp(1rem, 2vw, 1.3rem)',
              fontWeight: 'bold',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              transition: 'all 0.3s ease',
              marginTop: '1rem'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#d4af37';
              e.target.style.color = '#0a0a0a';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#d4af37';
              e.target.style.transform = 'scale(1)';
            }}
          >
            Find My Perfect Style
          </button>
          
          <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
            {[
              { icon: <Clock />, text: 'Open Daily', sub: '10AM - 5PM' },
              { icon: <MapPin />, text: 'Iponan, zone 1 B', sub: 'Location' },
              { icon: <Star />, text: '5 Star', sub: 'Rated Service' }
            ].map((item, idx) => (
              <div key={idx} style={{ textAlign: 'center' }}>
                <div style={{ color: '#d4af37', marginBottom: '0.5rem' }}>{item.icon}</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', letterSpacing: '1px' }}>{item.text}</div>
                <div style={{ fontSize: '0.9rem', color: '#999', textTransform: 'uppercase' }}>{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" style={{
        padding: '6rem 2rem',
        width: '100%',
        backgroundColor: '#0f0f0f'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            textAlign: 'center',
            marginBottom: '3rem',
            letterSpacing: '4px',
            color: '#d4af37',
            textTransform: 'uppercase'
          }}>
            Our Services
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {services.map((service) => (
              <div
                key={service.id}
                onClick={() => setSelectedService(service)}
                style={{
                  backgroundColor: selectedService?.id === service.id ? '#1a1a1a' : '#141414',
                  border: selectedService?.id === service.id ? '2px solid #d4af37' : '2px solid #2a2a2a',
                  padding: '2rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  transform: selectedService?.id === service.id ? 'scale(1.02)' : 'scale(1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#d4af37';
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  if (selectedService?.id !== service.id) {
                    e.currentTarget.style.borderColor = '#2a2a2a';
                    e.currentTarget.style.transform = 'scale(1)';
                  }
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <h3 style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', color: '#d4af37', letterSpacing: '2px' }}>{service.name}</h3>
                  <span style={{ fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', color: '#f5f5f5', fontWeight: 'bold' }}>{service.price}</span>
                </div>
                <p style={{ color: '#999', fontSize: 'clamp(0.9rem, 1.5vw, 1rem)', marginBottom: '1rem', letterSpacing: '1px' }}>
                  {service.description}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#666', fontSize: '0.9rem' }}>
                  <Clock size={16} />
                  <span style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>{service.duration}</span>
                </div>
                 <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                    <button
                      onClick={() => setShowStyleSelector(true)}
                      style={{
                        backgroundColor: 'transparent',
                        color: '#d4af37',
                        border: '2px solid #d4af37',
                        padding: '1rem 2.5rem',
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#d4af37';
                        e.target.style.color = '#0a0a0a';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = '#d4af37';
                      }}
                    >
                      Not Sure? Find Your Perfect Style
                    </button>
                  </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" style={{
        padding: '6rem 2rem',
        width: '100%',
        backgroundColor: '#0a0a0a'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            textAlign: 'center',
            marginBottom: '3rem',
            letterSpacing: '4px',
            color: '#d4af37',
            textTransform: 'uppercase'
          }}>
            Our Work
          </h2>
          
          {gallery.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem'
            }}>
              {gallery.map((item, index) => (
                <div
                  key={item.filename || index}
                  style={{
                    backgroundColor: '#1a1a1a',
                    aspectRatio: '1',
                    border: '2px solid #2a2a2a',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#d4af37';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#2a2a2a';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <img 
                    src={item.url}
                    alt={item.style || 'Haircut style'}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'rgba(212, 175, 55, 0.9)',
                    padding: '1rem',
                    textAlign: 'center',
                    fontSize: 'clamp(1rem, 2vw, 1.3rem)',
                    letterSpacing: '2px',
                    color: '#0a0a0a',
                    fontWeight: 'bold'
                  }}>
                    {item.style || item.title}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              backgroundColor: '#1a1a1a',
              border: '2px solid #2a2a2a',
              padding: '3rem',
              textAlign: 'center',
              borderRadius: '10px'
            }}>
              <p style={{ color: '#666', fontSize: '1.2rem', marginBottom: '1rem' }}>
                Gallery Coming Soon
              </p>
              <p style={{ color: '#999', fontSize: '1rem' }}>
                We're uploading photos of our best work. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" style={{
        padding: '6rem 2rem',
        width: '100%',
        backgroundColor: '#0f0f0f'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            textAlign: 'center',
            marginBottom: '3rem',
            letterSpacing: '4px',
            color: '#d4af37',
            textTransform: 'uppercase'
          }}>
            Book Appointment
          </h2>

          {/* Status Messages */}
          {bookingStatus.message && (
            <div style={{
              padding: '1rem',
              marginBottom: '2rem',
              backgroundColor: bookingStatus.type === 'success' ? '#1a4d1a' : '#4d1a1a',
              border: `2px solid ${bookingStatus.type === 'success' ? '#2d7a2d' : '#7a2d2d'}`,
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              {bookingStatus.type === 'success' ? (
                <CheckCircle size={24} color="#4ade80" />
              ) : (
                <XCircle size={24} color="#f87171" />
              )}
              <p style={{ color: '#f5f5f5', fontSize: '1rem', letterSpacing: '1px', margin: 0 }}>
                {bookingStatus.message}
              </p>
            </div>
          )}

          <form onSubmit={handleBooking} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
              <input
                type="text"
                placeholder="FULL NAME"
                required
                value={bookingForm.name}
                onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                style={{
                  backgroundColor: '#1a1a1a',
                  border: '2px solid #2a2a2a',
                  color: '#f5f5f5',
                  padding: '1rem',
                  fontSize: '1rem',
                  letterSpacing: '1px',
                  outline: 'none',
                  transition: 'border-color 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#d4af37'}
                onBlur={(e) => e.target.style.borderColor = '#2a2a2a'}
              />
              <input
                type="tel"
                placeholder="PHONE NUMBER"
                required
                value={bookingForm.phone}
                onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                style={{
                  backgroundColor: '#1a1a1a',
                  border: '2px solid #2a2a2a',
                  color: '#f5f5f5',
                  padding: '1rem',
                  fontSize: '1rem',
                  letterSpacing: '1px',
                  outline: 'none',
                  transition: 'border-color 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#d4af37'}
                onBlur={(e) => e.target.style.borderColor = '#2a2a2a'}
              />
            </div>
            
            <input
              type="email"
              placeholder="EMAIL ADDRESS"
              required
              value={bookingForm.email}
              onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
              style={{
                backgroundColor: '#1a1a1a',
                border: '2px solid #2a2a2a',
                color: '#f5f5f5',
                padding: '1rem',
                fontSize: '1rem',
                letterSpacing: '1px',
                outline: 'none',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#d4af37'}
              onBlur={(e) => e.target.style.borderColor = '#2a2a2a'}
            />

            <select
              required
              value={bookingForm.service}
              onChange={(e) => setBookingForm({ ...bookingForm, service: e.target.value })}
              style={{
                backgroundColor: '#1a1a1a',
                border: '2px solid #2a2a2a',
                color: bookingForm.service ? '#f5f5f5' : '#666',
                padding: '1rem',
                fontSize: '1rem',
                letterSpacing: '1px',
                outline: 'none',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#d4af37'}
              onBlur={(e) => e.target.style.borderColor = '#2a2a2a'}
            >
              <option value="">SELECT SERVICE</option>
              {services.map(service => (
                <option key={service.id} value={service.name}>
                  {service.name} - {service.price}
                </option>
              ))}
            </select>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
              <input
                type="date"
                required
                value={bookingForm.date}
                onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                style={{
                  backgroundColor: '#1a1a1a',
                  border: '2px solid #2a2a2a',
                  color: '#f5f5f5',
                  padding: '1rem',
                  fontSize: '1rem',
                  letterSpacing: '1px',
                  outline: 'none',
                  transition: 'border-color 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#d4af37'}
                onBlur={(e) => e.target.style.borderColor = '#2a2a2a'}
              />
              
              <select
                required
                value={bookingForm.time}
                onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                disabled={!bookingForm.date}
                style={{
                  backgroundColor: '#1a1a1a',
                  border: '2px solid #2a2a2a',
                  color: bookingForm.time ? '#f5f5f5' : '#666',
                  padding: '1rem',
                  fontSize: '1rem',
                  letterSpacing: '1px',
                  outline: 'none',
                  transition: 'border-color 0.3s ease',
                  opacity: !bookingForm.date ? 0.5 : 1
                }}
                onFocus={(e) => e.target.style.borderColor = '#d4af37'}
                onBlur={(e) => e.target.style.borderColor = '#2a2a2a'}
              >
                <option value="">SELECT TIME</option>
                {timeSlots.map(time => (
                  <option 
                    key={time} 
                    value={time}
                    disabled={isTimeSlotBooked(time)}
                  >
                    {time} {isTimeSlotBooked(time) ? '(Booked)' : ''}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                backgroundColor: isSubmitting ? '#666' : '#d4af37',
                color: '#0a0a0a',
                border: 'none',
                padding: '1.2rem',
                fontSize: 'clamp(1rem, 2vw, 1.3rem)',
                fontWeight: 'bold',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                transition: 'all 0.3s ease',
                marginTop: '1rem',
                opacity: isSubmitting ? 0.7 : 1
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.target.style.backgroundColor = '#f5f5f5';
                  e.target.style.transform = 'scale(1.02)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.target.style.backgroundColor = '#d4af37';
                  e.target.style.transform = 'scale(1)';
                }
              }}
            >
              {isSubmitting ? 'Processing...' : 'Confirm Booking'}
            </button>
          </form>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{
        padding: '6rem 2rem',
        width: '100%',
        backgroundColor: '#0a0a0a'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            textAlign: 'center',
            marginBottom: '3rem',
            letterSpacing: '4px',
            color: '#d4af37',
            textTransform: 'uppercase'
          }}>
            Visit Us
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', textAlign: 'center' }}>
            <div>
              <MapPin size={48} style={{ color: '#d4af37', margin: '0 auto 1rem' }} />
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', letterSpacing: '2px' }}>Location</h3>
              <p style={{ color: '#999', fontSize: '1.1rem', letterSpacing: '1px' }}>
                zone 1 b, iponan<br />
                Cagayan de Oro City, 9000<br />
                Philippines
              </p>
            </div>
            <div>
              <Clock size={48} style={{ color: '#d4af37', margin: '0 auto 1rem' }} />
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', letterSpacing: '2px' }}>Hours</h3>
              <p style={{ color: '#999', fontSize: '1.1rem', letterSpacing: '1px' }}>
                Monday - Sunday<br />
                10:00 AM - 5:00 PM<br />
              </p>
            </div>
            <div>
              <Phone size={48} style={{ color: '#d4af37', margin: '0 auto 1rem' }} />
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', letterSpacing: '2px' }}>Contact</h3>
              <p style={{ color: '#999', fontSize: '1.1rem', letterSpacing: '1px' }}>
                <Phone size={18} style={{ display: 'inline', marginRight: '0.5rem' }} />
                +63 997 523 5948<br />
                <Mail size={18} style={{display: 'inline', marginRight: '0.5rem' }}/>
                jethertuyor2@gmail.com<br />
                <FacebookIcon size={18} style={{ display: 'inline', marginRight: '0.5rem' }} />
                Jether Tuyor<br />
                <Instagram size={18} style={{ display: 'inline', marginRight: '0.5rem' }} />
                @boogie13th
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#0f0f0f',
        borderTop: '2px solid #d4af37',
        padding: '2rem',
        textAlign: 'center',
        color: '#666',
        fontSize: '0.9rem',
        letterSpacing: '1px',
        width: '100%'
      }}>
        <p>© 2026 JT CUTZ. ALL RIGHTS RESERVED.</p>
        <p style={{ marginTop: '0.5rem' }}>CRAFTED WITH PRECISION</p>
      </footer>

      {/* Add custom font and animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        
        @keyframes shine {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        *, *::before, *::after {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html, body {
          width: 100%;
          min-height: 100vh;
          scroll-behavior: smooth;
          overflow-x: hidden;
          background-color: #0a0a0a;
        }

        #root {
          width: 100%;
          min-height: 100vh;
        }

        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(1);
          cursor: pointer;
        }

        select option:disabled {
          color: #999;
        }
      `}</style>
      
      {showStyleSelector && (
        <StyleSelector onClose={() => setShowStyleSelector(false)} />
      )}
    </div>
  );
};

export default BarberWebsite;