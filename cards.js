module.exports = {
    drinksOrder1: (id,name,price,url) => {
        return  {
            "type": "AdaptiveCard",
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "version": "1.3",
            "body": [
                {
                    "type": "Container",
                    "items": [
                        {
                            "type": "Image",
                            "url": `${url}`,
                            "size": "Large"
                        }
                    ]
                },
                {
                    "type": "TextBlock",
                    "text": `${name}`,
                    "wrap": true,
                    "weight": "Bolder",
                    "id": `${id}`,
                    "separator": true
                },
                {
                    "type": "TextBlock",
                    "text": `${price}`,
                    "wrap": true,
                    "weight": "Bolder"
                    
                },
                {
                    "type": "ActionSet",
                    "actions": [
                        {
                            "type": "Action.Submit",
                            "title": "Order Now",
                            "id": "drinksbuy1",
                            "data": {
                                "orderedornot": "ordered",
                                "foodselect": "drinksordered",
                                "id": `${id}`,
                                "name": `${name}`,
                                "price": `${price}`
                            },
                            "style": "positive"
                        }
                    ]
                }
            ]
        }
    },
    snacksOrder1: (id,name,price,url) => {
        return {
            "type": "AdaptiveCard",
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "version": "1.3",
            "body": [
                {
                    "type": "Container",
                    "items": [
                        {
                            "type": "Image",
                            "url": `${url}`,
                            "size": "Large"
                        }
                    ]
                },
                {
                    "type": "TextBlock",
                    "text": `${name}`,
                    "wrap": true,
                    "weight": "Bolder",
                    "separator": true,
                    "id": `${id}`
                },
                {
                    "type": "TextBlock",
                    "text": `${price}`,
                    "wrap": true,
                    "weight": "Bolder"
                },
                {
                    "type": "ActionSet",
                    "actions": [
                        {
                            "type": "Action.Submit",
                            "title": "Order Now",
                            "id": "snacksbuy1",
                            "data": {
                                "orderedornot": "ordered",
                                "foodselect": "snacksordered",
                                "id": `${id}`,
                                "name": `${name}`,
                                "price": `${price}` 
                            },
                            "style": "positive"
                            
                        }
                    ]
                }
            ]
        }
    },
    pizzaOrder1: (id,name,price,url) => {
        return {
            "type": "AdaptiveCard",
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "version": "1.3",
            "body": [
                {
                    "type": "Container",
                    "items": [
                        {
                            "type": "Image",
                            "url": `${url}`,
                            "size": "Large"
                        }
                    ]
                },
                {
                    "type": "TextBlock",
                    "text": `${name}`,
                    "wrap": true,
                    "weight": "Bolder",
                    "separator": true,
                    "id": `${id}`
                },
                {
                    "type": "TextBlock",
                    "text": `${price}`,
                    "wrap": true,
                    "weight": "Bolder"
                    
                    
                },
                {
                    "type": "ActionSet",
                    "actions": [
                        {
                            "type": "Action.Submit",
                            "title": "Order Now",
                            "style": "positive",
                            "id": "pizzabuy1",
                            "data": {
                                "orderedornot": "ordered",
                                "foodselect": "pizzaordered",
                                "id": `${id}`,
                                "name": `${name}`,
                                "price": `${price}` 
                            }
                        }
                    ]
                }
            ]
        }
    },
    confirmcheck: (AskPerson, AskDate, AskTime) => {
        return {
            "type": "AdaptiveCard",
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "version": "1.3",
            "body": [
                {
                    "type": "TextBlock",
                    "text": "Please check the below details for confirmation check.",
                    "wrap": true,
                    "weight": "Bolder",
                    "color": "Accent",
                    "size": "Medium",
                    "horizontalAlignment": "Left"
                },
                {
                    "type": "Container",
                    "items": [
                        {
                            "type": "ColumnSet",
                            "columns": [
                                {
                                    "type": "Column",
                                    "width": "stretch",
                                    "items": [
                                        {
                                            "type": "TextBlock",
                                            "text": "Number of Person:",
                                            "wrap": true,
                                            "weight": "Bolder"
                                        }
                                    ],
                                    "separator": true
                                },
                                {
                                    "type": "Column",
                                    "width": "stretch",
                                    "items": [
                                        {
                                            "type": "TextBlock",
                                            "text": `${AskPerson}`,
                                            "wrap": true
                                        }
                                    ]
                                }
                            ],
                            "separator": true
                        }
                    ]
                },
                {
                    "type": "ColumnSet",
                    "columns": [
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": "Date:",
                                    "wrap": true,
                                    "weight": "Bolder"
                                }
                            ],
                            "separator": true
                        },
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": `${AskDate}`,
                                    "wrap": true
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "ColumnSet",
                    "columns": [
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": "Time:",
                                    "wrap": true,
                                    "weight": "Bolder"
                                }
                            ]
                        },
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": `${AskTime}`,
                                    "wrap": true
                                }
                            ]
                        }
                    ]
                },
                // {
                //     "type": "ColumnSet",
                //     "columns": [
                //         {
                //             "type": "Column",
                //             "width": "stretch",
                //             "items": [
                //                 {
                //                     "type": "ActionSet",
                //                     "actions": [
                //                         {
                //                             "type": "Action.Submit",
                //                             "title": "Confirm Booking",
                //                             "style": "positive"
                //                             // "data": {
                //                             //     "Confirmed": 'confirmed' 
                //                             // },
                //                         }
                //                     ]
                //                 }
                //             ]
                //         },
                        // {
                        //     "type": "Column",
                        //     "width": "stretch",
                        //     "items": [
                        //         {
                        //             "type": "ActionSet",
                        //             "actions": [
                        //                 {
                        //                     "type": "Action.Submit",
                        //                     "title": "Cancel Booking",
                        //                     "style": "destructive"
                        //                 }
                        //             ]
                        //         }
                        //     ]
                        // }
                    ]
                }
           // ]
    },
    reservation: (Person, Date, Time, id) => {
        return {
            "type": "AdaptiveCard",
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "version": "1.3",
            "body": [
                {
                    "type": "TextBlock",
                    "text": "Your booking is confirmed with us ✔️",
                    "wrap": true,
                    "weight": "Bolder",
                    "color": "Accent",
                    "size": "Large",
                    "horizontalAlignment": "Center"
                },
                {
                    "type": "Container",
                    "items": [
                        {
                            "type": "ColumnSet",
                            "columns": [
                                {
                                    "type": "Column",
                                    "width": "stretch",
                                    "items": [
                                        {
                                            "type": "TextBlock",
                                            "text": "Number of Person:",
                                            "wrap": true,
                                            "weight": "Bolder"
                                        }
                                    ],
                                    "separator": true
                                },
                                {
                                    "type": "Column",
                                    "width": "stretch",
                                    "items": [
                                        {
                                            "type": "TextBlock",
                                            "text": `${Person}`,
                                            "wrap": true
                                        }
                                    ]
                                }
                            ],
                            "separator": true
                        }
                    ]
                },
                {
                    "type": "ColumnSet",
                    "columns": [
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": "Date:",
                                    "wrap": true,
                                    "weight": "Bolder"
                                }
                            ],
                            "separator": true
                        },
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": `${Date}`,
                                    "wrap": true
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "ColumnSet",
                    "columns": [
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": "Time:",
                                    "wrap": true,
                                    "weight": "Bolder"
                                }
                            ]
                        },
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": `${Time}`,
                                    "wrap": true
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "ColumnSet",
                    "columns": [
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": "Booking Id:",
                                    "wrap": true,
                                    "weight": "Bolder"
                                }
                            ],
                            "separator": true
                        },
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": `${id}`,
                                    "wrap": true
                                }
                            ]
                        }
                    ]
                }
                ]
                }
           
    },
    alreadyreserved: (Person, Date, Time, id) => {
        return {
            "type": "AdaptiveCard",
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "version": "1.3",
            "body": [
                {
                    "type": "TextBlock",
                    "text": "Your reservation details",
                    "wrap": true,
                    "weight": "Bolder",
                    "color": "Accent",
                    "size": "Large",
                    "horizontalAlignment": "Center"
                },
                {
                    "type": "Container",
                    "items": [
                        {
                            "type": "ColumnSet",
                            "columns": [
                                {
                                    "type": "Column",
                                    "width": "stretch",
                                    "items": [
                                        {
                                            "type": "TextBlock",
                                            "text": "Number of Person:",
                                            "wrap": true,
                                            "weight": "Bolder"
                                        }
                                    ],
                                    "separator": true
                                },
                                {
                                    "type": "Column",
                                    "width": "stretch",
                                    "items": [
                                        {
                                            "type": "TextBlock",
                                            "text": `${Person}`,
                                            "wrap": true
                                        }
                                    ]
                                }
                            ],
                            "separator": true
                        }
                    ]
                },
                {
                    "type": "ColumnSet",
                    "columns": [
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": "Date:",
                                    "wrap": true,
                                    "weight": "Bolder"
                                }
                            ],
                            "separator": true
                        },
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": `${Date}`,
                                    "wrap": true
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "ColumnSet",
                    "columns": [
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": "Time:",
                                    "wrap": true,
                                    "weight": "Bolder"
                                }
                            ]
                        },
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": `${Time}`,
                                    "wrap": true
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "ColumnSet",
                    "columns": [
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": "Booking Id:",
                                    "wrap": true,
                                    "weight": "Bolder"
                                }
                            ],
                            "separator": true
                        },
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": `${id}`,
                                    "wrap": true
                                }
                            ]
                        }
                    ]
                }
                ]
                }
           
    },
    orderDetails: (id, name, price) => {
        return {
            "type": "AdaptiveCard",
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "version": "1.3",
            "body": [
                {
                    "type": "Container",
                    "items": [
                        {
                            "type": "TextBlock",
                            "text": "Order Details",
                            "wrap": true,
                            "size": "Large",
                            "horizontalAlignment": "Center",
                            "weight": "Bolder",
                            "color": "Accent"
                        },
                        {
                            "type": "Image",
                            "url": "https://blog.tubikstudio.com/wp-content/uploads/2018/04/burger-app-food-delivery-ui-case-study-tubik-1-1.jpg"
                        }
                    ]
                },
                {
                    "type": "ColumnSet",
                    "columns": [
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": "Order Id:",
                                    "wrap": true,
                                    "fontType": "Default",
                                    "size": "Medium",
                                    "weight": "Bolder"
                                }
                            ],
                            "horizontalAlignment": "Left",
                            "spacing": "None",
                            "style": "accent"
                        },
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": `${id}`,
                                    "wrap": true,
                                    "size": "Medium",
                                    "weight": "Bolder"
                                }
                            ],
                            "style": "emphasis"
                        }
                    ],
                    "separator": true
                },
                {
                    "type": "ColumnSet",
                    "columns": [
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": "Name: ",
                                    "wrap": true,
                                    "size": "Medium",
                                    "weight": "Bolder"
                                }
                            ],
                            "style": "accent"
                        },
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": `${name}`,
                                    "wrap": true,
                                    "size": "Medium",
                                    "weight": "Bolder"
                                }
                            ],
                            "style": "emphasis"
                        }
                    ],
                    "minHeight": "0px"
                },
                {
                    "type": "ColumnSet",
                    "columns": [
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": "Price:",
                                    "wrap": true,
                                    "size": "Medium",
                                    "weight": "Bolder"
                                }
                            ],
                            "style": "accent"
                        },
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": `${price}`,
                                    "wrap": true,
                                    "size": "Medium",
                                    "weight": "Bolder"
                                }
                            ],
                            "style": "emphasis"
                        }
                    ]
                }
            ]
        }
    },
    orderstatus: (id, statusoforder, updatedtime) =>{
        return {
            "type": "AdaptiveCard",
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "version": "1.3",
            "body": [
                {
                    "type": "Container",
                    "items": [
                        {
                            "type": "Image",
                            "url": "https://thumbs.dreamstime.com/b/online-food-delivery-service-motorcyclist-courier-moped-box-smartphone-city-map-device-screen-character-rides-male-to-196937581.jpg"
                        },
                        {
                            "type": "ColumnSet",
                            "columns": [
                                {
                                    "type": "Column",
                                    "width": "stretch",
                                    "items": [
                                        {
                                            "type": "TextBlock",
                                            "text": "Order Id:",
                                            "wrap": true,
                                            "size": "Medium",
                                            "weight": "Bolder",
                                            "color": "Accent"
                                        }
                                    ]
                                },
                                {
                                    "type": "Column",
                                    "width": "stretch",
                                    "items": [
                                        {
                                            "type": "TextBlock",
                                            "text": `${id}`,
                                            "wrap": true,
                                            "size": "Medium",
                                            "weight": "Bolder"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "ColumnSet",
                    "columns": [
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": "Current Order Status:",
                                    "wrap": true,
                                    "size": "Medium",
                                    "weight": "Bolder",
                                    "color": "Accent"
                                }
                            ]
                        },
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": `${statusoforder}`,
                                    "wrap": true,
                                    "weight": "Bolder",
                                    "size": "Medium"
                                }
                            ]
                        }
                    ],
                    "separator": true
                },
                {
                    "type": "ColumnSet",
                    "columns": [
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": "Last updated on:",
                                    "wrap": true,
                                    "size": "Medium",
                                    "weight": "Bolder",
                                    "color": "Accent"
                                }
                            ]
                        },
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": `${updatedtime}`,
                                    "wrap": true,
                                    "size": "Medium",
                                    "weight": "Bolder"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }
    }

