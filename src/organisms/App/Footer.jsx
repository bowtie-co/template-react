import React from 'react';
import { Row, Col } from 'reactstrap';
import { es } from '../../lib';

export const AppFooter = ({ children, ...props }) => {
  // console.debug('AppFooter', { props });

  return (
    <section className='AppFooter footer-section'>
      <Row className='text-center'>
        <Col sm='12'>
          <div className='mt-4'>
            <span>{es.footer.powered_by}</span>
            <br />
            <span>{es.footer.support_msg} <a href='mailto:info@bowtie.co'>info@bowtie.co</a></span>
          </div>
        </Col>
      </Row>
    </section>
  );
};
