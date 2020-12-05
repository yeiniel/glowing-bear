/* plugins go here */

import angular from "angular";

import "angular-mocks";

import "../../src/main";

var msg = function(msg) {
    return {'text': msg };
};

var metadata_name = function(message) {
    if (message.metadata && message.metadata[0] && message.metadata[0].name) {
        return message.metadata[0].name;
    }
    return null;
};

var expectTheseMessagesToContain = function(urls, pluginType, plugins) {
    for (var i = 0; i < urls.length; i++) {
        expect(
            metadata_name(
                plugins.PluginManager.contentForMessage(msg(urls[i]))
            )
        ).toEqual(pluginType);
    }
};

describe('filter', function() {
    beforeEach(angular.mock.module('plugins'));

    describe('Plugins', function() {
        beforeEach(angular.mock.module(function($provide) {
            $provide.value('version', 'TEST_VER');
        }));

        it('should recognize spotify links', angular.mock.inject(function(plugins) {
            expectTheseMessagesToContain([
                'spotify:track:6JEK0CvvjDjjMUBFoXShNZ',
                'spotify:user:lorenzhs:playlist:18aXdzQ4Ar1p019OSICtu4',
                'spotify:artist:0L5fC7Ogm2YwgqVCRcF1bT',
                'https://open.spotify.com/track/6JEK0CvvjDjjMUBFoXShNZ',
                'https://open.spotify.com/user/lorenzhs/playlist/18aXdzQ4Ar1p019OSICtu4',
                'https://open.spotify.com/artist/0L5fC7Ogm2YwgqVCRcF1bT'
            ],
            'Spotify music',
            plugins);
        }));


        it('should recognize youtube videos', angular.mock.inject(function(plugins) {
            expectTheseMessagesToContain([
                'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                'http://www.youtube.com/watch?v=dQw4w9WgXcQ',
                'http://youtu.be/J6vIS8jb6Fs',
                'https://youtu.be/J6vIS8jb6Fs',
                'http://www.youtube.com/embed/dQw4w9WgXcQ',
                'https://www.youtube.com/embed/dQw4w9WgXcQ',
            ],
            'YouTube video',
            plugins);
        }));

        it('should recognize dailymotion videos', angular.mock.inject(function(plugins) {
            expectTheseMessagesToContain([
                'dailymotion.com/video/test',
                'dailymotion.com/video/#video=asdf',
                'dai.ly/sfg'
            ],
            'Dailymotion video',
            plugins);
        }));

        it('should recognize allocine videos', angular.mock.inject(function(plugins) {
            expectTheseMessagesToContain([
                'allocine.fr/videokast/video-12',
                'allocine.fr/cmedia=234'
            ],
            'AlloCine video',
            plugins);
        }));

        it('should recognize html5 videos', angular.mock.inject(function(plugins) {
            expectTheseMessagesToContain([
                'http://www.quirksmode.org/html5/videos/big_buck_bunny.mp4',
                'http://www.quirksmode.org/html5/videos/big_buck_bunny.webm',
                'http://www.quirksmode.org/html5/videos/big_buck_bunny.ogv',
            ],
            'video',
            plugins);
        }));

        it('should recognize images', angular.mock.inject(function(plugins) {
            expectTheseMessagesToContain([
                'http://i.imgur.com/BTNIDBR.gif',
                'https://i.imgur.com/1LmDmct.jpg',
                'http://i.imgur.com/r4FKrnu.jpeg',
                'https://4z2.de/gb-mobile-new.png',
                'http://static.weechat.org/images/screenshots/relay/medium/glowing-bear.png',
                'http://foo.bar/baz.php?img=trololo.png&dummy=yes',
                'https://tro.lo.lo/images/rick.png?size=123x45',
                'https://pbs.twimg.com/media/B66rbCuIMAAxiFF.jpg:large',
                'https://pbs.twimg.com/media/B6OZuCYCEAEV8SA.jpg:medium'
            ],
            'image',
            plugins);
        }));

        it('should recognize cloud music', angular.mock.inject(function(plugins) {
            expectTheseMessagesToContain([
                'http://soundcloud.com/',
                'https://sadf.mixcloud.com/',
            ],
            'cloud music',
            plugins);
        }));

        it('should recognize google map', angular.mock.inject(function(plugins) {
            expectTheseMessagesToContain([
                'https://www.google.com/maps/@48.0034139,-74.9129088,6z',
            ],
            'Google Map',
            plugins);
        }));

        it('should recognize google map', angular.mock.inject(function(plugins) {
            expectTheseMessagesToContain([
                'https://asciinema.org/a/10625',
            ],
            'ascii cast',
            plugins);
        }));

        it('should recognize meteograms', angular.mock.inject(function(plugins) {
            expectTheseMessagesToContain([
                'http://www.yr.no/sted/Canada/Quebec/Montreal/',
            ],
            'meteogram',
            plugins);
        }));

        it('should recognize gists', angular.mock.inject(function(plugins) {
            expectTheseMessagesToContain([
                'https://gist.github.com/lorenzhs/e8c1a7d56fa170320eb8',
                'https://gist.github.com/e8c1a7d56fa170320eb8',
            ],
            'Gist',
            plugins);
        }));

        it('should recognize pastebins', angular.mock.inject(function(plugins) {
            expectTheseMessagesToContain([
                'http://pastebin.com/Wn3TetSE',
                'http://pastebin.com/raw/Wn3TetSE',
            ],
            'Pastebin',
            plugins);
        }));

        it('should recognize giphy gifs', angular.mock.inject(function(plugins) {
            expectTheseMessagesToContain([
                'https://giphy.com/gifs/eyes-shocked-bird-feqkVgjJpYtjy/',
                'http://giphy.com/gifs/funny-cat-FiGiRei2ICzzG',
            ],
            'Giphy',
            plugins);
        }));

        it('should recognize tweets', angular.mock.inject(function(plugins) {
            expectTheseMessagesToContain([
                'https://twitter.com/DFB_Team_EN/statuses/488436782959448065',
            ],
            'Tweet',
            plugins);
        }));

        it('should recognize tiktoks', angular.mock.inject(function(plugins) {
            expectTheseMessagesToContain([
                'https://www.tiktok.com/@scout2015/video/6718335390845095173',
                'https://www.tiktok.com/@lewiscatpaldi/video/6800461190058298629',
                'https://www.tiktok.com/@bhattrai_fam5_kavita/video/6811222914768047365',
            ],
            'TikTok',
            plugins);
        }));

    });
});
