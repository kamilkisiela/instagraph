class Me {
  constructor() {
    this.id = 1;
    this.username = 'mrfoo';
    this.firstname = 'Foo';
    this.surname = 'Barbaz';
    this.bio = 'I use GraphQL, be like me. At least do the same haircut.';
    this.picture = 'assets/profile.png';
  }

  toLink() {
    return {
      id: this.id,
      link: `users/${this.id}`,
    };
  }
}

class Photos {
  constructor(size) {
    if (!size) {
      size = 10;
    }

    this.data = [];

    while (size > 0) {
      this.data.push(new Photo(--size));
    }
  }

  single(id) {
    return this.data.filter(photo => photo.id === id)[0];
  }

  feed(offset, limit) {
    if (!offset && !limit) {
      return this.data;
    }

    if (!offset) {
      offset = 0;
    }

    this.result = [];

    for (let i = 0; i < limit; i++) {
      const el = this.data[i + offset];
      
      if(el) {
        this.result.push(el);
      }
    }

    return this.result;
  }
}

class Photo {
  constructor(id) {
    this.id = id;
    this.author = 1;
    this.url = `assets/${id}.jpg`;
    this.randomizeCreatedAt();
    this.randomizeLikes();
  }

  randomizeLikes() {
    this.likes = this.randomInt(20, 100);
  }

  randomizeCreatedAt() {
    const days = 7;
    const date = new Date();
    
    date.setDate(date.getDate() + this.randomInt(days, days * 2));

    this.createdAt = date;
  }

  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  toLink() {
    return {
      id: this.id,
      link: `photo/${this.id}`,
    };
  }
}

export const me = new Me();
export const photos = new Photos(10);