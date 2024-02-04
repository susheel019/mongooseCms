// bll code start here

class Customer {
  static mongoose = require("mongoose");
  static url = "mongodb://127.0.0.1:27017";
  static myDb = "CustomerNewDb";
  static CustomerModel = "";

  static initializeConnection() {
    Customer.mongoose.connect(Customer.url + "/" + Customer.myDb).then(() => {
      var customerSchema = Customer.mongoose.Schema({
        id: { type: Number, unique: true },
        name: { type: String, required: true },
        address: String,
        mobile: String,
      });
      Customer.CustomerModel = Customer.mongoose.model(
        "Customer",
        customerSchema
      );
      console.log("MongoDb connected successfully");
    });
  }

  constructor() {
    this.id = 0;
    this.name = "";
    this.address = "";
    this.mobile = "";
  }

  async addCustomer() {
    try {
      let result = await Customer.CustomerModel.create({ ...this });
      console.log(result);
      return result;
    } catch (err) {
      throw err;
    }
  }

  static async showAllCustomer() {
    var arrCus = await Customer.CustomerModel.find({});
    return arrCus;
  }

  async searchCustomer(id) {
    try {
      var id = parseInt(id);
      var result = await Customer.CustomerModel.findOne({ id: id });
      // console.log(result);
      return result;
    } catch (err) {
      throw err;
    }
  }

  async deleteCustomer(id) {
    try {
      var id = parseInt(id);
      var result = await Customer.CustomerModel.deleteOne({ id: id });
      return result;
    } catch (err) {
      throw err;
    }
  }

  async modifyCustomer(id) {
    var id = parseInt(id);
    console.log(this.name);
    var data = await Customer.CustomerModel.updateOne({ id: id } ,{$set :{...this}});
    // data.name = this.name;
    // data.address = this.address;
    // data.mobile = this.mobile;
  }
}
module.exports = Customer;
