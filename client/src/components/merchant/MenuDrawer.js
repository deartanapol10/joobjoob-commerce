import React from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

class MenuDrawer extends React.Component {
   constructor(props) {
      super(props);
   }

   render() {
      const { classes } = this.props;

      const menuList = (
         <div className={classes.list}>
            <List>
               {["เปิดบิลใหม่", "เพิ่มสินค้าใหม่", "เพิ่ม/แก้ไขการส่งใหม่"].map(
                  (text, index) => (
                     <ListItem
                        button
                        key={text}
                        onClick={() =>
                           this.props.toggleBottomDrawer(true, index)
                        }
                     >
                        <ListItemIcon>
                           {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                     </ListItem>
                  )
               )}
            </List>
         </div>
      );

      return (
         <Drawer
            open={this.props.isMenuDrawerOpened}
            onClose={this.props.toggleMenuDrawer.bind(this, false)}
         >
            <div
               tabIndex={0}
               role="button"
               onKeyDown={this.props.toggleMenuDrawer.bind(this, false)}
            >
               {menuList}
            </div>
         </Drawer>
      );
   }
}

export default withStyles(styles)(MenuDrawer);
