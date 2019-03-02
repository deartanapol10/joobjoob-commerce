import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";

import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";

import { withStyles } from "@material-ui/core/styles";
// import styles from "./styles";

const styles = theme => ({
   avatar: {
      margin: 10
   },
   container: {
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
      justifyContent: "center",
      padding: "20px"
   },
   card: {
      textAlign: "left"
   },
   header: {
      margin: theme.spacing.unit * 2
   },
   textField: {
      margin: theme.spacing.unit * 2,
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit
   },
   button: {
      margin: theme.spacing.unit * 2
   },
   icon: {
      margin: theme.spacing.unit,
      fontSize: "1.6rem",
      position: "absolute",
      top: "4%",
      left: "91%",
      cursor: "pointer"
   },
   fab: {
      margin: theme.spacing.unit
   }
});

class BottomDrawer extends React.Component {
   state = {
      customerName: "",
      productName: "",
      price: "",
      deliveryType: ""
   };

   handleChange = name => event => {
      this.setState({
         [name]: event.target.value
      });
   };

   fullList = mode => {
      switch (mode) {
         //เปิดบิลใหม่
         case 0:
            return (
               <div className={this.props.classes.container}>
                  <CloseIcon
                     className={this.props.classes.icon}
                     onClick={this.props.toggleBottomDrawer.bind(
                        this,
                        false,
                        null
                     )}
                  />
                  <div className={this.props.classes.header}>
                     <Typography variant="h5">เปิดบิลใหม่</Typography>
                  </div>
                  <TextField
                     id="outlined-name"
                     label="ชื่อลูกค้า"
                     value={this.state.customerName}
                     className={this.props.classes.textField}
                     onChange={this.handleChange("customerName")}
                     margin="normal"
                     variant="outlined"
                  />
                  <div>
                     <Typography variant="h6">ลูกค้าล่าสุด</Typography>
                  </div>
                  <div>
                     <Card className={this.props.classes.card}>
                        <CardContent
                           style={{
                              display: "flex",
                              flexDirection: "row",
                              marginLeft: "6px"
                           }}
                        >
                           <Avatar className={this.props.classes.avatar}>
                              D
                           </Avatar>
                           <div style={{ marginLeft: "6px" }}>
                              <Typography variant="h4">คุณขาว</Typography>
                              <Typography variant="subtitle1">
                                 facebook
                              </Typography>
                           </div>
                        </CardContent>
                     </Card>
                  </div>

                  <Button
                     variant="contained"
                     color="primary"
                     className={this.props.classes.button}
                  >
                     ต่อไป
                  </Button>
               </div>
            );
         //เพิ่มสินค้าใหม่
         case 1:
            return (
               <div className={this.props.classes.container}>
                  <CloseIcon
                     className={this.props.classes.icon}
                     onClick={this.props.toggleBottomDrawer.bind(
                        this,
                        false,
                        null
                     )}
                  />

                  <div className={this.props.classes.header}>
                     <Typography variant="h5">เพิ่มสินค้าใหม่</Typography>
                  </div>

                  <div style={{ display: "flex", flexDirection: "row" }}>
                     <div>
                        <img
                           src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdovB83ce6JNsKorhNyALxRBI8jG07JOxqld-Hb5D0BiJnlVwu"
                           width="150"
                           alt=""
                        />
                     </div>

                     <div
                        style={{
                           display: "flex",
                           flexDirection: "column",
                           flexGrow: "2"
                        }}
                     >
                        <TextField
                           id="outlined-name"
                           label="ชื่อสินค้า"
                           value={this.state.productName}
                           className={this.props.classes.textField}
                           onChange={this.handleChange("productName")}
                           margin="normal"
                           variant="outlined"
                        />
                        <div
                           style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center"
                           }}
                        >
                           <TextField
                              id="outlined-name"
                              label="ราคา"
                              value={this.state.price}
                              className={this.props.classes.textField}
                              onChange={this.handleChange("price")}
                              margin="normal"
                              variant="outlined"
                           />
                           <Typography variant="h6">บาท</Typography>
                        </div>
                     </div>
                  </div>
                  <Divider />
                  <i
                     className="fas fa-plus-circle"
                     style={{ fontSize: "3rem", marginTop: "10px" }}
                  />
               </div>
            );
         //เพิ่ม/แก้ไขการส่งใหม่
         case 2:
            return (
               <div className={this.props.classes.container}>
                  <div className={this.props.classes.header}>
                     <Typography variant="h5">เพิ่ม/แก้ไขการส่งใหม่</Typography>
                  </div>
                  <div
                     style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center"
                     }}
                  >
                     <div style={{ flexGrow: "4", marginRight: "8px" }}>
                        <TextField
                           id="outlined-name"
                           label="การส่ง"
                           value={this.state.deliveryType}
                           className={this.props.classes.textField}
                           onChange={this.handleChange("deliveryType")}
                           margin="normal"
                           variant="outlined"
                           fullWidth
                        />
                     </div>
                     <TextField
                        id="outlined-name"
                        label="ราคา"
                        value={this.state.price}
                        className={this.props.classes.textField}
                        onChange={this.handleChange("price")}
                        margin="normal"
                        variant="outlined"
                     />
                     <i
                        className="fas fa-minus-circle"
                        style={{ fontSize: "2.5rem", marginTop: "10px" }}
                     />
                  </div>
               </div>
            );
      }
   };

   render() {
      return (
         <Drawer
            anchor="bottom"
            open={this.props.isBottomDrawerOpened}
            onClose={this.props.toggleBottomDrawer.bind(this, false, null)}
         >
            <div tabIndex={0} role="button">
               {this.fullList(this.props.bottomDrawerMode)}
            </div>
         </Drawer>
      );
   }
}

export default withStyles(styles)(BottomDrawer);
