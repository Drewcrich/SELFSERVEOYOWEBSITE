import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Warehouse, Package, Calendar } from 'lucide-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header style={{ 
      background: 'white', 
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '0 1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '4rem'
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            textDecoration: 'none',
            transition: 'all 0.3s ease'
          }}>
            <Warehouse size={32} style={{ color: 'var(--primary-green)' }} />
            <span style={{ 
              marginLeft: '0.75rem', 
              fontSize: '1.5rem', 
              fontWeight: '700', 
              color: 'var(--text-dark)',
              background: 'linear-gradient(135deg, var(--primary-green), var(--secondary-blue))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              OwnYourOwnStorage
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav style={{ 
          display: 'none',
          gap: '2rem',
          alignItems: 'center'
        }} className="desktop-nav">
          <Link
            to="/book-tour"
            className="btn-primary"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              textDecoration: 'none'
            }}
          >
            <Calendar size={18} />
            Book Tour
          </Link>
        </nav>

        {/* Mobile menu button */}
        <div style={{ display: 'flex', alignItems: 'center' }} className="mobile-menu-button">
          <button
            type="button"
            onClick={toggleMobileMenu}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.5rem',
              borderRadius: '0.5rem',
              color: 'var(--text-gray)',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgba(34, 197, 94, 0.1)';
              e.target.style.color = 'var(--primary-green)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = 'var(--text-gray)';
            }}
            aria-expanded="false"
          >
            <span style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', borderWidth: 0 }}>
              Open main menu
            </span>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div style={{ 
          background: 'white',
          borderTop: '1px solid #e5e7eb',
          padding: '1rem'
        }} className="mobile-menu">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Link
              to="/book-tour"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: '600',
                color: 'white',
                background: 'var(--primary-green)',
                transition: 'all 0.3s ease'
              }}
            >
              <Calendar size={20} />
              Book Tour
            </Link>
          </div>
        </div>
      )}

      <style jsx>{`
        @media (min-width: 640px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-button {
            display: none !important;
          }
        }
        @media (max-width: 639px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-button {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;

