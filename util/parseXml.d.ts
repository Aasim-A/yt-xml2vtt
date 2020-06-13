interface Document {
  declaration: {
    attributes: {};
  };
  root:
    | {
        name: string;
        attributes: {};
        children: any[];
      }
    | undefined;
}
/**
 * Parse the given string of `xml`.
 *
 * @param {string} xmlString
 * @return {Document}
 * @api public
 */
declare function parse(xmlString: string): Document;

export = parse;
