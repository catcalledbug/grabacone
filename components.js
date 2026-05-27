// Defines Vue.js components for reusable header and footer modules for both small and large viewports.

document.addEventListener('DOMContentLoaded', () => {
  // Small viewport header component
    const SmHeader = {
    name: 'SmHeader',
    data() {
        return {
          show: false 
        };
      },
      methods: {
        toggleMenu() {
          this.show = !this.show; // toggle visibility
        }
      },
    template:
            `<header>
            <a tabindex='0' href="./index.html"> <img id="logo" src="./imgs/logo-colored.png" alt="Grab A Cone logo"></a>
                <button tabindex='0' aria-haspopup="true" id="menu-btn" @click="toggleMenu" v-if="!show">𑁔</button>
                <button tabindex='0' id="exit-menu-btn" @click="toggleMenu" class="" v-if="show">×</button>
                <Transition name="slide-down">  
                        <nav id="nav-menu" v-if="show" class="{ show }">
                            <ul id="nav-list"> 
                                <li class="list-item"><a href="./index.html" tabindex='0'>Home</a></li>
                                <li class="list-item"><a href="./flavors.html" tabindex='0'>Flavors</a></li>
                                <li class="list-item"><a @click="toggleMenu" id="link-hours" href="./index.html#jump-hours" tabindex='0'>Hours</a></li>
                                <li class="list-item"><a @click="toggleMenu" id="link-about" href="./index.html#jump-about" tabindex='0'>About Us</a></li>
                            </ul>
                        </nav>
            </Transition>
            </header>`
    }
    // Small viewport footer component
    const SmFooter = {
        name: 'SmFooter',
        template: 
            `<footer>
                <a class="jump-anchor" id="jump-hours"></a>
                <h1 class="footer-header">Hours</h1>
                <div class="hours-wrapper">
                    <div class="hours">
                        <p>MON-FRI</p>
                        <p>4PM-9PM</p>
                    </div>
                    <div class="hours">
                        <p>SAT+SUN</p>
                        <p>1PM-9PM</p>
                    </div>
                </div>
                <a target="_blank" href="https://goo.gl/maps/79J3kVhYxK37Tf7P8">
                    <div class='mini-map'><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2919.5704650236166!2d-90.43491838475161!3d42.96625540459576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87fd10ef434d3cb7%3A0x693b932a73ecbc2!2sGrab%20A%20Cone!5e0!3m2!1sen!2sus!4v1678313467975!5m2!1sen!2sus" width="300" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
                </a>
                <h1 class="footer-header">Find Us</h1>
                <div class="info-wrapper">
                    <a target="_blank" href="https://goo.gl/maps/79J3kVhYxK37Tf7P8" id="address">102 US Highway 18 <br> Montfort, WI 53569</a>
                    <a href="tel:+16083303377" id="phone">608-330-3377</a>
                </div>
                <div class="footer-socials-wrapper">
                    <a target="_blank" id="fb-icon" href="https://www.facebook.com/profile.php?id=100057554945422" alt="Link to Grab a Cone's Facebook page">
                        <img loading="lazy" src="./assets/facebook.png" width="35" />
                    </a>
                    <a target="_blank" id="insta-icon" href="https://www.instagram.com/grabacone/" alt="Link to Grab a Cone's Facebook page">
                        <img loading="lazy" src="./assets/instagram.svg" width="35" />
                    </a>
                </div>
            </footer>`
    }
    // Large viewport header component
    const LgHeader = {
      name: 'LgHeader',
      template: 
        `<header>
            <a tabindex='0' href="./index.html"> <img id="logo" src="./imgs/logo-colored-large.png" alt="Grab A Cone logo"></a>
            <nav id="nav-menu">
                <ul id="nav-list"> 
                    <li class="list-item"><a href="./index.html" tabindex='0'>Home</a></li>
                    <li class="list-item"><a href="./flavors.html" tabindex='0'>Flavors</a></li>
                    <li class="list-item"><a id="link-hours" href="./index.html#jump-hours-lg" tabindex='0'>Hours + Location</a></li>
                    <li class="list-item"><a id="link-about" href="./index.html#jump-about" tabindex='0'>About Us</a></li>
                </ul>
            </nav>
        </header>`
  }
  // Large viewport footer component
  const LgFooter = {
    name: 'LgFooter',
    template: 
    `<footer>
        <a class="jump-anchor" id="jump-hours-lg"></a>
        <div class="footer-container">
            <h1 class="footer-header">Hours</h1>
            <div class="hours-wrapper">
                <div class="hours">
                    <p>MON-FRI</p>
                    <p>4PM-9PM</p>
                </div>
                <div class="hours">
                    <p>SAT+SUN</p>
                    <p>1PM-9PM</p>
                </div>
            </div>
        </div>
        
        <div class="map-container">
            <a target="_blank" href="https://goo.gl/maps/79J3kVhYxK37Tf7P8">
                <div class='mini-map'><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2919.5704650236166!2d-90.43491838475161!3d42.96625540459576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87fd10ef434d3cb7%3A0x693b932a73ecbc2!2sGrab%20A%20Cone!5e0!3m2!1sen!2sus!4v1678313467975!5m2!1sen!2sus" width="300" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
            </a>
        </div>

        <div class="footer-container">
            <h1 class="footer-header">Find Us</h1>
            <div class="info-wrapper">
                <a target="_blank" href="https://goo.gl/maps/79J3kVhYxK37Tf7P8" id="address">102 US Highway 18 <br> Montfort, WI 53569</a>
                <a href="tel:+16083303377" id="phone">608-330-3377</a>
            </div>
            <div class="footer-socials-wrapper">
                <a target="_blank" id="fb-icon" href="https://www.facebook.com/profile.php?id=100057554945422" alt="Link to Grab a Cone's Facebook page">
                    <img loading="lazy" src="./assets/facebook.png" width="35" />
                </a>
                <a target="_blank" id="insta-icon" href="https://www.instagram.com/grabacone/" alt="Link to Grab a Cone's Facebook page">
                    <img loading="lazy" src="./assets/instagram.svg" width="35" />
                </a>
            </div>
        </div>
    </footer>`
}

    // creates vue app and registers each header/footer component
    const app = Vue.createApp({
        components: {
            'sm-header': SmHeader,
            'sm-footer': SmFooter,
            'lg-header': LgHeader,
            'lg-footer': LgFooter
        }
    
    }).mount('#app'); // mounts to #app element
});