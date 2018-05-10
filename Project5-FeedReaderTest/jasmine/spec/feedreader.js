/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have URL\'s defined and the URL definition is not empty', function () {
            allFeeds.forEach(function(feed){
                expect(feed.url).toBeDefined();
                expect(feed.url).toBeTruthy();
            });
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('have name\'s defined and the name definition is not empty', function () {
              allFeeds.forEach(function(feed){
                expect(feed.name).toBeDefined();
                expect(feed.name).toBeTruthy();
            });
        });
    });

    describe("The menu", function () {
        /* Test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        let iconListButton = document.getElementsByClassName('menu-icon-link')[0];
        it("element is hidden by default", function () {
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
        });
        /* Test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it("changes visibility, toggled by click", function () {
            iconListButton.click();
            expect(document.body.classList.contains('menu-hidden')).toBe(false);
            iconListButton.click();
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
        });
    });

    /* Test suit that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     */
    describe("Initial Entries", function () {
        beforeEach(function (done) {
            loadFeed(0, done);
        });

        it("has at least one entry", function (done) {
            var listLength = $('.feed .entry').length;
            expect(listLength).toBeGreaterThan(0);
            done();
        });
    });
    /* Test suit that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Remember, loadFeed() is asynchronous.
     */
    describe("New Feed Selection", function () {
        let firstFeed, secondFeed, test;
        beforeEach(function (done) {
            loadFeed(0, function () {
                firstFeed = document.querySelector('.feed').innerText;
                    loadFeed(1, function () {
                        secondFeed = document.querySelector('.feed').innerText;
                done();
            });
        });
        });

        it("a new feed is loaded by the loadFeed function and the content actually changes", function (done) {
            expect(firstFeed).not.toEqual(secondFeed);
            done();
        });
    });


}());
