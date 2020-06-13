function parse(xmlString) {
  let xml = xmlString.trim();

  // strip comments
  xml = xml.replace(/<!--[\s\S]*?-->/g, '');

  /**
   * Match `re` and advance the string.
   */

  function match(re) {
    const m = xml.match(re);
    if (!m) return null;
    xml = xml.slice(m[0].length);
    return m;
  }

  /**
   * Strip quotes from `val`.
   */

  function strip(val) {
    return val.replace(/^['"]|['"]$/g, '');
  }

  /**
   * Attribute.
   */

  function attribute() {
    const m = match(/([\w:-]+)\s*=\s*("[^"]*"|'[^']*'|\w+)\s*/);
    if (!m) return null;
    return { name: m[1], value: strip(m[2]) };
  }

  /**
   * End-of-source.
   */

  function eos() {
    return xml.length === 0;
  }

  /**
   * Check for `prefix`.
   */

  function is(prefix) {
    return xml.indexOf(prefix) === 0;
  }

  /**
   * Declaration.
   */

  function declaration() {
    const m = match(/^<\?xml\s*/);
    if (!m) return null;

    // tag
    const node = {
      attributes: {},
    };

    // attributes
    while (!(eos() || is('?>'))) {
      const attr = attribute();
      if (!attr) return node;
      node.attributes[attr.name] = attr.value;
    }

    match(/\?>\s*/);

    return node;
  }

  /**
   * Text content.
   */

  function content() {
    const m = match(/^([^<]*)/);
    if (m) return m[1];
    return '';
  }

  /**
   * Tag.
   */

  function tag() {
    const m = match(/^<([\w-:.]+)\s*/);
    if (!m) return null;

    // name
    const node = {
      name: m[1],
      attributes: {},
      children: [],
    };

    // attributes
    while (!(eos() || is('>') || is('?>') || is('/>'))) {
      const attr = attribute();
      if (!attr) return node;
      node.attributes[attr.name] = attr.value;
    }

    // self closing tag
    if (match(/^\s*\/>\s*/)) {
      return node;
    }

    match(/\??>\s*/);

    // content
    node.content = content();

    // children
    let child;
    // eslint-disable-next-line no-cond-assign
    while ((child = tag())) {
      node.children.push(child);
    }

    // closing
    match(/^<\/[\w-:.]+>\s*/);

    return node;
  }

  /**
   * XML document.
   */

  function document() {
    return {
      declaration: declaration(),
      root: tag(),
    };
  }

  return document();
}

module.exports = parse;
