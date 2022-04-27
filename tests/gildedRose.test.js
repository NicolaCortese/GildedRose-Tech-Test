const {Shop, Item} = require("../src/gildedRose");


beforeEach(() => {
  this.brie = new Item("Aged Brie", 2, 10);
  this.oldBrie = new Item("Aged Brie", -10, 48);
  this.potion = new Item("Potion", 2, 15);
  this.expiredPotion = new Item("Potion", 0, 4);
  this.pass = new Item("Backstage passes to a TAFKAL80ETC concert", 12, 10);
  this.sulfuras = new Item("Sulfuras, Hand of Ragnaros", 0, 80);

});

describe("Gilded Rose", () => {
  describe("Testing for a simple Potion item", () => {
    it("should hold the item name", () => {
      const gildedRose = new Shop([this.potion]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe("Potion");
    });
  
    it("should degrade the item quality by 1", () => {
      const gildedRose = new Shop([this.potion]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(14);
    });
  
    it("should reduce the item sellin by 1", () => {
      const gildedRose = new Shop([this.potion]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(1);
    });

    it("should reduce the quality by 2 when the sellin falls below 0", () => {
      const gildedRose = new Shop([this.expiredPotion]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(-1);
      expect(gildedRose.items[0].quality).toBe(2);
    });

    it("quality cannot drop below 0", () => {
      const gildedRose = new Shop([this.expiredPotion]);
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(-2);
      expect(gildedRose.items[0].quality).toBe(0);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(-3);
      expect(gildedRose.items[0].quality).toBe(0);
    });

  });

  describe("Testing for an Aged Brie item", () => {
    it("should increase the item quality by 1 when the sellin date is positive", () => {
      const gildedRose = new Shop([this.brie]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(11);
    });
  
    it("should double the rate at which quality increases when the sellin drops to zero", () => {
      const gildedRose = new Shop([this.brie]);
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(0);
      expect(gildedRose.items[0].quality).toBe(12);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(-1);
      expect(gildedRose.items[0].quality).toBe(14);
    });

    it("quality cannot go above 50", () => {
      const gildedRose = new Shop([this.oldBrie]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(-11);
      expect(gildedRose.items[0].quality).toBe(50);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(-12);
      expect(gildedRose.items[0].quality).toBe(50);
    });

  });

  describe("Testing for a Backstage Pass item", () => {

    it("should increase the item quality by 1 when the sellin date is > 10", () => {
      const gildedRose = new Shop([this.pass]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(11);
    });
  
    it("should double the rate at which quality increases when the sellin is < 11", () => {
      const gildedRose = new Shop([this.pass]);
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(10);
      expect(gildedRose.items[0].quality).toBe(12);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(9);
      expect(gildedRose.items[0].quality).toBe(14);
    });

    it("should triple the rate at which quality increases when the sellin is < 5", () => {
      const pass2 = new Item("Backstage passes to a TAFKAL80ETC concert", 6, 10);
      const gildedRose = new Shop([pass2]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(5);
      expect(gildedRose.items[0].quality).toBe(12);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(4);
      expect(gildedRose.items[0].quality).toBe(15);
    });

    it("should drop the quality to 0 when the sellin reaches 0", () => {
      const pass3 = new Item("Backstage passes to a TAFKAL80ETC concert", 2, 10);
      const gildedRose = new Shop([pass3]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(1);
      expect(gildedRose.items[0].quality).toBe(13);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(0);
      expect(gildedRose.items[0].quality).toBe(16);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(-1);
      expect(gildedRose.items[0].quality).toBe(0);
    });

  });

  describe("Testing for a Sulfuras item", () => {

    it("item quality and sellin do not change", () => {
      const gildedRose = new Shop([this.sulfuras]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(80);
      expect(gildedRose.items[0].sellIn).toBe(0);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(80);
      expect(gildedRose.items[0].sellIn).toBe(0);
    });
  
  });
});
