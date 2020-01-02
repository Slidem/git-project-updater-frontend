class NavbarListener {
    
  constructor(onItemClickedEvent) {
    this.onItemClickedEvent = onItemClickedEvent;
  }

  navbarItemClicked(clickedItemCode) {
    if (!this.onItemClickedEvent) {
      console.log("No item clicked event defined !");
      return;
    }

    this.onItemClickedEvent(clickedItemCode);
  }
}

export default NavbarListener;
