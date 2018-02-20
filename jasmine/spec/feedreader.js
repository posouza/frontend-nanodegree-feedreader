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
    /* This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* Tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Tests to make sure all feeds have proper URL links and are
         * not empty.
         */
        it('have proper URLs', function(){
            allFeeds.forEach(function(value){
                expect(value.url).toBeDefined();
                expect(value.url).not.toBe('');
            });
        });


        /* Tests whether all feeds have names. */
        it('have names', function(){
            allFeeds.forEach(function(value){
                expect(value.name).toBeDefined();
                expect(value.name).not.toBe('');
            }); 
        });
    });

    /* Menu Test Suite */
    describe('The menu', function(){
        /* This suite is related to the Menu that controls the 
         * switching of the feeds.
         */
        var body;
        beforeEach(function(){
            body = document.getElementsByTagName('body')[0];
        });

        /* Test that ensures the menu element is
         * hidden by default.
         */
         it('is hidden by default', function(){
            expect($('body').hasClass('menu-hidden')).toBe(true);
         });

         /* Test that ensures the menu changes visibility when the menu 
          * icon is clicked and does it revert when clicked again.
          */
          it('toggles visibility when clicked', function(){
            var menuItem = $('.menu-icon-link').first();
            menuItem.click();
            expect($('body').hasClass('menu-hidden')).not.toBe(true);
            menuItem.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
          });
    });

    /* Initial Entries Test Suite" */
    describe('Initial Entries', function(){
        /* Test suite related to the initial entries loaded by each feed */
        var feedEntry;
        beforeEach(function(done){
            loadFeed(0, done);
        });

        /* Test that ensures when the loadFeed function is called and completes
         * its work, there is at least a single .entry element within the .feed 
         * container.
         */
        it('have an asynchronous function called loadFeed that loads at least one entry into the feed container.', function(){
            feedEntry = $('.feed .entry').first();
            expect(feedEntry.length).toBe(1);
        });
    });

    /* New Feed Selection Test Suite */
    describe('New Feed Selection', function(){
        var firstFeed, secondFeed;
        beforeEach(function(done){
            loadFeed(0, function(){
                firstFeed = $('.feed').first().html();
                loadFeed(1, function(){
                    secondFeed = $('.feed').first().html();
                    done();
                });
            });
        });

        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        it('actually changes the content.', function(){
            expect(firstFeed).not.toBe(secondFeed);
        });
    });
}());