/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* It tests to make sure that each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('all feed has url', function() {
            for (feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url).toEqual(jasmine.stringMatching('http://'));
              }
        });



        /* It tests to make sure that each feed has a name defined
         * and that the name is not empty.
         */
        it('all feed has name', function() {
            for (feed of allFeeds) {
                expect(feed.name).toBeDefined();
                if (feed.name != null) {
                    expect(feed.name.trim().length).toBeGreaterThan(0);
                }
              }
        });
    });


    /*
    * This suite is all about the Menu.
    */
    describe('The menu', function() {

        /* Test that ensures the menu element is
         * hidden by default when the page load
         */
        it('menu start hidden', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);

        });

         /* Test menu display when
          * clicked and does it hide when clicked again.
          */
        it('menu show/hidden on click', function() {
            $('a.menu-icon-link').trigger('click'); // show menu
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('a.menu-icon-link').trigger('click'); // hide menu again
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

    });

    /*
    * This suite is all about the Initial Entries.
    */
    describe('Initial Entries', function() {

        /* Test loadFeed function is called and completes its work
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

         it('is loading feed', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });


    });

    /*
    * This suite is all about the New Feed Selection
    */
    describe('New Feed Selection', function() {
        let firstFeedLoaded;
        beforeEach(function(done) {
            loadFeed(0, function() {
                firstFeedLoaded =  $('.feed').html();

                loadFeed(1, function() {
                    done();
                });
            });
        });
        /* Test loadFeed
         */
        it('is loading feed', function() {
            expect($('.feed').html()).not.toBe(firstFeedLoaded);
        });
    });
}());
