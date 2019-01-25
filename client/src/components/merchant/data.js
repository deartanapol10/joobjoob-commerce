import itemImage01 from "../../images/item-01.jpg";
import itemImage02 from "../../images/item-02.jpg";

export const orderStatus = [
   {
      id: "001",
      name: {
         th: "ยังไม่จ่าย",
         en: "created"
      }
   },
   {
      id: "002",
      name: {
         th: "ที่ต้องจัดส่ง",
         en: "submitted"
      }
   },
   {
      id: "003",
      name: {
         th: "การจัดส่ง",
         en: "shipped"
      }
   },
   {
      id: "004",
      name: {
         th: "สำเร็จ",
         en: "success"
      }
   }
];

export const paymentStatus = [
   {
      id: "001",
      name: {
         th: "ยังไม่ตรวจสอบยอด",
         en: "waitForConfirmation"
      }
   },
   {
      id: "002",
      name: {
         th: "ตรวจสอบยอดแล้ว",
         en: "comfirmed"
      }
   }
];

export const originalOrders = [
   {
      orderID: "0001",
      url:
         "https://shippee.com/5b715fcf03656e1cf0beaaa6/5b8b631c0f611d2acc29f55f",
      status: "created",
      paymentStatus: "pending",
      name: "คุณมิ",
      customerName: "",
      address: {
         houseNo: "",
         road: "",
         subDistrict: "",
         district: "",
         province: "",
         postalCode: ""
      },
      additionalNote: "",
      phone: "",
      price: 2888,
      bankAccount: "SCB",
      shipping: "ALPHA",
      trackingNo: "",
      receipt: "",
      createdTime: "271020181325",
      updatedTime: "120120191325",
      submitTime: "",
      expiredAt: "031120181325",
      items: [
         {
            id: "1",
            name: "Lorem Ipsum",
            price: 250,
            amount: 2,
            image: itemImage02
         },
         {
            id: 2,
            name: "Something",
            price: 1444,
            amount: 2,
            image: itemImage02
         }
      ]
   },
   {
      orderID: "0002",
      url:
         "https://shippee.com/5b715fcf03656e1cf0beaaa6/5b8b631c0f611d2acc29f55f",
      status: "submitted",
      paymentStatus: "waitForConfirmation",
      name: "คุณแดง",
      customerName: "แดง แด๊ง แดง",
      address: {
         houseNo: "111",
         road: "สุขุมวิท 55",
         subDistrict: "คลองตันเหนือ",
         district: "วัฒนา",
         province: "กทม.",
         postalCode: "10110"
      },
      additionalNote: "ถ้ากดกริ่งแล้วไม่มีคนออกมา ให้ฝากไว้ที่ป้อมยาม",
      phone: "0888888888",
      price: 300,
      bankAccount: "KBANK",
      shipping: "EMS",
      trackingNo: "",
      receipt: itemImage01,
      createdTime: "291020181105",
      updatedTime: "140120191545",
      submitTime: "291020181545",
      expiredAt: "061120181105",
      items: [
         {
            id: "1",
            name: "Trouser",
            price: 100,
            amount: 2,
            image: itemImage02
         },
         {
            id: 2,
            name: "T-Shirt",
            price: 100,
            amount: 1,
            image: itemImage02
         },
         {
            id: 3,
            name: "Skirt",
            price: 100,
            amount: 1,
            image: itemImage02
         }
      ]
   },
   {
      orderID: "0003",
      url:
         "https://shippee.com/5b715fcf03656e1cf0beaaa6/5b8b631c0f611d2acc29f55f",
      status: "shipped",
      paymentStatus: "confirmed",
      name: "คุณดำ",
      customerName: "ดำ ด๊ำ ดำ",
      address: {
         houseNo: "222",
         road: "สุขุมวิท 49",
         subDistrict: "คลองตันเหนือ",
         district: "วัฒนา",
         province: "กทม.",
         postalCode: "10110"
      },
      additionalNote: "ไม่ออกมารับคือไม่เอาแล้ว",
      phone: "0877777777",
      price: 100,
      bankAccount: "SCB",
      shipping: "ALPHA",
      trackingNo: "1234567890",
      receipt: itemImage01,
      createdTime: "011120181533",
      updatedTime: "011120181833",
      submitTime: "011120181633",
      expiredAt: "081120181533",
      items: [
         {
            id: "1",
            name: "Trouser",
            price: 100,
            amount: 2,
            image: itemImage02
         }
      ]
   },
   {
      orderID: "0004",
      url:
         "https://shippee.com/5b715fcf03656e1cf0beaaa6/5b8b631c0f611d2acc29f55f",
      status: "created",
      paymentStatus: "waitForConfirmation",
      name: "คุณม่วง",
      customerName: "แดง แด๊ง แดง",
      address: {
         houseNo: "111",
         road: "สุขุมวิท 55",
         subDistrict: "คลองตันเหนือ",
         district: "วัฒนา",
         province: "กทม.",
         postalCode: "10110"
      },
      additionalNote: "ถ้ากดกริ่งแล้วไม่มีคนออกมา ให้ฝากไว้ที่ป้อมยาม",
      phone: "0888888888",
      price: 300,
      bankAccount: "KBANK",
      shipping: "EMS",
      trackingNo: "",
      receipt: itemImage01,
      createdTime: "291020181105",
      updatedTime: "291020181545",
      submitTime: "291020181545",
      expiredAt: "061120181105",
      items: [
         {
            id: "1",
            name: "Trouser",
            price: 100,
            amount: 2,
            image: itemImage02
         },
         {
            id: 2,
            name: "T-Shirt",
            price: 100,
            amount: 1,
            image: itemImage02
         },
         {
            id: 3,
            name: "Skirt",
            price: 100,
            amount: 1,
            image: itemImage02
         }
      ]
   },
   {
      orderID: "0005",
      url:
         "https://shippee.com/5b715fcf03656e1cf0beaaa6/5b8b631c0f611d2acc29f55f",
      status: "created",
      paymentStatus: "waitForConfirmation",
      name: "คุณเหลือง",
      customerName: "แดง แด๊ง แดง",
      address: {
         houseNo: "111",
         road: "สุขุมวิท 55",
         subDistrict: "คลองตันเหนือ",
         district: "วัฒนา",
         province: "กทม.",
         postalCode: "10110"
      },
      additionalNote: "ถ้ากดกริ่งแล้วไม่มีคนออกมา ให้ฝากไว้ที่ป้อมยาม",
      phone: "0888888888",
      price: 300,
      bankAccount: "KBANK",
      shipping: "EMS",
      trackingNo: "",
      receipt: itemImage01,
      createdTime: "291020181105",
      updatedTime: "140120191545",
      submitTime: "291020181545",
      expiredAt: "061120181105",
      items: [
         {
            id: "1",
            name: "Trouser",
            price: 100,
            amount: 2,
            image: itemImage02
         },
         {
            id: 2,
            name: "T-Shirt",
            price: 100,
            amount: 1,
            image: itemImage02
         },
         {
            id: 3,
            name: "Skirt",
            price: 100,
            amount: 1,
            image: itemImage02
         }
      ]
   },
   {
      orderID: "0006",
      url:
         "https://shippee.com/5b715fcf03656e1cf0beaaa6/5b8b631c0f611d2acc29f55f",
      status: "created",
      paymentStatus: "waitForConfirmation",
      name: "คุณฟ้า",
      customerName: "แดง แด๊ง แดง",
      address: {
         houseNo: "111",
         road: "สุขุมวิท 55",
         subDistrict: "คลองตันเหนือ",
         district: "วัฒนา",
         province: "กทม.",
         postalCode: "10110"
      },
      additionalNote: "ถ้ากดกริ่งแล้วไม่มีคนออกมา ให้ฝากไว้ที่ป้อมยาม",
      phone: "0888888888",
      price: 300,
      bankAccount: "KBANK",
      shipping: "EMS",
      trackingNo: "",
      receipt: itemImage01,
      createdTime: "291020181105",
      updatedTime: "291020181545",
      submitTime: "291020181545",
      expiredAt: "061120181105",
      items: [
         {
            id: "1",
            name: "Trouser",
            price: 100,
            amount: 2,
            image: itemImage02
         },
         {
            id: 2,
            name: "T-Shirt",
            price: 100,
            amount: 1,
            image: itemImage02
         },
         {
            id: 3,
            name: "Skirt",
            price: 100,
            amount: 1,
            image: itemImage02
         }
      ]
   },
   {
      orderID: "0007",
      url:
         "https://shippee.com/5b715fcf03656e1cf0beaaa6/5b8b631c0f611d2acc29f55f",
      status: "created",
      paymentStatus: "waitForConfirmation",
      name: "คุณน้ำเงิน",
      customerName: "แดง แด๊ง แดง",
      address: {
         houseNo: "111",
         road: "สุขุมวิท 55",
         subDistrict: "คลองตันเหนือ",
         district: "วัฒนา",
         province: "กทม.",
         postalCode: "10110"
      },
      additionalNote: "ถ้ากดกริ่งแล้วไม่มีคนออกมา ให้ฝากไว้ที่ป้อมยาม",
      phone: "0888888888",
      price: 300,
      bankAccount: "KBANK",
      shipping: "EMS",
      trackingNo: "",
      receipt: itemImage01,
      createdTime: "291020181105",
      updatedTime: "140120191559",
      submitTime: "291020181545",
      expiredAt: "061120181105",
      items: [
         {
            id: "1",
            name: "Trouser",
            price: 100,
            amount: 2,
            image: itemImage02
         },
         {
            id: 2,
            name: "T-Shirt",
            price: 100,
            amount: 1,
            image: itemImage02
         },
         {
            id: 3,
            name: "Skirt",
            price: 100,
            amount: 1,
            image: itemImage02
         }
      ]
   },
   {
      orderID: "0008",
      url:
         "https://shippee.com/5b715fcf03656e1cf0beaaa6/5b8b631c0f611d2acc29f55f",
      status: "created",
      paymentStatus: "waitForConfirmation",
      name: "คุณเงิน",
      customerName: "แดง แด๊ง แดง",
      address: {
         houseNo: "111",
         road: "สุขุมวิท 55",
         subDistrict: "คลองตันเหนือ",
         district: "วัฒนา",
         province: "กทม.",
         postalCode: "10110"
      },
      additionalNote: "ถ้ากดกริ่งแล้วไม่มีคนออกมา ให้ฝากไว้ที่ป้อมยาม",
      phone: "0888888888",
      price: 300,
      bankAccount: "KBANK",
      shipping: "EMS",
      trackingNo: "",
      receipt: itemImage01,
      createdTime: "291020181105",
      updatedTime: "140120191608",
      submitTime: "291020181545",
      expiredAt: "061120181105",
      items: [
         {
            id: "1",
            name: "Trouser",
            price: 100,
            amount: 2,
            image: itemImage02
         },
         {
            id: 2,
            name: "T-Shirt",
            price: 100,
            amount: 1,
            image: itemImage02
         },
         {
            id: 3,
            name: "Skirt",
            price: 100,
            amount: 1,
            image: itemImage02
         }
      ]
   },
   {
      orderID: "0009",
      url:
         "https://shippee.com/5b715fcf03656e1cf0beaaa6/5b8b631c0f611d2acc29f55f",
      status: "created",
      paymentStatus: "waitForConfirmation",
      name: "คุณทอง",
      customerName: "แดง แด๊ง แดง",
      address: {
         houseNo: "111",
         road: "สุขุมวิท 55",
         subDistrict: "คลองตันเหนือ",
         district: "วัฒนา",
         province: "กทม.",
         postalCode: "10110"
      },
      additionalNote: "ถ้ากดกริ่งแล้วไม่มีคนออกมา ให้ฝากไว้ที่ป้อมยาม",
      phone: "0888888888",
      price: 300,
      bankAccount: "KBANK",
      shipping: "EMS",
      trackingNo: "",
      receipt: itemImage01,
      createdTime: "291020181105",
      updatedTime: "291020181545",
      submitTime: "291020181545",
      expiredAt: "061120181105",
      items: [
         {
            id: "1",
            name: "Trouser",
            price: 100,
            amount: 2,
            image: itemImage02
         },
         {
            id: 2,
            name: "T-Shirt",
            price: 100,
            amount: 1,
            image: itemImage02
         },
         {
            id: 3,
            name: "Skirt",
            price: 100,
            amount: 1,
            image: itemImage02
         }
      ]
   },
   {
      orderID: "0010",
      url:
         "https://shippee.com/5b715fcf03656e1cf0beaaa6/5b8b631c0f611d2acc29f55f",
      status: "created",
      paymentStatus: "waitForConfirmation",
      name: "คุณส้ม",
      customerName: "แดง แด๊ง แดง",
      address: {
         houseNo: "111",
         road: "สุขุมวิท 55",
         subDistrict: "คลองตันเหนือ",
         district: "วัฒนา",
         province: "กทม.",
         postalCode: "10110"
      },
      additionalNote: "ถ้ากดกริ่งแล้วไม่มีคนออกมา ให้ฝากไว้ที่ป้อมยาม",
      phone: "0888888888",
      price: 300,
      bankAccount: "KBANK",
      shipping: "EMS",
      trackingNo: "",
      receipt: itemImage01,
      createdTime: "291020181105",
      updatedTime: "291020181545",
      submitTime: "291020181545",
      expiredAt: "061120181105",
      items: [
         {
            id: "1",
            name: "Trouser",
            price: 100,
            amount: 2,
            image: itemImage02
         },
         {
            id: 2,
            name: "T-Shirt",
            price: 100,
            amount: 1,
            image: itemImage02
         },
         {
            id: 3,
            name: "Skirt",
            price: 100,
            amount: 1,
            image: itemImage02
         }
      ]
   }
];

