import express from 'express'
import HTTP_CODES from './utils/httpCodes.mjs';

const server = express();
const port = (process.env.PORT || 8000);

server.set('port', port);
server.use(express.static('public'));

function getRoot(req, res, next) {
    res.status(HTTP_CODES.SUCCESS.OK).send('Hello World').end();
}

function getPoem(req, res, next) { 
    const poem = `
    Roses are red,<br>
    Violets are blue,<br>
    Plants are cool,<br>
    And so are you!
    `;
    res.status(HTTP_CODES.SUCCESS.OK).send(poem).end();
}

function getQuote(reg, res, next) { 
    const quotes = [
        "The only way to do great work is to love what you do. - Steve Jobs",
        "In the middle of every difficult lies opportunity. - Albert Einstein",
        "Hardships often prepare ordinary people for eztraordinary destiny. - C.S. Lewis",
        "You are never too old to set another goal or to dream a new dream. - C.S. Lewis",
        "Humility is not thinkling less of yourself, but thinking of yourself less. - C.S. Lewis",
    ];
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    res.status(HTTP_CODES.SUCCESS.OK).send(randomQuote).end();
}

function postSum(req, res, next) { 
    const { a, b } = req.params;

    const numA = parseFloat(a);
    const numB = parseFloat(b);

    if (isNaN(numA) || isNaN(numB)) { 
        return res.status(HTTP_CODES.CLIENT_ERROR.BAD_REQUEST)
                .send("Both parameters must be valid numbers.")
                .end();        
    }

    const sum = numA + numB;
    res.status(HTTP_CODES.SUCCESS.OK).send(`The sum of ${numA} and ${numB} is ${sum}`).end();

}

server.get("/", getRoot);
server.get("/tmp/poem", getPoem);
server.get("/tmp/quote", getQuote);
server.post("/tmp/sum/:a/:b", postSum);

server.listen(server.get('port'), function () {
    console.log('server running on port', server.get('port'));
});