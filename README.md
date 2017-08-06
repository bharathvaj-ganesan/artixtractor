[![Built with Grunt](https://cdn.gruntjs.com/builtwith.svg)](https://gruntjs.com/)
[![Build Status](https://travis-ci.org/bharathvaj1995/artixtractor.svg?branch=master)](https://travis-ci.org/bharathvaj1995/artixtractor)
[![Code Climate](https://codeclimate.com/github/codeclimate/codeclimate/badges/gpa.svg)](https://codeclimate.com/github/codeclimate/codeclimate)

# artixtractor

Extract article/blog from websites like [medium.com, inc42.com,etc]

## Installation
```
$ npm install artixtractor --save
```

## Usuage
```javascript
const articleParser = require('artixtractor');

articleParser('https://medium.com/@Aegist/how-to-end-googles-monopoly-5c46ef7db20d')
.then((result)=>{
    console.log(result);
	 /*=>{  domain: 'medium.com',
			title: 'How to End Google’s Monopoly – Shane Greenup – Medium',
			articleContent: 'Over a year ago I said Google would never implement a fact based assessment in their 		  algorithm because 	I thought 	they would understand that making such a change would be the first step to losing their search monopoly.I 	was wrong.
				......
				......
				Founder of rbutr and dedicated to solving the problem of misinformation.Entrepreneur, Philosopher, Scientist, Traveller, Extreme Sports enthusiast.',
			primaryImage: 'https://cdn-images-1.medium.com/max/1200/1*EDO7CRa7DA3HfkRcUU6Qtg.jpeg',
			date: '2017-08-03T10:42:48.314Z',
			author: '@Aegist',
			shortDescription: 'Over a year ago I said Google would never implement a fact based assessment in their algorithm 		because I thought they would understand that…' } */

}).catch((reason)=>{
    console.log(reason);
});

```

## Features

- Text extraction
- Primary image extraction
- Description extraction
- Keyword extraction
- Author extraction
- Article Posted Date extraction

## License

MIT © [Bharathvaj Ganesan](https://github.com/bharathvaj1995)
