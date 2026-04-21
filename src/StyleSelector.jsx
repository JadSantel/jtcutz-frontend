import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Sparkles, X } from 'lucide-react';

const StyleSelector = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    faceShape: '',
    maintenance: '',
    useProducts: ''
  });
  const [result, setResult] = useState(null);

  // Hairstyle recommendations database
  const recommendations = {
    // Oval face shape
    'oval-low-no': {
      style: 'Classic Crew Cut',
      description: 'Low maintenance, clean look that works great with your oval face. No products needed!',
      tips: 'Get it trimmed every 3-4 weeks. Quick morning routine - just comb and go.',
      image: '/images/gallery/haircut1.jpg'
    },
    'oval-low-yes': {
      style: 'Textured Crop',
      description: 'Easy to style with minimal product. Perfect for your face shape.',
      tips: 'Use a light styling cream. Takes 2 minutes to style in the morning.',
      image: '/images/gallery/haircut2.jpg'
    },
    'oval-high-no': {
      style: 'Buzz Cut',
      description: 'Ultimate low maintenance. Your oval face can pull off this confident look.',
      tips: 'Maintain every 2 weeks. Zero styling needed.',
      image: '/images/gallery/haircut3.jpg'
    },
    'oval-high-yes': {
      style: 'Pompadour',
      description: 'Classic style that complements oval faces. Great with pomade.',
      tips: 'Use medium-hold pomade. Style takes 5-10 minutes.',
      image: '/images/gallery/haircut4.jpg'
    },

    // Round face shape
    'round-low-no': {
      style: 'High Fade with Volume on Top',
      description: 'Adds height to balance your face shape. Minimal styling needed.',
      tips: 'The height elongates your face. Just towel dry and go.',
      image: '/images/gallery/haircut1.jpg'
    },
    'round-low-yes': {
      style: 'Quiff',
      description: 'Adds vertical height, perfect for round faces. Easy to maintain with products.',
      tips: 'Blow dry upward, use light wax. 3-4 minutes to style.',
      image: '/images/gallery/haircut2.jpg'
    },
    'round-high-no': {
      style: 'Short Sides, Textured Top',
      description: 'Creates the illusion of length. No products required.',
      tips: 'Keep sides tight, leave length on top. Natural texture works best.',
      image: '/images/gallery/haircut3.jpg'
    },
    'round-high-yes': {
      style: 'Modern Pompadour',
      description: 'Maximum height and style. Perfect for round face with products.',
      tips: 'Use strong-hold pomade. Blow dry for volume first.',
      image: '/images/gallery/haircut4.jpg'
    },

    // Square face shape
    'square-low-no': {
      style: 'Side Part',
      description: 'Classic and masculine. Complements your strong jawline perfectly.',
      tips: 'Comb to the side after shower. No products needed.',
      image: '/images/gallery/haircut1.jpg'
    },
    'square-low-yes': {
      style: 'Slick Back',
      description: 'Sophisticated look that highlights your strong features.',
      tips: 'Use pomade or gel. Comb back while damp. Quick and easy.',
      image: '/images/gallery/haircut2.jpg'
    },
    'square-high-no': {
      style: 'Buzz Cut Fade',
      description: 'Emphasizes your strong facial structure. Zero maintenance.',
      tips: 'Perfect for your face shape. Maintain every 2-3 weeks.',
      image: '/images/gallery/haircut3.jpg'
    },
    'square-high-yes': {
      style: 'Undercut with Texture',
      description: 'Trendy and bold. Great contrast for square faces.',
      tips: 'Use matte clay for texture. Style takes 5 minutes.',
      image: '/images/gallery/haircut4.jpg'
    },

    // Oblong/Long face shape
    'oblong-low-no': {
      style: 'Fringe Cut',
      description: 'Adds width and balances your face length. Minimal fuss.',
      tips: 'Let the fringe fall naturally. Trim every 4 weeks.',
      image: '/images/gallery/haircut1.jpg'
    },
    'oblong-low-yes': {
      style: 'Side Swept Style',
      description: 'Creates width with movement. Easy to style daily.',
      tips: 'Use light cream, sweep to the side. 2 minutes max.',
      image: '/images/gallery/haircut2.jpg'
    },
    'oblong-high-no': {
      style: 'Caesar Cut',
      description: 'Short fringe adds width. Perfect low-maintenance option.',
      tips: 'Natural and clean. Just comb forward after shower.',
      image: '/images/gallery/haircut3.jpg'
    },
    'oblong-high-yes': {
      style: 'Messy Fringe',
      description: 'Textured fringe creates width and balance.',
      tips: 'Use texturizing spray. Tousle with fingers for 3 minutes.',
      image: '/images/gallery/haircut4.jpg'
    },

    // Heart face shape
    'heart-low-no': {
      style: 'Short Sides with Length on Top',
      description: 'Balances your wider forehead. Clean and easy.',
      tips: 'Keep sides short, let top grow. Natural styling.',
      image: '/images/gallery/haircut1.jpg'
    },
    'heart-low-yes': {
      style: 'Textured Quiff',
      description: 'Adds balance with soft volume. Works great with products.',
      tips: 'Use light styling cream. Lift and texture the front.',
      image: '/images/gallery/haircut2.jpg'
    },
    'heart-high-no': {
      style: 'Crew Cut',
      description: 'Classic proportions for heart-shaped faces. Zero fuss.',
      tips: 'Timeless and professional. Trim every 3-4 weeks.',
      image: '/images/gallery/haircut3.jpg'
    },
    'heart-high-yes': {
      style: 'Modern Crop',
      description: 'Trendy style that balances your face shape beautifully.',
      tips: 'Use matte paste. Work through with fingers for texture.',
      image: '/images/gallery/haircut4.jpg'
    }
  };

  const questions = [
    {
      question: "What's your face shape?",
      subtitle: "Not sure? Look in the mirror!",
      options: [
        { 
          value: 'oval', 
          label: 'Oval', 
          description: 'Balanced proportions, slightly longer than wide'
        },
        { 
          value: 'round', 
          label: 'Round', 
          description: 'Equal width and length, soft angles'
        },
        { 
          value: 'square', 
          label: 'Square', 
          description: 'Strong jaw, wide forehead, equal width/length'
        },
        { 
          value: 'oblong', 
          label: 'Oblong', 
          description: 'Long face, narrow features'
        },
        { 
          value: 'heart', 
          label: 'Heart', 
          description: 'Wider forehead, narrow chin'
        }
      ]
    },
    {
      question: "How much time do you want to spend styling?",
      subtitle: "Be honest with yourself!",
      options: [
        { 
          value: 'low', 
          label: 'Low Maintenance', 
          description: '0-2 minutes daily, quick and easy'
        },
        { 
          value: 'high', 
          label: 'High Maintenance', 
          description: '5-10 minutes daily, willing to style'
        }
      ]
    },
    {
      question: "Do you use hair products?",
      subtitle: "Or willing to start?",
      options: [
        { 
          value: 'yes', 
          label: 'Yes', 
          description: 'I use or willing to use pomade, wax, gel, etc.'
        },
        { 
          value: 'no', 
          label: 'No', 
          description: 'Prefer to keep it natural, no products'
        }
      ]
    }
  ];

  const handleAnswer = (field, value) => {
    const newAnswers = { ...answers, [field]: value };
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate result
      const key = `${newAnswers.faceShape}-${newAnswers.maintenance}-${newAnswers.useProducts}`;
      setResult(recommendations[key]);
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setResult(null);
    }
  };

  const restart = () => {
    setCurrentStep(0);
    setAnswers({ faceShape: '', maintenance: '', useProducts: '' });
    setResult(null);
  };

  const getFieldName = (step) => {
    const fields = ['faceShape', 'maintenance', 'useProducts'];
    return fields[step];
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.95)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      overflowY: 'auto'
    }}>
      <div style={{
        backgroundColor: '#0f0f0f',
        border: '2px solid #eb5328',
        borderRadius: '8px',
        maxWidth: '700px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            color: '#eb5328',
            cursor: 'pointer',
            padding: '0.5rem',
            zIndex: 10
          }}
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div style={{
          padding: '2rem',
          borderBottom: '2px solid #eb5328',
          textAlign: 'center'
        }}>
          <Sparkles size={48} style={{ color: '#eb5328', margin: '0 auto 1rem' }} />
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            color: '#eb5328',
            marginBottom: '0.5rem',
            letterSpacing: '2px',
            textTransform: 'uppercase'
          }}>
            Style Finder
          </h2>
          <p style={{
            color: '#999',
            fontSize: 'clamp(0.9rem, 2vw, 1rem)',
            letterSpacing: '1px'
          }}>
            Find your perfect haircut in 3 quick questions
          </p>
        </div>

        {/* Progress Bar */}
        {!result && (
          <div style={{
            padding: '1rem 2rem',
            backgroundColor: '#0a0a0a'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '0.5rem'
            }}>
              {questions.map((_, index) => (
                <div
                  key={index}
                  style={{
                    flex: 1,
                    height: '4px',
                    backgroundColor: index <= currentStep ? '#eb5328' : '#2a2a2a',
                    marginRight: index < questions.length - 1 ? '0.5rem' : 0,
                    transition: 'background-color 0.3s ease'
                  }}
                />
              ))}
            </div>
            <p style={{
              color: '#666',
              fontSize: '0.9rem',
              textAlign: 'center',
              letterSpacing: '1px'
            }}>
              Question {currentStep + 1} of {questions.length}
            </p>
          </div>
        )}

        {/* Question or Result */}
        <div style={{ padding: '2rem' }}>
          {!result ? (
            <>
              <h3 style={{
                fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
                color: '#f5f5f5',
                marginBottom: '0.5rem',
                letterSpacing: '1px',
                textAlign: 'center'
              }}>
                {questions[currentStep].question}
              </h3>
              <p style={{
                color: '#999',
                fontSize: '0.9rem',
                marginBottom: '2rem',
                textAlign: 'center',
                letterSpacing: '1px'
              }}>
                {questions[currentStep].subtitle}
              </p>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                {questions[currentStep].options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(getFieldName(currentStep), option.value)}
                    style={{
                      backgroundColor: '#1a1a1a',
                      border: '2px solid #2a2a2a',
                      padding: '1.5rem',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      textAlign: 'left'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#eb5328';
                      e.currentTarget.style.backgroundColor = '#242424';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#2a2a2a';
                      e.currentTarget.style.backgroundColor = '#1a1a1a';
                    }}
                  >
                    <div style={{
                      fontSize: '1.3rem',
                      color: '#eb5328',
                      marginBottom: '0.5rem',
                      fontWeight: 'bold',
                      letterSpacing: '1px'
                    }}>
                      {option.label}
                    </div>
                    <div style={{
                      fontSize: '0.9rem',
                      color: '#999',
                      letterSpacing: '0.5px'
                    }}>
                      {option.description}
                    </div>
                  </button>
                ))}
              </div>

              {/* Back Button */}
              {currentStep > 0 && (
                <button
                  onClick={goBack}
                  style={{
                    marginTop: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'none',
                    border: '2px solid #2a2a2a',
                    color: '#f5f5f5',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    letterSpacing: '1px',
                    width: '100%',
                    justifyContent: 'center'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#eb5328';
                    e.currentTarget.style.color = '#eb5328';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#2a2a2a';
                    e.currentTarget.style.color = '#f5f5f5';
                  }}
                >
                  <ChevronLeft size={20} />
                  Back
                </button>
              )}
            </>
          ) : (
            <>
              {/* Result Display */}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  margin: '0 auto 1.5rem',
                  backgroundColor: '#eb5328',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Sparkles size={40} color="#0a0a0a" />
                </div>

                <h3 style={{
                  fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                  color: '#eb5328',
                  marginBottom: '1rem',
                  letterSpacing: '2px',
                  textTransform: 'uppercase'
                }}>
                  {result.style}
                </h3>

                <p style={{
                  fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                  color: '#f5f5f5',
                  marginBottom: '1.5rem',
                  lineHeight: '1.6',
                  letterSpacing: '0.5px'
                }}>
                  {result.description}
                </p>

                {/* Result Image */}
                <div style={{
                  width: '100%',
                  aspectRatio: '1',
                  backgroundImage: `url(${result.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  border: '2px solid #eb5328',
                  borderRadius: '8px',
                  marginBottom: '1.5rem'
                }} />

                {/* Styling Tips */}
                <div style={{
                  backgroundColor: '#1a1a1a',
                  border: '2px solid #2a2a2a',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  marginBottom: '2rem',
                  textAlign: 'left'
                }}>
                  <h4 style={{
                    color: '#eb5328',
                    fontSize: '1.2rem',
                    marginBottom: '0.75rem',
                    letterSpacing: '1px'
                  }}>
                    💡 Styling Tips:
                  </h4>
                  <p style={{
                    color: '#999',
                    fontSize: '0.95rem',
                    lineHeight: '1.6',
                    letterSpacing: '0.5px'
                  }}>
                    {result.tips}
                  </p>
                </div>

                {/* Action Buttons */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}>
                  <button
                    onClick={() => {
                      onClose();
                      setTimeout(() => {
                        document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                      }, 300);
                    }}
                    style={{
                      backgroundColor: '#eb5328',
                      color: '#0a0a0a',
                      border: 'none',
                      padding: '1rem 2rem',
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      letterSpacing: '1px',
                      textTransform: 'uppercase'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f5f5f5';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#eb5328';
                    }}
                  >
                    Book This Style
                  </button>

                  <button
                    onClick={restart}
                    style={{
                      background: 'none',
                      border: '2px solid #2a2a2a',
                      color: '#f5f5f5',
                      padding: '1rem 2rem',
                      fontSize: '1rem',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      letterSpacing: '1px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#eb5328';
                      e.currentTarget.style.color = '#eb5328';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#2a2a2a';
                      e.currentTarget.style.color = '#f5f5f5';
                    }}
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StyleSelector;
