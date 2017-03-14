const DOMTreeParser = require('../src/classes/DOMTreeParser');
const expect = require('chai').expect();
const should = require('chai').should();

describe('DOMTreeParser', () => {
    it('it should be instantiable', () => {
        let domTreeParser = new DOMTreeParser();
        should.exist(domTreeParser);
    });

    describe('#parse()', () => {
        let domTreeParser;

        beforeEach(() => {
            domTreeParser = new DOMTreeParser();
        });

        it('it should fail if no file is provided', (done) => {
            domTreeParser
                .parse()
                .then(() => {
                    assert.fail();
                }, (error) => {
                    done();
                })
                .catch(done);
        });

        it('it should only parse .html files', (done) => {
            let pngFile = domTreeParser
                .parse('image.png')
                .then(() => {
                    return true;
                }, (error) => {
                    return false;
                });

            let htmlFile = domTreeParser
                .parse('index.html')
                .then(() => {
                    return true;
                }, (error) => {
                    return false;
                });

            Promise.all([pngFile, htmlFile])
                .then((results) => {
                    results.should.eql([false, true]);
                    done();
                })
                .catch(done);
        });
    });
});
