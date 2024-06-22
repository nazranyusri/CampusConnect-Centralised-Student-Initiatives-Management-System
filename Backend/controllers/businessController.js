const businessModel = require('../models/business');
const menuModel = require('../models/menu');
const userModel = require('../models/user');
const orderModel = require('../models/orders');
const fs = require('fs');
require("dotenv").config();

//get all business
const getAllBusiness = (req, res) => {
    businessModel.getAllBusiness((err, result) => {
        if (!err) {
            return res.status(200).json(result);
        } else {
            return res.status(500).json(err);
        }
    });
};

//get business by id
const getBusinessById = (req, res) => {
    const businessId = req.params.businessId;
    businessModel.getBusinessById(businessId, (err, result) => {
        if (!err) {
            if(result.length == 0){
                return res.status(404).json({message: "Business id not found"});
            }
            return res.status(200).json(result[0]);
        } else {
            return res.status(500).json(err);
        }
    });
};

//get total business -- viewed in Homepage
const getTotalBusiness = (req, res) => {
    businessModel.getTotalBusiness((err, result) => {
        if (!err) {
            return res.status(200).json({ totalBusiness: result[0].totalBusiness });
        } else {
            return res.status(500).json(err);
        }
    });
};

//get latest business -- viewed in Homepage
const getLatestBusiness = (req, res) => {
    businessModel.getLatestBusiness((err, result) => {
        if (!err) {
            return res.status(200).json(result);
        } else {
            return res.status(500).json(err);
        }
    });
};

//get menu items
const getMenuItems = (req, res) => {
    const businessId = req.params.businessId;
    menuModel.getMenuItems(businessId, (err, result) => {
        if (!err) {
            return res.status(200).json(result);
        } else {
            return res.status(500).json(err);
        }
    });
}

//get specific user business -- viewed in Profile 
const getBusinessHistory = (req, res) => {
    const userId = req.params.userId;
    businessModel.getBusinessHistory(userId, (err, result) => {
        if (!err) {
            return res.status(200).json(result);
        } else {
            return res.status(500).json(err);
        }
    });
};

//get business order list
const getBusinessOrderList = (req, res) => {
    const businessId = req.params.businessId;
    orderModel.getBusinessOrderList(businessId, (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }

        // Map each order to a Promise returned by getOrderList function
        const promises = results.map(order => {
            return processOrderList(order.orderId, order.userId, order.menuId, order.quantity, order.total, order.status, order.billingAddress, order.datePurchased);
        });

        // Wait for all promises to resolve
        Promise.all(promises).then(processedOrderList => {
            // console.log("Processed order: ", processedOrders);
            res.status(200).json(processedOrderList);
        })
        .catch(error => {
            console.error("Error getting order list:", error);
            res.status(500).json({ error: "Error getting order list" });
        });

    });
}

//get business order list -- creating the final object
function processOrderList(orderId, userId, menuIds, quantities, total, status, billingAddress, datePurchased) {
    return new Promise((resolve, reject) => {
        const menuIdArray = menuIds.split(',').map(Number);
        const quantityArray = quantities.split(',').map(Number);
        // console.log("In function processOrder");
        // console.log("orderId:", orderId);
        // console.log("userId:", userId);
        // console.log("businessId:", businessId);
        // console.log("menuIds:", menuIds);
        // console.log("quantities:", quantities);
        // console.log("total:", total);
        // console.log("status:", status);
        // console.log("billingAddress:", billingAddress);
        // console.log("datePurchased:", datePurchased);
        // console.log("menuIdArray:", menuIdArray);
        // console.log("quantityArray:", quantityArray);

        let count = 0;
        const orderedItem = [];

        function fetchMenuDetails(menuId, quantity) {
            menuModel.getIndividualMenu(menuId, (err, menuDetails) => {
                if (err) {
                    console.error('Error fetching menu details:', err);
                    reject(err);
                } 

                if(menuDetails && menuDetails.length > 0){
                    const menuDetail = menuDetails[0];
                    // console.log("after menuModel.getIndividualMenu: ", menuDetail);
                    orderedItem.push({
                        menuId: menuDetail.menuId,
                        businessId: menuDetail.businessId,
                        itemName: menuDetail.itemName,
                        price: menuDetail.price,
                        note: menuDetail.note,
                        quantity
                    });

                    // console.log("After fetch individual items: ",orderedItem[`item${menuId}`]);
                } else{
                    console.error('No menu details found for menuId:', menuId);
                }

                count++;
                if (count === menuIdArray.length) {
                    userModel.getUser(userId, (err, userDetails) => {
                        if (err) {
                            console.error('Error fetching business details:', err);
                        }

                        if (userDetails && userDetails.length > 0) {
                            const userDetail = userDetails[0];
                            console.log(userDetail);
                            userDetails = {
                                fullName: userDetail.fullName,
                                telNo: userDetail.telNo,
                            };
                            console.log(userDetails);
                        } else {
                            console.error('No user details found for userId:', userId);
                        }

                        // Assemble the final object
                        const finalObject = {
                            orderId,
                            userId,
                            userDetails,
                            orderedItem,
                            total,
                            status,
                            billingAddress,
                            datePurchased
                        };
                        console.log("Final object: ", finalObject);
                        resolve(finalObject);
                    });
                }
            });
        }

        for (let i = 0; i < menuIdArray.length; i++) {
            fetchMenuDetails(menuIdArray[i], quantityArray[i]);
        }
    });
}

