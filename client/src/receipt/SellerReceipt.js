import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import { Container, Table } from "reactstrap";

export default class SellerReceipt extends Component {
   state = {
      storeName: "SOMETHING APPARELS",
      storeAddress: "1234 ยิ้มแย้มโฮสเทล",
      customerName: "นาย กขค",
      customerAddress: "4321 ราชเทวี",
      province: "กรุงเทพมหานคร",
      zipCode: "10400",
      telNumber: "0888888888",
      orders: ["cat", "dog", "bird"],
      paidDate: "11/11/2011",
      shippingType: "ems"
   };

   render() {
      return (
         <Container className="text-center">
            <h1 className="mt-4">{this.state.storeName}</h1>
            <p className="lead py-0">{this.state.storeAddress}</p>

            <Table bordered>
               <tbody>
                  <tr>
                     <td>ชื่อ-นามสกุล</td>
                     <td>{this.state.customerName}</td>
                  </tr>
                  <tr>
                     <td>ที่อยู่</td>
                     <td>{this.state.customerAddress}</td>
                  </tr>
                  <tr>
                     <td>จังหวัด</td>
                     <td>{this.state.province}</td>
                  </tr>
                  <tr>
                     <td>รหัสไปรษณีย์</td>
                     <td>{this.state.zipCode}</td>
                  </tr>
                  <tr>
                     <td>โทรศัพท์</td>
                     <td>{this.state.telNumber}</td>
                  </tr>
                  <tr>
                     <td>สินค้าที่สั่ง</td>
                     <td>
                        {this.state.orders.map((order, index) => {
                           return (
                              <p key={index}>{`${index + 1} : ${order}`}</p>
                           );
                        })}
                     </td>
                  </tr>
                  <tr>
                     <td>วันที่ชำระเงิน</td>
                     <td>{this.state.paidDate}</td>
                  </tr>
                  <tr>
                     <td>การจัดส่ง</td>
                     <td>{this.state.shippingType}</td>
                  </tr>
               </tbody>
            </Table>
         </Container>
      );
   }
}
