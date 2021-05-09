export default class Locale {

    public static ENGLISH: Locale = new Locale('en');
    public static US: Locale = new Locale('en', 'US', 'en'); // default in cldr-data, no en-US
    public static UK: Locale = new Locale('en', 'GB');
    public static CANADA: Locale = new Locale('en', 'CA');
    public static FRENCH: Locale = new Locale('fr');
    public static FRANCE: Locale = new Locale('fr', 'FR', 'fr'); // default in cldr-data, no fr-FR
    public static GERMAN: Locale = new Locale('de');
    public static GERMANY: Locale = new Locale('de', 'DE', 'de'); // default in cldr-data, no de-DE


    constructor(
        private lang: string, 
        private ctry = '', 
        private localeStr = ''
    ) {}

    public language() {
        return this.lang;
    }

    public country() {
        return this.ctry;
    }

    public localeString() {
        if (this.localeStr.length > 0) {
            return this.localeStr;
        }
        if (this.ctry.length > 0) {
            return `${this.lang}-${this.ctry}`;
        } else {
            return this.lang;
        }
    }

    public toString() {
        return `Locale[${this.localeString()}]`;
    }

    public equals(other: any) {
        if (!other) {
            return false;
        }
        if (!(other instanceof Locale)) {
            return false;
        }
        return this.localeString() === other.localeString();
    }
    

}