//get user ordered business
const getUserOrderedBusiness = (req, res) => {
    const userId = req.params.userId;
    orderModel.getUserOrderedBusiness(userId, (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }

        // Map each order to a Promise returned by processOrder function
        const promises = results.map(order => {
            return processOrder(order.orderId, order.userId, order.businessId, order.menuId, order.quantity, order.total, order.status, order.billingAddress, order.datePurchased);
        });

        // Wait for all promises to resolve
        Promise.all(promises).then(processedOrders => {
            // console.log("Processed order: ", processedOrders);
            res.status(200).json(processedOrders);
        })
        .catch(error => {
            console.error("Error processing orders:", error);
            res.status(500).json({ error: "Error processing orders" });
        });
    });
};

//get user ordered business -- creating the final object
function processOrder(orderId, userId, businessId, menuIds, quantities, total, status, billingAddress, datePurchased) {
    return new Promise((resolve, reject) => {
        const menuIdArray = menuIds.split(',').map(Number);
        const quantityArray = quantities.split(',').map(Number);
        // console.log("In function processOrder");
        // console.log("orderId:", orderId);
        // console.log("userId:", userId);
        // console.log("businessId:", businessId);
        // console.log("menuIds:", menuIds);
        // console.log("quantities:", quantities);
        // console.log("total:", total);
        // console.log("status:", status);
        // console.log("billingAddress:", billingAddress);
        // console.log("datePurchased:", datePurchased);
        // console.log("menuIdArray:", menuIdArray);
        // console.log("quantityArray:", quantityArray);

        let count = 0;
        const orderedItem = [];

        function fetchMenuDetails(menuId, quantity) {
            menuModel.getIndividualMenu(menuId, (err, menuDetails) => {
                if (err) {
                    console.error('Error fetching menu details:', err);
                    reject(err);
                } 

                if(menuDetails && menuDetails.length > 0){
                    const menuDetail = menuDetails[0];
                    // console.log("after menuModel.getIndividualMenu: ", menuDetail);
                    orderedItem.push({
                        menuId: menuDetail.menuId,
                        businessId: menuDetail.businessId,
                        itemName: menuDetail.itemName,
                        price: menuDetail.price,
                        note: menuDetail.note,
                        quantity
                    });

                    // console.log("After fetch individual items: ",orderedItem[`item${menuId}`]);
                } else{
                    console.error('No menu details found for menuId:', menuId);
                }

                count++;
                if (count === menuIdArray.length) {
                    businessModel.getBusinessById(businessId, (err, businessDetails) => {
                        if (err) {
                            console.error('Error fetching business details:', err);
                        }

                        if (businessDetails && businessDetails.length > 0) {
                            const businessDetail = businessDetails[0];
                            console.log(businessDetail);
                            businessDetails = {
                                businessId: businessDetail.businessId,
                                businessTitle: businessDetail.businessTitle,
                                telNo: businessDetail.telNo,
                                image: businessDetail.image,
                                // Add other business details as needed
                            };
                            console.log(businessDetails);
                        } else {
                            console.error('No business details found for businessId:', businessId);
                        }

                        // Assemble the final object
                        const finalObject = {
                            orderId,
                            userId,
                            businessDetails,
                            orderedItem,
                            total,
                            status,
                            billingAddress,
                            datePurchased
                        };
                        console.log("Final object: ", finalObject);
                        resolve(finalObject);
                    });
                }
            });
        }

        for (let i = 0; i < menuIdArray.length; i++) {
            fetchMenuDetails(menuIdArray[i], quantityArray[i]);
        }
    });
}

