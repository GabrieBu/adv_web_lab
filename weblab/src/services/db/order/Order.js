class Order {
  constructor() {
    this.userId = null;
    this.dishes = [];
    this.tableId = null;
    this.id_order = null;
  }

  setTableId(id) {
    this.tableId = id;
  }

  setUserId(id) {
    this.userId = id;
  }

  totalPrice() {
    let total = 0;
    for (let i = 0; i < this.dishes.length; i++) {
      total += this.dishes[i].price;
    }
    return total;
  }
}

export default Order;
