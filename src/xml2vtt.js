const htmlDecoder = require('../util/DecodeHTML.js');
const formatTime = require('../util/FormatTime.js');
const parseXml = require('../util/parseXml.js');

function Convert(newRes) {
  let vttText = 'WEBVTT\nKind: captions\n\n';

  newRes.forEach((item, index) => {
    const currEnd = item.attr.end;
    const nextStart =
      index + 1 === newRes.length ? 0 : newRes[index + 1].attr.start;
    const end = currEnd > nextStart ? nextStart : currEnd;
    vttText += `${formatTime(item.attr.start)} --> ${formatTime(
      nextStart === 0 ? item.attr.end : end
    )}\n`;
    vttText += `${item.text}`;
    if (newRes.length !== index + 1) vttText += '\n\n';
  });
  return vttText;
}

function Parse(xmlString) {
  return new Promise((resolve, reject) => {
    try {
      const res = parseXml(xmlString);
      if (!res.root) throw new Error('Error while parsing xml');

      const newRes = res.root.children.map(textElement => ({
        text: htmlDecoder(textElement.content),
        attr: {
          start: parseFloat(textElement.attributes.start),
          end:
            parseFloat(textElement.attributes.start) +
            parseFloat(textElement.attributes.dur),
        },
      }));

      const vttText = Convert(newRes);
      resolve(vttText);
    } catch (error) {
      reject(error);
    }
  });
}

function ParseSync(xmlString) {
  const res = parseXml(xmlString);
  if (!res.root) throw new Error('Error while parsing xml');

  const newRes = res.root.children.map(textElement => ({
    text: htmlDecoder(textElement.content),
    attr: {
      start: parseFloat(textElement.attributes.start),
      end:
        parseFloat(textElement.attributes.start) +
        parseFloat(textElement.attributes.dur),
    },
  }));

  return Convert(newRes);
}

module.exports.Parse = Parse;
module.exports.ParseSync = ParseSync;
