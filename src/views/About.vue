<template>
  <div class="about">
        <v-parallax
            src="images/about/hardware.jpg"
        >
            <v-row
                align="center"
                justify="center"
            >
                <v-col class="text-center" cols="12">
                <h1 class="display-1 font-weight-thin mb-4">About sulten.se</h1>
                <h4 class="subheading">Your digital lunch pal...</h4>
                </v-col>
            </v-row>
        </v-parallax>
    <h1>About</h1>
    
  <v-card>
    <v-card-text>
        
        <p>
            The word <i>sulten</i> is a Scanian (Sk&aring;nskt) dialectal word for "hungry". The domain name summarizes pretty much what the site is about:
            a place to go for lunch. Or, at least virtually visit before deciding where to go for a real meal!
        </p>
        <p>
            From a hardware perspective, the site is set up and configured on a Raspberry Pi 3B+. 
        </p>
        <p>The host holds a minimal distribution of Raspbian 
            Buster (a Linux Debian distro), SSL, NGINX, MariaDB, PHP, Node.js-server, PM2 (daemon process manager for Node.js), Node-red.
        </p>

        <p>
            The backend project, <i>sulten</i>, is a Node.js-application written in Typescript. The main purpose of the backend is to act as an analyzing 
            business logic while ferreting lunch data out from different restaurants' web pages in Malmö and Lund. After the raw data has been collected,
            it's analyzed and prepared for storage in a database before re-distribution as structured JSON to different clients via a REST API.
        </p>

        <p>
            Since there does not exist any standard format for how lunch menus are presented on different web pages, there was a need for pretty
            sophisticated usage of XPaths and Regular Expressions. Sometimes, menus were distributed as PDF, other as HTML.
        </p>
        <p>
            The frontend part, <i>eida</i> (also a play with a Scanian phonetic for eat), is written in VueJS 2.6 with typescript.
            For material styling/behavior, Vuetify 2 framework was used.
        </p>
        <p>
            <b>Key words:</b> Node.js, Typescript, node-red/javascript, HTML, PDF, HTTP GET, data buffer REST, JSON, XPath, Regular Expression,
            SQL, Stored Procedures, PHP, RSS feed, VueJS, Vuex, Vuetify, CSS 3, HTTPS
        </p>


        <p>
            <b>Infrastructure:</b> Raspbian Buster, SSL, NGINX, MariaDB, Node.js-server, PM2, SSH, Putty, WinSCP, HeidiSQL, PHPMyAdmin
        </p>


        <p>
            Both sulten and project is open source and can be found on GitHub.
        </p>

    </v-card-text>
  </v-card>

    <div>Icons made by <a href="https://www.flaticon.com/authors/flat-icons" title="Flat Icons">Flat Icons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
  </div>
  
</template>
