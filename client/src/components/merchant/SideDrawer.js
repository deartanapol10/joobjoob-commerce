import React from "react";

function SideDrawer() {
   return (
      <Drawer
         open={this.state.isMenuDrawerOpened}
         onClose={this.toggleMenuDrawer.bind(this, false)}
      >
         <div
            tabIndex={0}
            role="button"
            onClick={this.toggleBottomDrawer.bind(this, true)}
            onKeyDown={this.toggleMenuDrawer.bind(this, false)}
         >
            {sideList}
         </div>
      </Drawer>
   );
}

export default SideDrawer;