export const customerNamesList = [
   {
      id: "00001",
      lastUsed: "201811050525",
      name: "คุณขาว"
   },
   {
      id: "00002",
      lastUsed: "201811050847",
      name: "คุณแดง"
   },
   {
      id: "00003",
      lastUsed: "201811051122",
      name: "คุณดำ"
   },
   {
      id: "00004",
      lastUsed: "201811050247",
      name: "คุณม่วง"
   },
   {
      id: "00005",
      lastUsed: "201811052244",
      name: "คุณเหลือง"
   },
   {
      id: "00006",
      lastUsed: "201811051807",
      name: "คุณฟ้า"
   },
   {
      id: "00007",
      lastUsed: "201811050659",
      name: "คุณน้ำเงิน"
   },
   {
      id: "00008",
      lastUsed: "201811051535",
      name: "คุณเงิน"
   },
   {
      id: "00009",
      lastUsed: "201811051755",
      name: "คุณทอง"
   },
   {
      id: "00010",
      lastUsed: "201811051200",
      name: "คุณส้ม"
   }
];

export const productsList = [
   {
      id: 1,
      name: "เสื้อผ้ามือสอง",
      price: 559,
      amount: 1,
      image: itemImage01,
      option: [
         {
            id: 1,
            name: "S",
            price: 559
         },
         {
            id: 2,
            name: "M",
            price: 579
         },
         {
            id: 3,
            name: "L",
            price: 599
         }
      ]
   },
   {
      id: 2,
      name: "เสื้อผ้ามือหนึ่ง",
      price: 899,
      amount: 1,
      image: itemImage02,
      option: []
   },
   {
      id: 3,
      name: "เสื้อผ้ามือสาม ชื่อยาวนิดหน่อย",
      price: 499,
      amount: 1,
      image: itemImage02,
      option: []
   },
   {
      id: 4,
      name: "เสื้อผ้ามือสี่ ชื่อยาวขึ้นมาอีกนิด",
      price: 399,
      amount: 1,
      image: itemImage02,
      option: []
   },
   {
      id: 5,
      name: "เสื้อผ้ามือห้า ชื่อยาวมากๆๆๆๆๆๆๆๆๆๆๆๆๆ",
      price: 299,
      amount: 1,
      image: itemImage02,
      option: []
   },
   {
      id: 6,
      name: "เสื้อผ้ามือหก ชื่อยาวกว่านี้มีอีกไหม ขอให้ส่งมา",
      price: 199,
      amount: 1,
      image: itemImage02,
      option: []
   },
   {
      id: 7,
      name: "เสื้อผ้ามือเจ็ด ชื่อสินค้าถ้าจะยาวขนาดนี้ ไปแต่งนิยายขายเถอะ",
      price: 99,
      amount: 1,
      image: itemImage02,
      option: []
   }
];

export const optionsList = [
   {
      id: 1,
      name: "ขนาด",
      option: [
         {
            id: 1,
            name: "S",
            price: "0"
         },
         {
            id: 2,
            name: "M",
            price: "0"
         },
         {
            id: 3,
            name: "L",
            price: "0"
         }
      ]
   },
   {
      id: 2,
      name: "สี",
      option: [
         {
            id: 1,
            name: "แดง",
            price: "0"
         },
         {
            id: 2,
            name: "ดำ",
            price: "0"
         },
         {
            id: 3,
            name: "ขาว",
            price: "0"
         }
      ]
   }
];
