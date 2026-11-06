export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__bottom container">
        <p>
          &copy; {year} Graceselle Managing &middot; UI/UX Designer &middot; Made with purple
          hearts.
        </p>
        <button
          id="backToTop"
          className="back-to-top"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <i className="fa-solid fa-arrow-up" />
        </button>
      </div>
    </footer>
  );
}
