import { inventory } from '../inventory.js'

export default class Basket {
  constructor() {
    this.basketList = []
    this.basketSize = 12
    this.basketisFull = false
    this.inventory = inventory
  }

  addItem(sku) {
    if (!sku || typeof sku !== 'string') return 'sku required!'

    const itemToAdd = this.inventory.find((item) => item.sku === sku)
    const foundInBasket = this.basketList.find((item) => item.sku === sku)

    if (!itemToAdd) return 'item not found'

    if (foundInBasket) return foundInBasket.quantity++

    if (this.basketisFull) return this.checkIfFull()

    itemToAdd.quantity = 1
    this.basketList.push(itemToAdd)
    return itemToAdd.name
  }

  removeItem(sku) {
    if (!sku || typeof sku !== 'string') return 'sku required!'

    if (!this.basketList.find((item) => item.sku === sku))
      return 'item is not in basket'

    const newBasket = this.basketList.filter((item) => item.sku !== sku)
    return (this.basketList = newBasket)
  }

  checkIfFull() {
    let sum = 0
    this.basketList.forEach((item) => {
      sum += item.quantity
      return sum
    })

    if (sum === this.basketSize) this.basketisFull = true
    return 'basket is full'
  }

  changeBasketSize(size) {
    if (!size || typeof size !== 'number') return 'error, set basket size.'
    this.basketSize = size
    return
  }

  findItemDetails(sku) {
    const foundItem = this.inventory.find((item) => sku === item.sku)
    if(!foundItem) return false
    return `Name: ${foundItem.name}, Price: £${foundItem.price}`
  }

}
