const DOMTreeParser = require('../src/classes/DOMTreeParser');
const DOMTree = require('../src/classes/DOMTree');
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

describe('DOMTree', () => {
    const HTML = `
    <html>
        <head>
            <title>Hello World!</title>
        </head>
        <body>
            <h1>Hello World!</h1>
        </body>
    </html>
    `;

    let domTree;

    beforeEach(() => {
        domTree = new DOMTree(HTML);
    });

    it('it should be instantiable', () => {
        should.exist(domTree);
    });

    describe('#buildTags()', () => {

        it('it should create tags from raw html', () => {
            domTree.tags.should.eql([
                {
                    index: 0,
                    name: 'html',
                    parent: null,
                    tag: '<html>'
                },
                {
                    index: 1,
                    name: 'head',
                    parent: 'html',
                    tag: '<head>'
                },
                {
                    index: 2,
                    name: 'title',
                    parent: 'head',
                    tag: '<title>'
                },
                {
                    index: 3,
                    name: 'title',
                    parent: null,
                    tag: '</title>'
                },
                {
                    index: 4,
                    name: 'head',
                    parent: null,
                    tag: '</head>'
                },
                {
                    index: 5,
                    name: 'body',
                    parent: 'html',
                    tag: '<body>'
                },
                {
                    index: 6,
                    name: 'h1',
                    parent: 'body',
                    tag: '<h1>'
                },
                {
                    index: 7,
                    name: 'h1',
                    parent: null,
                    tag: '</h1>'
                },
                {
                    index: 8,
                    name: 'body',
                    parent: null,
                    tag: '</body>'
                },
                {
                    index: 9,
                    name: 'html',
                    parent: null,
                    tag: '</html>'
                }
            ]);
        });
    });

    describe('#buildTree()', () => {

        function _createTag(index, tag, name, parent) {
            return {
                index: index,
                tag: tag,
                name: name,
                parent: parent
            };
        }

        it('it should create the root element', () => {
            should.exist(domTree.rootElement);
            domTree.rootElement.tag.should.eql(_createTag(
                0,
                '<html>',
                'html',
                null
            ));
        });

        it('it should create child elements', () => {
            domTree.rootElement.should.eql({
                tag: _createTag(0, '<html>', 'html', null),
                children: [
                    {
                        tag: _createTag(1, '<head>', 'head', 'html'),
                        children: [
                            {
                                tag: _createTag(2, '<title>', 'title', 'head'),
                                children: []
                            }
                        ]
                    },
                    {
                        tag: _createTag(5, '<body>', 'body', 'html'),
                        children: [
                            {
                                tag: _createTag(6, '<h1>', 'h1', 'body'),
                                children: []
                            }
                        ]
                    }
                ]
            });
        });

    });
});
