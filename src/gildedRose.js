const { normalize } = require("path");

class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}


class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    this.items.forEach((item) => {
      if (item.name === "Aged Brie") { this.agedBrie(item) }
      else if (item.name === "Backstage passes to a TAFKAL80ETC concert") { this.backPass(item) }
      else if (item.name === "Sulfuras, Hand of Ragnaros") { this.sulfuras(item) }
      else if (item.name === "Conjured hand of the Wizard of Oz") { this.conjured(item) }
      else { this.normalItem(item) }
      
    });
    
    return this.items;
  }

  normalItem(item) {
    item.sellIn -= 1;
    item.quality -= 1;
    if (item.sellIn < 0) {
      item.quality -= 1;
    }
    if (item.quality < 0) {
      item.quality = 0
    }
  }
  
  agedBrie(item) {
    item.sellIn -= 1;
    item.quality += 1;
    if (item.sellIn < 0) {
      item.quality += 1
    } if (item.quality > 50) {
      item.quality = 50
    }
  }

  
  backPass(item) {
    item.quality += 1;
    
    if (item.sellIn < 11 && item.sellIn > 5) {
      item.quality += 1;
    } else if (item.sellIn < 6) {
      item.quality += 2;
    }

    item.sellIn -= 1;

    if (item.sellIn < 0) {
      item.quality = 0
    } if (item.quality > 50) {
      item.quality = 50
    }
  }
  
  sulfuras(item) {
    //nothing to do here, maybe throw an error if quality isn't 80?
  }

  conjured(item) {
    item.sellIn -= 1;
    item.quality -= 2;
    if (item.sellIn < 0) {
      item.quality -= 2;
    }
    if (item.quality < 0) {
      item.quality = 0
    }
  }
  

}

module.exports = {
  Item,
  Shop
};