//stripe checkout
const stripe = require("stripe")(process.env.STRIPE_KEY);
const checkout = async (req, res, next) => {
    try {
        const { userId, items } = req.body;

        const customer = await stripe.customers.create({
            metadata: {
                userId: userId,
                cart: JSON.stringify(items),
            }
        })

        const line_items = items.map((item) => {
            return {
                price_data: {
                    currency: 'myr',
                    product_data: {
                        name: item.itemName,
                        description: item.note,
                    },
                    unit_amount: item.price * 100,
                },
                quantity: item.quantity,
            };
        });

        const session = await stripe.checkout.sessions.create({
            customer: customer.id,
            line_items,
            mode: 'payment',
            custom_fields: [
                {
                  key: 'room_no',
                  label: {
                    type: 'custom',
                    custom: 'Room No.',
                  },
                  type: 'text',
                },
                {
                  key: 'block_no',
                  label: {
                    type: 'custom',
                    custom: 'Block No.',
                  },
                  type: 'text',
                },
                {
                  key: 'college',
                  label: {
                    type: 'custom',
                    custom: 'College Name',
                  },
                  type: 'text',
                },
              ],
            success_url: `${process.env.CLIENT_URL}/business`,
            cancel_url: `${process.env.CLIENT_URL}/business`,
        });
        
        return res.status(200).json(session);
    } catch (err) {
        return res.status(500).json(err);
    }
}

//store the order data in database
const createOrder = async (customer, data) => {
    const items = JSON.parse(customer.metadata.cart);
    const totalAmount = data.amount_total / 100;

    const businessId = items[0].businessId;
    let roomNo = '';
    let blockNo = '';
    let college = '';

    data.custom_fields.forEach(field => {
    if (field.key === 'room_no') {
        roomNo = field.text.value;
    } else if (field.key === 'block_no') {
        blockNo = field.text.value;
    } else if (field.key === 'college') {
        college = field.text.value;
    }
    });

    const orderData = {
        userId: customer.metadata.userId,
        businessId: businessId,
        menuId: items.map(item => item.menuId).join(','),
        quantity: items.map(item => item.quantity).join(','),
        total: totalAmount,
        billingAddress: `${roomNo}, ${blockNo}, ${college}`,
        datePurchased: new Date().toISOString() // Current timestamp
    };

    console.log(orderData);
    orderModel.addOrder(orderData, (err) => {
        if (err) {
            console.log(err);
        }
    });
};

