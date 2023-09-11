interface PhoneNumberDictionary {
  [phone: string]: {
    num: number;
  };
}

interface Contact {
  name: string;
  address: string;
  phones: PhoneNumberDictionary;
}

enum phoneType {
  Home = 'home',
  Office = 'office',
  Studio = 'studio',
}

export { Contact, phoneType };
