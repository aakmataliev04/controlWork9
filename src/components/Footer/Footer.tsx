import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer id="footer">
      <div className="container">
        <div className="abt">
          <h3>About IsItWP</h3>
          <div className="desc">
            IsItWP is a free online resource that offers WordPress tutorials, tools, product reviews, and other
            resources to help you build a better WordPress website.
          </div>
          <div className="iiwp-language-switcher" style={{minWidth: '170px'}}>
            <span className="current-lang" data-iso="en">
              <img
                src="https://www.isitwp.com/wp-content/themes/isitwpv4/assets/images/globe.svg"
                width="24"
                height="24"
                alt=""
                className="entered lazyloaded"
              />
              <noscript>
                <img
                  src="https://www.isitwp.com/wp-content/themes/isitwpv4/assets/images/globe.svg"
                  width="24"
                  height="24"
                  alt=""
                />
              </noscript>
              English
            </span>
          </div>
        </div>
        <div className="mnu">
          <h3>Site Links</h3>
          <ul>
            <li>
              <span title="-- Sections --">-- Sections --</span>
              <ul className="sub-sub">
                <li><a title="Best WordPress Plugins" href="https://www.isitwp.com/top-wordpress-plugins/">Best
                  WordPress Plugins</a></li>
                <li><a title="Best WordPress Themes" href="https://www.isitwp.com/top-wordpress-themes/">Best WordPress
                  Themes</a></li>
                <li><a title="Best Web Hosting Reviews" href="https://www.isitwp.com/hosting-reviews/">Best Web Hosting
                  Reviews</a></li>
                <li><a title="Best WordPress Hosting Reviews" href="https://www.isitwp.com/hosting-reviews/wordpress/">Best
                  WordPress Hosting Reviews</a></li>
                <li><a title="Best Cheap Hosting Reviews"
                       href="https://www.isitwp.com/hosting-reviews/cheap-hosting-reviews/">Best Cheap Hosting
                  Reviews</a></li>
                <li><a title="Best Free Web Hosting Reviews"
                       href="https://www.isitwp.com/hosting-reviews/free-web-hosting/">Best Free Web Hosting Reviews</a>
                </li>
                <li><a title="WooCommerce Hosting Reviews" href="https://www.isitwp.com/hosting-reviews/woocommerce/">WooCommerce
                  Hosting Reviews</a></li>
                <li><a title="Best Blog Hosting Reviews" href="https://www.isitwp.com/hosting-reviews/blog/">Best Blog
                  Hosting Reviews</a></li>
                <li><a title="eCommerce Hosting Reviews" href="https://www.isitwp.com/hosting-reviews/ecommerce/">eCommerce
                  Hosting Reviews</a></li>
                <li><a title="Best Reseller Hosting Reviews" href="https://www.isitwp.com/hosting-reviews/reseller/">Best
                  Reseller Hosting Reviews</a></li>
                <li><a title="Managed WP Hosting Reviews"
                       href="https://www.isitwp.com/hosting-reviews/managed-wordpress-hosting-reviews/">Managed WP
                  Hosting Reviews</a></li>
                <li><a title="Best VPS Hosting Reviews" href="https://www.isitwp.com/hosting-reviews/vps/">Best VPS
                  Hosting Reviews</a></li>
                <li><a title="Best Dedicated Hosting Reviews" href="https://www.isitwp.com/hosting-reviews/dedicated/">Best
                  Dedicated Hosting Reviews</a></li>
              </ul>
            </li>
            <li>
              <span title="-- Reviews --">-- Reviews --</span>
              <ul className="sub-sub">
                <li><a title="Bluehost Review" href="https://www.isitwp.com/hosting-reviews/bluehost-review/">Bluehost
                  Review</a></li>
                <li><a title="SiteGround Review" href="https://www.isitwp.com/hosting-reviews/siteground-review/">SiteGround
                  Review</a></li>
                <li><a title="DreamHost Review" href="https://www.isitwp.com/hosting-reviews/dreamhost-review/">DreamHost
                  Review</a></li>
                <li><a title="WPEngine Review" href="https://www.isitwp.com/hosting-reviews/wpengine-review/">WPEngine
                  Review</a></li>
                <li><a title="HostGator Review" href="https://www.isitwp.com/hosting-reviews/hostgator-review/">HostGator
                  Review</a></li>
              </ul>
            </li>
            <li>
              <span title="-- Coupons --">-- Coupons --</span>
              <ul className="sub-sub">
                <li><a title="WPEngine Coupon" href="https://www.isitwp.com/coupons/wpengine/">WPEngine Coupon</a></li>
                <li><a title="SiteGround Coupon" href="https://www.isitwp.com/coupons/siteground/">SiteGround Coupon</a>
                </li>
                <li><a title="Bluehost Coupon" href="https://www.isitwp.com/coupons/bluehost/">Bluehost Coupon</a></li>
                <li><a title="WPForms Coupon" href="https://www.isitwp.com/coupons/wpforms/">WPForms Coupon</a></li>
                <li><a title="GoDaddy Coupon" href="https://www.isitwp.com/coupons/godaddy/">GoDaddy Coupon</a></li>
                <li><a title="DreamHost Coupon" href="https://www.isitwp.com/coupons/dreamhost/">DreamHost Coupon</a>
                </li>
                <li><a title="GreenGeeks Coupon" href="https://www.isitwp.com/coupons/greengeeks/">GreenGeeks Coupon</a>
                </li>
                <li><a title="HostGator Coupon" href="https://www.isitwp.com/coupons/hostgator/">HostGator Coupon</a>
                </li>
                <li><a title="iPage Coupon" href="https://www.isitwp.com/coupons/ipage/">iPage Coupon</a></li>
                <li><a title="InMotion Hosting Coupon" href="https://www.isitwp.com/coupons/inmotion-hosting/">InMotion
                  Hosting Coupon</a></li>
                <li><a title="OptinMonster Coupon" href="https://www.isitwp.com/coupons/optinmonster/">OptinMonster
                  Coupon</a></li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="cmp">
          <h3>Company</h3>
          <div className="desc">
            <a href="#">About Us</a>
            <a href="#">Contact Us</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">FTC Disclosure</a>
            <a href="#">Sitemap</a>
          </div>
        </div>
        <div className="os">
          <h3>Our Sites</h3>
          <div className="desc">
            <a rel="noopener noreferrer" href="#">OptinMonster</a>
            <a rel="noopener noreferrer" href="#">WPForms</a>
            <a rel="noopener noreferrer" href="#">MonsterInsights</a>
            <a rel="noopener noreferrer" href="#">SeedProd</a>
            <a rel="noopener noreferrer" href="#">RafflePress</a>
            <a rel="noopener noreferrer" href="#">WP Mail SMTP</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
