import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{height: "12px"}}>
      <p>Copyright ⓒ {year}</p>
    </footer>
  );
}

export default Footer;