//webhook endpoint -- get the data from stripe
const endpointSecret = process.env.WEBHOOK_KEY;
const webhookStripe = (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;
    let eventType;
    let dataObject;

    try {
        // Construct the event using the raw body
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        // console.log("Webhook verified");
    } catch (err) {
        // console.log(`Webhook Error: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Extract the event type and data object
    eventType = event.type;
    dataObject = event.data.object;
  
    // Handle the event
    if (eventType === "checkout.session.completed") {
        stripe.customers.retrieve(dataObject.customer).then((customer) => {
            createOrder(customer, dataObject);
        }).catch((err) => { console.log(err.message)}); 
    }

    res.send().end();
};

//create business
const addBusiness = (req, res) => {
    const business = req.body;
    if (req.file) {
        business.image = req.file.path; // Store the path of the uploaded image
    } else {
        return res.status(400).json({ message: "Image file is required" });
    }

    businessModel.addBusiness(business, (err, result) => {
        if (!err) {
            const businessId = result.insertId;
            const items = JSON.parse(business.items);
            
            // Insert each item into the menu_items table
            items.forEach(item => {
                item.businessId = businessId;
                menuModel.addMenuItem(item, (err) => {
                    if (err) {
                        // console.log(item);
                        return res.status(500).json({ message: "Error adding menu item" });
                    }
                });
            });

            return res.status(200).json({ message: "Business added successfully" });
        } else {
            return res.status(500).json({ message: "Error adding business" });
        }
    });
};

// Update business
const updateBusiness = (req, res) => {
    const business = req.body;
    if (req.file) {
        business.image = req.file.path; // Store the path of the uploaded image
    }
    businessModel.getBusinessById(business.id, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        if (result.length == 0) {
            return res.status(404).json({ message: "Business id not found" });
        }

        // Ownership check
        if (result[0].userId !== res.userLocal.userId) {
            // console.log(result[0].userId, res.userLocal.userId)
            return res.status(403).json({ message: "Forbidden" });
        }

        const oldImagePath = result[0].image;
        if (business.image === oldImagePath) {
            // console.log("Same image file " + business.image + " " + oldImagePath);
        } else (
            // console.log("Different image file " + business.image + " " + oldImagePath),
            fs.unlink(oldImagePath, (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: "Error deleting old image file" });
                }
                // console.log("Old image file deleted successfully");
            })
        )

        businessModel.updateBusiness(business, (err, result) => {
            if (err) {
                console.log(business);
                return res.status(500).json(err);
            }

            const items = JSON.parse(business.items);
            items.forEach((item) => {
                console.log(item.menuId);
                if (item.menuId) {
                    // Update existing menu item
                    menuModel.updateMenuItem(item, (err) => {
                        if (err) {
                            return res.status(500).json(err);
                        }
                    });
                } else {
                    // Add new menu item
                    item.businessId = business.id;
                    menuModel.addMenuItem(item, (err) => {
                        if (err) {
                            return res.status(500).json(err);
                        }
                    });
                }
            });

            return res.status(200).json({ message: "Business updated successfully" });
        });
    });
};

//delete business
const deleteBusiness = (req, res) => {
    const id = req.params.id;
    const imagePath = req.params.imagePath; 
    
    businessModel.getBusinessById(id, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        if (result.length == 0) {
            return res.status(404).json({ message: "Business id not found" });
        }

        // Ownership check
        if (result[0].userId !== res.userLocal.userId && res.userLocal.role !== 'admin') {
            // console.log("this business", result[0].userId, "logged in as", res.userLocal.userId)
            return res.status(403).json({ message: "Forbidden" });
        }

        // console.log(imagePath);
        businessModel.deleteBusiness(id, (err, result) => {
            if (!err) {
                if (result.affectedRows === 0) {
                    return res.status(404).json({ message: "Business id not found" });
                }

                // Delete the corresponding image file from the 'uploads/' directory
                fs.unlink(`uploads/${imagePath}`, (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ message: "Error deleting image file" });
                    }
                    return res.status(200).json({ message: "Business deleted successfully" });
                });
            } else {
                return res.status(500).json(err);
            }
        });
    });
};

//delete menu item
const deleteMenuItem = (req, res) => {
    const menuId = req.params.menuId;
    console.log(menuId);
    menuModel.deleteMenuItem(menuId, (err, result) => {
        if (!err) {
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Menu item id not found" });
            }
            return res.status(200).json({ message: "Menu item deleted successfully" });
        } else {
            return res.status(500).json(err);
        }
    });

};

//update order status
const updateOrderStatus = (req, res) => {
    const orderId = req.params.orderId;
    const status = req.body.status;
    orderModel.updateOrderStatus(orderId, status, (err, result) => {
        if (!err) {
            return res.status(200).json({message: "Order successfully marked as " + status});
        } else {
            return res.status(500).json(err);
        }
    });
};

module.exports = {
    getAllBusiness,
    getBusinessById,
    getTotalBusiness,
    getLatestBusiness,
    getMenuItems,
    getBusinessHistory,
    getBusinessOrderList,
    processOrderList,
    getUserOrderedBusiness,
    checkout,
    createOrder,
    webhookStripe,
    addBusiness,
    updateBusiness,
    deleteBusiness,
    deleteMenuItem,
    updateOrderStatus
};