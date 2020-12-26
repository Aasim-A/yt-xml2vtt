# yt-xml2vtt

A tiny module to easily convert YouTube caption format from XML to VTT with ZERO dependencies.

[![npm package](https://nodei.co/npm/yt-xml2vtt.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/yt-xml2vtt/)

# Installation

```bash
npm i -S yt-xml2vtt
```

Or for Yarn users:

```bash
yarn add yt-xml2vtt
```

# Usage

## Using Promises:

```js
const xml2vtt = require('yt-xml2vtt');

xml2vtt.Parse(xmlString)
  .then(vtt => /* DO SOMETHING WITH VTT */)
  .catch(err => console.log(`Error while converting XML to VTT : ${err}`));
```

Or you can use async await

```js
const xml2vtt = require('yt-xml2vtt');

const vtt = await xml2vtt
  .Parse(xmlString)
  .catch(err => console.log(`Error while converting XML to VTT : ${err}`));
/* DO SOMETHING WITH VTT */
```

## Using it synchronously:

```js
const xml2vtt = require('yt-xml2vtt');

try {
  const vtt = xml2vtt.ParseSync(xmlString);
  /* DO SOMETHING WITH VTT */
} catch (err) {
  console.log(`Error while converting XML to VTT : ${err}`);
}
```

# Tests

```bash
npm test
```
