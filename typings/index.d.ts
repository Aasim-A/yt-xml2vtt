/**
 * Converts YouTube caption format from XML to VTT Asynchronously
 *
 * @param {string} xmlString The XML string to convert to VTT.
 * @returns {Promise<string>} The result of the conversion in VTT format.
 */
export declare function Parse(xmlString: string): Promise<string>;

/**
 * Converts YouTube caption format from XML to VTT Synchronously
 *
 * @param {string} xmlString The XML string to convert to VTT.
 * @returns {string} The result of the conversion in VTT format.
 */
export declare function ParseSync(xmlString: string): string;
