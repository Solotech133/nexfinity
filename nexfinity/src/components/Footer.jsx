export default function Footer() {
  return (
    <footer>
      <div className="wrap">
       <img src="/icons/logo.png" alt="Nexfinity" className="footer-logo" />
        <span>© {new Date().getFullYear()} Nexfinity. All rights reserved.</span>
       
      </div>
    </footer>
  );
}