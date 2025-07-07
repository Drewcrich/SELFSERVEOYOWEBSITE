import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { CheckCircle, Clock, MessageSquare, MapPin, Phone, Mail, Calendar } from 'lucide-react';

const BookTourPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    preferredTime: '',
    scheduledDate: '',
    scheduledTime: '',
    questions: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // EmailJS configuration
      const serviceID = 'service_mzjm45n';
      const templateID = 'template_tpasori';
      const publicKey = 'nkBo4RSj5XY1LaspO';

      // Format the preferred time for email
      let formattedTime = '';
      if (formData.preferredTime === 'within-1-hour') {
        formattedTime = 'Within 1 hour (ASAP)';
      } else if (formData.preferredTime === 'schedule-specific') {
        const date = formData.scheduledDate ? new Date(formData.scheduledDate).toLocaleDateString() : 'Not specified';
        const time = formData.scheduledTime || 'Not specified';
        formattedTime = `Scheduled for ${date} at ${time}`;
      }

      // Prepare email template parameters
      const templateParams = {
        to_email: 'Drewcrichardson1999@gmail.com',
        customer_name: formData.fullName,
        customer_phone: formData.phone,
        customer_email: formData.email,
        preferred_time: formattedTime,
        questions: formData.questions || 'No additional questions',
        reply_to: formData.email,
        
        response_template: `Hi ${formData.fullName}! Your tour is ready:

📍 Container #23 (red container, front row)
🔐 Combination: 4-7-2-1
📍 1502 Airport Road, Urbana IL
🕐 Available now for your tour
📱 Text me when you're done: (your number)

Take your time exploring!`
      };

      console.log('📧 Sending email via EmailJS:', templateParams);

      // Send actual email via EmailJS
      await emailjs.send(serviceID, templateID, templateParams, publicKey);

      // Navigate to confirmation page with customer data
      navigate('/tour-confirmation', {
        state: {
          customerName: formData.fullName,
          customerEmail: formData.email,
          customerPhone: formData.phone
        }
      });

    } catch (error) {
      console.error('Error sending email:', error);
      alert('There was an error submitting your tour request. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)' }}>
      {/* Hero Section */}
      <section className="hero-section" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
        <div className="container">
          <div className="fade-in-up" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h1 className="hero-title" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
              📋 Book Your Self-Service Tour
            </h1>
            <p className="hero-subtitle" style={{ fontSize: '1.1rem', color: 'var(--text-gray)', marginBottom: '2rem' }}>
              Quick form • Instant confirmation • Tour in minutes
            </p>
            
            {/* Process Steps */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '1.5rem',
              marginBottom: '3rem',
              maxWidth: '800px',
              margin: '0 auto 3rem auto'
            }}>
              <div style={{ 
                background: 'white', 
                padding: '1.5rem', 
                borderRadius: '1rem', 
                boxShadow: 'var(--card-shadow)',
                textAlign: 'center'
              }}>
                <div style={{ 
                  background: 'var(--primary-green)', 
                  color: 'white', 
                  width: '3rem', 
                  height: '3rem', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  margin: '0 auto 1rem auto',
                  fontSize: '1.2rem',
                  fontWeight: '700'
                }}>
                  1
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>Fill Form</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-gray)' }}>1-minute booking form</p>
              </div>
              
              <div style={{ 
                background: 'white', 
                padding: '1.5rem', 
                borderRadius: '1rem', 
                boxShadow: 'var(--card-shadow)',
                textAlign: 'center'
              }}>
                <div style={{ 
                  background: 'var(--secondary-blue)', 
                  color: 'white', 
                  width: '3rem', 
                  height: '3rem', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  margin: '0 auto 1rem auto',
                  fontSize: '1.2rem',
                  fontWeight: '700'
                }}>
                  2
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>Get Details</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-gray)' }}>Text with location, number & access code</p>
              </div>
              
              <div style={{ 
                background: 'white', 
                padding: '1.5rem', 
                borderRadius: '1rem', 
                boxShadow: 'var(--card-shadow)',
                textAlign: 'center'
              }}>
                <div style={{ 
                  background: 'var(--accent-purple)', 
                  color: 'white', 
                  width: '3rem', 
                  height: '3rem', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  margin: '0 auto 1rem auto',
                  fontSize: '1.2rem',
                  fontWeight: '700'
                }}>
                  3
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>Tour & Rent</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-gray)' }}>Self-guided tour</p>
              </div>
            </div>
          </div>

          {/* Main Form Container */}
          <div style={{ 
            maxWidth: '800px', 
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '2rem'
          }}>
            
            {/* Booking Form */}
            <div style={{ 
              background: 'white', 
              borderRadius: '1.5rem', 
              padding: '3rem', 
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              border: '1px solid rgba(34, 197, 94, 0.1)'
            }}>
              <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '2rem' }}>
                
                {/* Personal Information */}
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                  <h3 style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: '700', 
                    color: 'var(--text-dark)',
                    marginBottom: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <Phone size={24} style={{ color: 'var(--primary-green)' }} />
                    Your Information
                  </h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    {/* Full Name */}
                    <div>
                      <label style={{ 
                        display: 'block', 
                        fontSize: '1rem', 
                        fontWeight: '600', 
                        color: 'var(--text-dark)', 
                        marginBottom: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        🏷️ Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                        style={{
                          width: '100%',
                          padding: '1rem',
                          border: '2px solid #e5e7eb',
                          borderRadius: '0.75rem',
                          fontSize: '1rem',
                          transition: 'all 0.3s ease',
                          outline: 'none'
                        }}
                        placeholder="Enter your full name"
                        onFocus={(e) => e.target.style.borderColor = 'var(--primary-green)'}
                        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label style={{ 
                        display: 'block', 
                        fontSize: '1rem', 
                        fontWeight: '600', 
                        color: 'var(--text-dark)', 
                        marginBottom: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        📱 Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        style={{
                          width: '100%',
                          padding: '1rem',
                          border: '2px solid #e5e7eb',
                          borderRadius: '0.75rem',
                          fontSize: '1rem',
                          transition: 'all 0.3s ease',
                          outline: 'none'
                        }}
                        placeholder="(555) 123-4567"
                        onFocus={(e) => e.target.style.borderColor = 'var(--primary-green)'}
                        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label style={{ 
                      display: 'block', 
                      fontSize: '1rem', 
                      fontWeight: '600', 
                      color: 'var(--text-dark)', 
                      marginBottom: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      📧 Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '1rem',
                        border: '2px solid #e5e7eb',
                        borderRadius: '0.75rem',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease',
                        outline: 'none'
                      }}
                      placeholder="your.email@example.com"
                      onFocus={(e) => e.target.style.borderColor = 'var(--primary-green)'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                    />
                  </div>
                </div>

                {/* Tour Timing */}
                <div>
                  <h3 style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: '700', 
                    color: 'var(--text-dark)',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <Calendar size={24} style={{ color: 'var(--secondary-blue)' }} />
                    Preferred Tour Time *
                  </h3>
                  
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    {[
                      { value: 'within-1-hour', label: 'Within 1 hour', icon: '⚡' },
                      { value: 'schedule-specific', label: 'Schedule specific time', icon: '📅' }
                    ].map((option) => (
                      <label key={option.value} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '1rem',
                        border: '2px solid #e5e7eb',
                        borderRadius: '0.75rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        backgroundColor: formData.preferredTime === option.value ? 'rgba(34, 197, 94, 0.1)' : 'white',
                        borderColor: formData.preferredTime === option.value ? 'var(--primary-green)' : '#e5e7eb'
                      }}>
                        <input
                          type="radio"
                          name="preferredTime"
                          value={option.value}
                          checked={formData.preferredTime === option.value}
                          onChange={handleInputChange}
                          style={{ 
                            width: '1.25rem', 
                            height: '1.25rem',
                            accentColor: 'var(--primary-green)'
                          }}
                        />
                        <span style={{ fontSize: '1.2rem' }}>{option.icon}</span>
                        <span style={{ fontSize: '1rem', fontWeight: '500' }}>{option.label}</span>
                        {formData.preferredTime === option.value && (
                          <CheckCircle size={20} style={{ color: 'var(--primary-green)', marginLeft: 'auto' }} />
                        )}
                      </label>
                    ))}
                  </div>

                  {/* Date/Time Picker for Scheduled Tours */}
                  {formData.preferredTime === 'schedule-specific' && (
                    <div style={{ marginTop: '1rem', display: 'grid', gap: '1rem' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                          <label style={{ 
                            display: 'block', 
                            fontSize: '0.9rem', 
                            fontWeight: '600', 
                            color: 'var(--text-dark)', 
                            marginBottom: '0.5rem'
                          }}>
                            📅 Preferred Date
                          </label>
                          <input
                            type="date"
                            name="scheduledDate"
                            value={formData.scheduledDate}
                            onChange={handleInputChange}
                            min={new Date().toISOString().split('T')[0]}
                            style={{
                              width: '100%',
                              padding: '0.75rem',
                              border: '2px solid var(--primary-green)',
                              borderRadius: '0.75rem',
                              fontSize: '1rem',
                              outline: 'none'
                            }}
                          />
                        </div>
                        <div>
                          <label style={{ 
                            display: 'block', 
                            fontSize: '0.9rem', 
                            fontWeight: '600', 
                            color: 'var(--text-dark)', 
                            marginBottom: '0.5rem'
                          }}>
                            🕐 Preferred Time
                          </label>
                          <input
                            type="time"
                            name="scheduledTime"
                            value={formData.scheduledTime}
                            onChange={handleInputChange}
                            style={{
                              width: '100%',
                              padding: '0.75rem',
                              border: '2px solid var(--primary-green)',
                              borderRadius: '0.75rem',
                              fontSize: '1rem',
                              outline: 'none'
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Optional Questions */}
                <div>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '1rem', 
                    fontWeight: '600', 
                    color: 'var(--text-dark)', 
                    marginBottom: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <MessageSquare size={20} style={{ color: 'var(--accent-purple)' }} />
                    Any specific questions? (Optional)
                  </label>
                  <textarea
                    name="questions"
                    rows="4"
                    value={formData.questions}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '0.75rem',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      outline: 'none',
                      resize: 'vertical'
                    }}
                    placeholder="Any questions about storage, pricing, or the facility?"
                    onFocus={(e) => e.target.style.borderColor = 'var(--primary-green)'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    padding: '1.25rem 2rem',
                    fontSize: '1.2rem',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    opacity: isSubmitting ? 0.7 : 1,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div style={{
                        width: '1.25rem',
                        height: '1.25rem',
                        border: '2px solid transparent',
                        borderTop: '2px solid white',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }} />
                      Booking Your Tour...
                    </>
                  ) : (
                    <>
                      🔍 Book My Tour
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* What Happens Next */}
            <div style={{ 
              background: 'linear-gradient(135deg, var(--primary-green), #16a34a)', 
              color: 'white', 
              padding: '2.5rem', 
              borderRadius: '1.5rem', 
              boxShadow: '0 20px 25px -5px rgba(34, 197, 94, 0.3)'
            }}>
              <h3 style={{ 
                fontSize: '1.5rem', 
                fontWeight: '700', 
                marginBottom: '1.5rem',
                textAlign: 'center'
              }}>
                What happens next?
              </h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {[
                  { icon: '✅', text: 'Instant confirmation sent to your email' },
                  { icon: '✅', text: "We'll text you exact container location (with photo), container number, and lock combination within 30 minutes" },
                  { icon: '✅', text: 'Self-guided tour at your convenience' },
                  { icon: '✅', text: 'Rent on-site if you love it!' }
                ].map((item, index) => (
                  <div key={index} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '1rem',
                    fontSize: '1.1rem',
                    fontWeight: '500'
                  }}>
                    <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default BookTourPage;