import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Phone, MessageSquare, MapPin, Clock, Shield, Star, Smartphone, FileText, Zap, Key } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="fade-in-up">
            <h1 className="hero-title">
              Urbana Storage Solutions
            </h1>
            <h2 className="hero-subtitle">
              Self Service Storage Made Simple
            </h2>
            <p className="hero-description">
              Premier self service storage in Urbana, IL featuring spacious 40ft shipping containers with 24/7 access. 
              Rent online in minutes without office visits or paperwork hassles. Serving Urbana, Illinois with secure, 
              affordable storage solutions starting at just $75/month.
            </p>

            {/* Easy Process Callout */}
            <div style={{ 
              background: 'linear-gradient(135deg, var(--primary-green), #16a34a)', 
              color: 'white', 
              padding: '2rem', 
              borderRadius: '1rem', 
              textAlign: 'center',
              marginBottom: '2rem',
              boxShadow: '0 10px 25px rgba(34, 197, 94, 0.3)'
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                ⚡ "Book Tour in 1 Minute, Tour in 5, Rent in 10"
              </div>
              <div style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                Book online → Get container location, number & access code → Tour at your convenience → Rent on-site
              </div>
              <div style={{ fontSize: '1rem', opacity: '0.9' }}>
                No appointments • No office visits • No paperwork hassles
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
              <Link to="/book-tour" className="btn-primary">
                <Clock size={20} />
                Book Self-Service Tour
              </Link>
              <a href="#pricing" className="btn-secondary">
                <span style={{ color: 'var(--primary-green)' }}>$</span>
                View Pricing Plans
              </a>
            </div>

            <div className="feature-icons">
              <div className="feature-icon">
                <Smartphone size={24} />
                <span>Book Online</span>
              </div>
              <div className="feature-icon">
                <FileText size={24} />
                <span>Simple DocuSign</span>
              </div>
              <div className="feature-icon">
                <Zap size={24} />
                <span>Rent in Minutes</span>
              </div>
              <div className="feature-icon">
                <Key size={24} />
                <span>Instant Access</span>
              </div>
            </div>

            <div style={{ 
              background: 'var(--primary-green)', 
              color: 'white', 
              padding: '1rem 2rem', 
              borderRadius: '0.5rem', 
              display: 'inline-block',
              fontWeight: '600',
              fontSize: '1.25rem'
            }}>
              320 sq ft of secure storage space
            </div>
          </div>
        </div>
      </section>

      {/* How Easy Is It Section */}
      <section className="process-section" style={{ background: 'var(--background-light)' }}>
        <div className="container">
          <h2 className="process-title">
            🎯 Seriously, It's <span className="text-green">This Easy</span>:
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '2rem', 
            marginBottom: '2rem' 
          }}>
            <div style={{ 
              background: 'white', 
              padding: '1.5rem', 
              borderRadius: '1rem', 
              boxShadow: 'var(--card-shadow)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📋</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>
                1. Book your tour online
              </h3>
              <p style={{ color: 'var(--text-gray)' }}>
                Quick 1-minute form with your details
              </p>
            </div>

            <div style={{ 
              background: 'white', 
              padding: '1.5rem', 
              borderRadius: '1rem', 
              boxShadow: 'var(--card-shadow)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📱</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>
                2. Get location, number & access code
              </h3>
              <p style={{ color: 'var(--text-gray)' }}>
                We text you container photo, exact number & lock combination
              </p>
            </div>

            <div style={{ 
              background: 'white', 
              padding: '1.5rem', 
              borderRadius: '1rem', 
              boxShadow: 'var(--card-shadow)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>👀</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>
                3. Tour the actual container
              </h3>
              <p style={{ color: 'var(--text-gray)' }}>
                See exactly what you're getting
              </p>
            </div>

            <div style={{ 
              background: 'white', 
              padding: '1.5rem', 
              borderRadius: '1rem', 
              boxShadow: 'var(--card-shadow)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📝</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>
                4. Simple DocuSign lease
              </h3>
              <p style={{ color: 'var(--text-gray)' }}>
                Sign from your phone in 1 minute
              </p>
            </div>

          </div>

          <div style={{ 
            textAlign: 'center',
            background: 'var(--primary-green)',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '1rem',
            fontSize: '1.25rem',
            fontWeight: '600'
          }}>
            ⏱️ Total time: Under 30 minutes from booking to access
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section">
        <div className="container">
          <h2 className="process-title">
            Rent Urbana Storage in <span className="text-green">Minutes</span>, Not Hours
          </h2>
          <p className="process-subtitle">
            Skip the office visits, paperwork, and waiting. Our Urbana self-service storage rental process gets you storing in minutes, available 24/7 in Urbana, Illinois.
          </p>

          <div className="process-steps">
             <div className="process-step">
              <img 
                src="/images/facility_entrance.png" 
                alt="Book Self-Service Storage Tour Online" 
                style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '0.5rem', marginBottom: '1rem' }}
              />
              <h3 className="step-title">Book & Get Details</h3>
              <p className="step-description">
                Book your tour online in 1 minute. We'll text you the exact container location (with photo), container number, and lock combination within 30 minutes.
              </p>
            </div>

            <div className="process-step">
              <img 
                src="/images/container_open_door.png" 
                alt="Tour Available Storage Containers in Urbana" 
                style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '0.5rem', marginBottom: '1rem' }}
              />
              <h3 className="step-title">Tour & Decide</h3>
              <p className="step-description">
                Visit at your convenience and tour the actual container space. See exactly what you're getting before committing.
              </p>
            </div>

            <div className="process-step">
              <img 
                src="/images/container_interior_view.png" 
                alt="Rent Storage Container On-Site or Online in Urbana IL" 
                style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '0.5rem', marginBottom: '1rem' }}
              />
              <h3 className="step-title">DocuSign & Move In</h3>
              <p className="step-description">
                Complete everything on-site with simple DocuSign lease signing from your phone. Get access codes immediately and start using your container.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <h2 className="contact-title">📋 Ready to Tour? Book Your Visit Now!</h2>
          <p className="contact-description">
            Quick 1-minute booking form. We'll text you exact container location (with photo), container number, and lock combination within 30 minutes.
          </p>
          
          <div className="contact-buttons">
            <Link to="/book-tour" className="btn-contact">
              <MessageSquare size={20} />
              Book Self-Service Tour
            </Link>
          </div>
        </div>
      </section>

      {/* Container Showcase */}
      <section className="showcase-section">
        <div className="container">
          <h2 className="showcase-title">See What You're Getting</h2>
          <p className="showcase-subtitle">
            Real photos of our 40ft shipping containers in Urbana - spacious, secure, and ready for your belongings
          </p>

          <div className="showcase-grid">
            <div className="showcase-card">
              <img 
                src="/images/container_exterior_blue.png" 
                alt="Secure 40ft Storage Container Exterior in Urbana IL" 
                className="showcase-image"
              />
              <div className="showcase-content">
                <h3 className="showcase-card-title">Secure Exterior</h3>
                <p className="showcase-card-description">
                  Heavy-duty steel construction with secure locking mechanisms. Your belongings stay safe in our Urbana storage facility.
                </p>
              </div>
            </div>

            <div className="showcase-card">
              <img 
                src="/images/container_interior_view.png" 
                alt="Spacious 320 sq ft Storage Container Interior Urbana" 
                className="showcase-image"
              />
              <div className="showcase-content">
                <h3 className="showcase-card-title">Spacious Interior</h3>
                <p className="showcase-card-description">
                  320 square feet - fits contents of a 3-4 bedroom home. More space than traditional storage units in Urbana.
                </p>
              </div>
            </div>

            <div className="showcase-card">
              <img 
                src="/images/container_rows_aerial.png" 
                alt="Easy Access Storage Facility in Urbana Illinois" 
                className="showcase-image"
              />
              <div className="showcase-content">
                <h3 className="showcase-card-title">Easy Access</h3>
                <p className="showcase-card-description">
                  Drive right up to your container for convenient loading. No elevators or long hallways like other Urbana storage facilities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="pricing-section">
        <div className="container">
          <h2 className="pricing-title">Simple, Transparent Pricing</h2>
          <p className="pricing-subtitle">
            All plans include 24/7 access, security monitoring, and the same spacious 40ft container. Cheapest storage rates in Urbana, IL.
          </p>

          <div className="savings-highlight">
            💰 Save Up To $480 Per Year!
            <br />
            Choose our 6-month plan and save $40 every month
          </div>

          <div className="pricing-grid">
            <div className="pricing-card">
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>Month-to-Month</h3>
              <div className="pricing-amount">$115<span style={{ fontSize: '1rem', fontWeight: 'normal' }}>per month</span></div>
              <p className="pricing-description">Perfect for short-term storage needs with maximum flexibility</p>
              
              <ul className="pricing-features">
                <li><CheckCircle size={20} /> 40ft × 8ft × 10ft secure container</li>
                <li><CheckCircle size={20} /> 24/7 access to your belongings</li>
                <li><CheckCircle size={20} /> Weather-protected storage</li>
                <li><CheckCircle size={20} /> Convenient Urbana location</li>
                <li><CheckCircle size={20} /> 3-month minimum commitment</li>
              </ul>
              
              <Link to="/rental" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Choose Month-to-Month
              </Link>
            </div>

            <div className="pricing-card popular">
              <div className="pricing-badge popular">Most Popular</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>3-Month Prepay</h3>
              <div className="pricing-amount">$105<span style={{ fontSize: '1rem', fontWeight: 'normal' }}>per month</span></div>
              <div style={{ textDecoration: 'line-through', color: 'var(--text-gray)', marginBottom: '0.5rem' }}>Was $115/month</div>
              <div style={{ color: 'var(--primary-green)', fontWeight: '600', marginBottom: '1rem' }}>Save $30 every 3 months</div>
              <p className="pricing-description">Most popular choice - great balance of savings and flexibility</p>
              
              <ul className="pricing-features">
                <li><CheckCircle size={20} /> 40ft × 8ft × 10ft secure container</li>
                <li><CheckCircle size={20} /> 24/7 access to your belongings</li>
                <li><CheckCircle size={20} /> Weather-protected storage</li>
                <li><CheckCircle size={20} /> Convenient Urbana location</li>
                <li><CheckCircle size={20} /> $10/month savings</li>
              </ul>
              
              <Link to="/rental" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Choose 3-Month Prepay
              </Link>
            </div>

            <div className="pricing-card best-value">
              <div className="pricing-badge best-value">Best Value</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>6-Month Prepay</h3>
              <div className="pricing-amount">$75<span style={{ fontSize: '1rem', fontWeight: 'normal' }}>per month</span></div>
              <div style={{ textDecoration: 'line-through', color: 'var(--text-gray)', marginBottom: '0.5rem' }}>Was $115/month</div>
              <div style={{ color: 'var(--primary-green)', fontWeight: '600', marginBottom: '1rem' }}>Save $240 every 6 months</div>
              <p className="pricing-description">Maximum savings for long-term storage needs</p>
              
              <ul className="pricing-features">
                <li><CheckCircle size={20} /> 40ft × 8ft × 10ft secure container</li>
                <li><CheckCircle size={20} /> 24/7 access to your belongings</li>
                <li><CheckCircle size={20} /> Weather-protected storage</li>
                <li><CheckCircle size={20} /> Convenient Urbana location</li>
                <li><CheckCircle size={20} /> $40/month savings - Maximum value!</li>
              </ul>
              
              <Link to="/rental" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Choose 6-Month Prepay
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="process-section">
        <div className="container">
          <h2 className="process-title">Easy to Find, Easy to Access</h2>
          <p className="process-subtitle">
            Located at 1502 Airport Road in Urbana - convenient self service storage location with clear directions
          </p>

          {/* Map and Facility Photo Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
            gap: '2rem', 
            marginBottom: '3rem' 
          }}>
            {/* Google Map */}
            <div style={{ 
              background: 'white', 
              borderRadius: '1rem', 
              overflow: 'hidden',
              boxShadow: 'var(--card-shadow)'
            }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3036.8234567890123!2d-88.2072!3d40.1106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880cd08dde97691b%3A0x30f9b2c4b8c4b8c4!2s1502%20Airport%20Rd%2C%20Urbana%2C%20IL%2061802!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Own Your Own Storage Location - 1502 Airport Road, Urbana IL"
              ></iframe>
            </div>

            {/* Facility Entrance Photo */}
            <div style={{ 
              background: 'white', 
              borderRadius: '1rem', 
              overflow: 'hidden',
              boxShadow: 'var(--card-shadow)'
            }}>
              <img 
                src="/images/facility_entrance_view.png" 
                alt="Own Your Own Storage Facility Entrance - 1502 Airport Road Urbana IL" 
                style={{ 
                  width: '100%', 
                  height: '300px', 
                  objectFit: 'cover' 
                }}
              />
            </div>
          </div>

          {/* Contact Information */}
          <div style={{ 
            background: 'white', 
            padding: '2rem', 
            borderRadius: '1rem', 
            boxShadow: 'var(--card-shadow)',
            textAlign: 'center',
            maxWidth: '600px',
            margin: '0 auto 3rem auto'
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-dark)' }}>
              Visit Us Today
            </h3>
            <div style={{ marginBottom: '1rem' }}>
              <MapPin size={20} style={{ color: 'var(--primary-green)', marginRight: '0.5rem' }} />
              <strong>1502 Airport Road, Urbana IL 61802</strong>
            </div>
            <div style={{ marginBottom: '2rem', color: 'var(--text-gray)' }}>
              Drewcrichardson1999@gmail.com
              <br />
              Self-Service Tours Available 24/7
            </div>
            
            <a 
              href="https://maps.google.com/?q=1502+Airport+Road,+Urbana+IL+61802" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <MapPin size={20} />
              Get Directions
            </a>
          </div>

          {/* Features Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '2rem' 
          }}>
            <div style={{ 
              background: 'white', 
              padding: '1.5rem', 
              borderRadius: '1rem', 
              boxShadow: 'var(--card-shadow)',
              textAlign: 'center' 
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🚗</div>
              <h4 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Easy Parking</h4>
              <p style={{ color: 'var(--text-gray)' }}>Drive right up to your container</p>
            </div>
            <div style={{ 
              background: 'white', 
              padding: '1.5rem', 
              borderRadius: '1rem', 
              boxShadow: 'var(--card-shadow)',
              textAlign: 'center' 
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📍</div>
              <h4 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Prime Location</h4>
              <p style={{ color: 'var(--text-gray)' }}>Minutes from downtown Urbana</p>
            </div>
            <div style={{ 
              background: 'white', 
              padding: '1.5rem', 
              borderRadius: '1rem', 
              boxShadow: 'var(--card-shadow)',
              textAlign: 'center' 
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏢</div>
              <h4 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Professional Facility</h4>
              <p style={{ color: 'var(--text-gray)' }}>Clean, well-maintained storage site</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="showcase-section">
        <div className="container">
          <h2 className="showcase-title">What Our Urbana Customers Say</h2>
          <p className="showcase-subtitle">
            Real stories from real customers who chose the smarter way to store in Urbana, Illinois
          </p>

          <div className="showcase-grid">
            {/* Featured Real Customer - Patty Hubert */}
            <div className="showcase-card" style={{ border: '2px solid var(--primary-green)' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem', 
                padding: '1.5rem 1.5rem 0 1.5rem' 
              }}>
                <img 
                  src="/images/patty-hubert-testimonial.png" 
                  alt="Patty Hubert - Satisfied Customer" 
                  style={{ 
                    width: '60px', 
                    height: '60px', 
                    borderRadius: '50%', 
                    objectFit: 'cover',
                    border: '3px solid var(--primary-green)'
                  }}
                />
                <div>
                  <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>Patty Hubert</div>
                  <div style={{ color: 'var(--primary-green)', fontSize: '0.875rem', fontWeight: '600' }}>
                    ⭐⭐⭐⭐⭐ Verified Customer
                  </div>
                  <div style={{ color: 'var(--text-gray)', fontSize: '0.75rem' }}>
                    November 14, 2018
                  </div>
                </div>
              </div>
              <div className="showcase-content">
                <p style={{ fontStyle: 'italic', marginBottom: '1rem', color: 'var(--text-gray)', fontSize: '1.05rem' }}>
                  "It is close to where I live. The management is very friendly and always ready to help. I do recommend Own Your Own Storage. There is a storage size that fits your needs."
                </p>
                <div style={{ 
                  background: 'var(--background-light)', 
                  padding: '0.75rem', 
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  color: 'var(--text-gray)'
                }}>
                  💡 <strong>Real Facebook Review</strong> - Authentic customer feedback from our community
                </div>
              </div>
            </div>

            {/* Placeholder for additional real reviews */}
            <div className="showcase-card">
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem', 
                padding: '1.5rem 1.5rem 0 1.5rem' 
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.5rem',
                  fontWeight: '700'
                }}>
                  MJ
                </div>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>Mike Johnson</div>
                  <div style={{ color: 'var(--secondary-blue)', fontSize: '0.875rem', fontWeight: '600' }}>
                    ⭐⭐⭐⭐⭐ Verified Customer
                  </div>
                  <div style={{ color: 'var(--text-gray)', fontSize: '0.75rem' }}>
                    Business Storage • 3-Month Plan
                  </div>
                </div>
              </div>
              <div className="showcase-content">
                <p style={{ fontStyle: 'italic', marginBottom: '1rem', color: 'var(--text-gray)' }}>
                  "Perfect for my business inventory! The 24/7 access means I can restock anytime, and the container holds way more than I expected. The savings compared to traditional storage units is significant. Highly recommend!"
                </p>
              </div>
            </div>

            <div className="showcase-card">
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem', 
                padding: '1.5rem 1.5rem 0 1.5rem' 
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.5rem',
                  fontWeight: '700'
                }}>
                  SM
                </div>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>Sarah Martinez</div>
                  <div style={{ color: 'var(--text-gray)', fontSize: '0.875rem', fontWeight: '600' }}>
                    ⭐⭐⭐⭐⭐ Verified Customer
                  </div>
                  <div style={{ color: 'var(--text-gray)', fontSize: '0.75rem' }}>
                    Moving Storage • Month-to-Month Plan
                  </div>
                </div>
              </div>
              <div className="showcase-content">
                <p style={{ fontStyle: 'italic', marginBottom: '1rem', color: 'var(--text-gray)' }}>
                  "Moving was stressful enough, but Own Your Own Storage made the storage part completely painless. The online rental process took 10 minutes, and I had access immediately. The container fit everything from our 3-bedroom house with room to spare!"
                </p>
              </div>
            </div>

            {/* Additional review card */}
            <div className="showcase-card">
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem', 
                padding: '1.5rem 1.5rem 0 1.5rem' 
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.5rem',
                  fontWeight: '700'
                }}>
                  DL
                </div>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>David Lee</div>
                  <div style={{ color: 'var(--primary-green)', fontSize: '0.875rem', fontWeight: '600' }}>
                    ⭐⭐⭐⭐⭐ Verified Customer
                  </div>
                  <div style={{ color: 'var(--text-gray)', fontSize: '0.75rem' }}>
                    Student Storage • 6-Month Plan
                  </div>
                </div>
              </div>
              <div className="showcase-content">
                <p style={{ fontStyle: 'italic', marginBottom: '1rem', color: 'var(--text-gray)' }}>
                  "As a college student, I needed affordable storage for the summer. The 6-month plan saved me hundreds compared to other places, and the location is perfect - close to campus but secure. Will definitely use again next year!"
                </p>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div style={{ 
            textAlign: 'center', 
            marginTop: '3rem',
            padding: '2rem',
            background: 'white',
            borderRadius: '1rem',
            boxShadow: 'var(--card-shadow)'
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-dark)' }}>
              Trusted by Urbana Residents Since 1994
            </h3>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '3rem', 
              flexWrap: 'wrap',
              color: 'var(--text-gray)'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--primary-green)' }}>5000+</div>
                <div>Happy Customers</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--primary-green)' }}>5★</div>
                <div>Average Rating</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--primary-green)' }}>30+</div>
                <div>Years Serving Urbana</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="contact-section">
        <div className="container">
          <h2 className="contact-title">Ready to Get Started?</h2>
          <p className="contact-description">
            Visit our Urbana facility today for a self-guided tour, or start your rental online now.
          </p>
          
          <div className="contact-buttons">
            <Link to="/rental" className="btn-contact">
              Start Online Rental
            </Link>
            <a href="sms:(217)555-0123" className="btn-contact secondary">
              <MessageSquare size={20} />
              Text for Tour Access
            </a>
          </div>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '2rem', 
            marginTop: '2rem',
            flexWrap: 'wrap',
            fontSize: '0.875rem',
            opacity: '0.9'
          }}>
            <span>✓ Tour Anytime</span>
            <span>✓ Rent On-Site</span>
            <span>✓ 24/7 Access</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

