import React from "react";
import { MDBFooter } from "mdb-react-ui-kit";

function Footer() {
  <MDBFooter bgColor='light' className='text-center text-lg-left'>
      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}>
        &copy; {new Date().getFullYear()} Copyright:{' '}
        <a className='text-dark' href='/'>
          Noticify
        </a>
      </div>
  </MDBFooter>
}

export default Footer;
